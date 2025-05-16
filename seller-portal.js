// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Product Management
class ProductManager {
    constructor() {
        this.products = [
            {
                id: 1,
                name: 'Wireless Earbuds',
                price: 129.99,
                stock: 45,
                sales: 128,
                status: 'in-stock',
                image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb'
            },
            {
                id: 2,
                name: 'Smart Coffee Maker',
                price: 149.99,
                stock: 8,
                sales: 64,
                status: 'low-stock',
                image: 'https://images.unsplash.com/photo-1517914309068-967f8779aa14'
            },
            {
                id: 3,
                name: '4K Smart TV',
                price: 599.99,
                stock: 0,
                sales: 32,
                status: 'out-of-stock',
                image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6'
            }
        ];
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        this.products.push({
            id: this.products.length + 1,
            ...product,
            sales: 0,
            status: product.stock > 10 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock'
        });
        this.refreshProductTable();
        this.refreshTopProducts();
    }

    updateProduct(id, updates) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = {
                ...this.products[index],
                ...updates,
                status: updates.stock > 10 ? 'in-stock' : updates.stock > 0 ? 'low-stock' : 'out-of-stock'
            };
            this.refreshProductTable();
            this.refreshTopProducts();
        }
    }

    refreshProductTable() {
        const tbody = document.querySelector('.data-table tbody');
        tbody.innerHTML = '';
        
        this.products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>${product.stock}</td>
                <td>${product.sales}</td>
                <td><span class="status-badge ${product.status}">${product.status.replace('-', ' ')}</span></td>
                <td><button class="action-button" onclick="editProduct(${product.id})">Edit</button></td>
            `;
            tbody.appendChild(tr);
        });
    }

    refreshTopProducts() {
        const topProducts = this.products
            .sort((a, b) => b.sales - a.sales)
            .slice(0, 2);
        
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = topProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${formatCurrency(product.price)}</div>
                    <div class="product-stock">${product.sales} sold</div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize ProductManager
const productManager = new ProductManager();

// Add Product Modal
function showAddProductModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Add New Product</h2>
            <form id="addProductForm">
                <div class="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" name="price" step="0.01" required>
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" required>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" name="image" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="action-button">Add Product</button>
                    <button type="button" class="action-button secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('addProductForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const product = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            image: formData.get('image')
        };
        productManager.addProduct(product);
        closeModal();
    });
}

// Edit Product Modal
function editProduct(id) {
    const product = productManager.products.find(p => p.id === id);
    if (!product) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Edit Product</h2>
            <form id="editProductForm">
                <div class="form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value="${product.name}" required>
                </div>
                <div class="form-group">
                    <label>Price</label>
                    <input type="number" name="price" step="0.01" value="${product.price}" required>
                </div>
                <div class="form-group">
                    <label>Stock</label>
                    <input type="number" name="stock" value="${product.stock}" required>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" name="image" value="${product.image}" required>
                </div>
                <div class="form-actions">
                    <button type="submit" class="action-button">Update Product</button>
                    <button type="button" class="action-button secondary" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('editProductForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updates = {
            name: formData.get('name'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            image: formData.get('image')
        };
        productManager.updateProduct(id, updates);
        closeModal();
    });
}

// Import Products
function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvData = event.target.result;
                const products = parseCSV(csvData);
                products.forEach(product => productManager.addProduct(product));
            };
            reader.readAsText(file);
        }
    });
    
    input.click();
}

function parseCSV(csvData) {
    // Simple CSV parser (can be enhanced based on needs)
    const lines = csvData.split('\n');
    const products = [];
    
    for (let i = 1; i < lines.length; i++) {
        const [name, price, stock, image] = lines[i].split(',');
        if (name) {
            products.push({
                name: name.trim(),
                price: parseFloat(price),
                stock: parseInt(stock),
                image: image.trim()
            });
        }
    }
    
    return products;
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Analytics
function updateAnalytics(timeframe) {
    // Simulate analytics data
    const data = generateAnalyticsData(timeframe);
    updateChart(data);
}

function generateAnalyticsData(timeframe) {
    // Simulate different data based on timeframe
    return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: Array.from({length: 7}, () => Math.floor(Math.random() * 1000))
    };
}

function updateChart(data) {
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    chartPlaceholder.innerHTML = `
        <div class="chart">
            <div class="chart-bars">
                ${data.values.map((value, index) => `
                    <div class="chart-bar" style="height: ${value/10}px">
                        <span class="chart-value">${formatCurrency(value)}</span>
                        <span class="chart-label">${data.labels[index]}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize product table and top products
    productManager.refreshProductTable();
    productManager.refreshTopProducts();
    
    // Add Product button
    document.querySelector('.action-button').addEventListener('click', showAddProductModal);
    
    // Import button
    document.querySelector('.action-button.secondary').addEventListener('click', handleImport);
    
    // Analytics filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const timeframe = button.textContent.toLowerCase();
            updateAnalytics(timeframe);
        });
    });
    
    // Initialize analytics with 'week' timeframe
    updateAnalytics('week');
}); 