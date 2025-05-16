// DOM Elements
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const notifications = document.querySelector('.notifications');
const userMenu = document.querySelector('.user-profile');
const filterInputs = document.querySelectorAll('.filter-input');
const actionButtons = document.querySelectorAll('.action-button');
const bulkActions = document.querySelector('.bulk-actions');
const dataTable = document.querySelector('.data-table');
const chartContainer = document.querySelector('.chart-container');

// Navigation Active State
function initializeNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Notifications System
function initializeNotifications() {
    if (notifications) {
        notifications.addEventListener('click', () => {
            // Toggle notifications panel (to be implemented)
            console.log('Notifications clicked');
        });
    }
}

// User Menu
function initializeUserMenu() {
    if (userMenu) {
        userMenu.addEventListener('click', () => {
            // Toggle user menu dropdown (to be implemented)
            console.log('User menu clicked');
        });
    }
}

// Filter Functionality
function initializeFilters() {
    filterInputs.forEach(filter => {
        filter.addEventListener('change', () => {
            // Apply filters based on selection
            applyFilters();
        });
    });
}

function applyFilters() {
    // Get all filter values
    const filters = Array.from(filterInputs).reduce((acc, filter) => {
        acc[filter.id] = filter.value;
        return acc;
    }, {});

    // Apply filters to the data (to be implemented based on specific page)
    console.log('Applying filters:', filters);
}

// Action Buttons
function initializeActionButtons() {
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent.trim();
            handleAction(action);
        });
    });
}

function handleAction(action) {
    // Handle different actions based on button text
    switch(action) {
        case 'Edit':
            console.log('Edit action');
            break;
        case 'Delete':
            console.log('Delete action');
            break;
        case 'View':
            console.log('View action');
            break;
        case 'Save Changes':
            saveChanges();
            break;
        default:
            console.log(`Handling action: ${action}`);
    }
}

// Bulk Actions
function initializeBulkActions() {
    if (bulkActions) {
        const bulkButtons = bulkActions.querySelectorAll('.action-button');
        bulkButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.textContent.trim();
                handleBulkAction(action);
            });
        });
    }
}

function handleBulkAction(action) {
    // Handle bulk actions
    console.log(`Handling bulk action: ${action}`);
}

// Data Table Functionality
function initializeDataTable() {
    if (dataTable) {
        // Add sorting functionality to table headers
        const headers = dataTable.querySelectorAll('th');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                sortTable(header);
            });
        });
    }
}

function sortTable(header) {
    // Implement table sorting logic
    console.log(`Sorting by ${header.textContent}`);
}

// Chart Functionality (using a hypothetical chart library)
function initializeCharts() {
    if (chartContainer) {
        // Initialize charts based on page
        setupCharts();
    }
}

function setupCharts() {
    // Setup different charts based on the current page
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('finance')) {
        setupFinanceCharts();
    } else if (currentPage.includes('analytics')) {
        setupAnalyticsCharts();
    }
}

// Page Specific Functions
function setupFinanceCharts() {
    // Setup finance specific charts
    console.log('Setting up finance charts');
}

function setupAnalyticsCharts() {
    // Setup analytics specific charts
    console.log('Setting up analytics charts');
}

// Form Handling
function initializeForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
}

// Settings Page Specific
function initializeSettings() {
    // Color picker functionality
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length) {
        colorOptions.forEach(color => {
            color.addEventListener('click', () => {
                colorOptions.forEach(c => c.classList.remove('active'));
                color.classList.add('active');
                updateThemeColor(color.style.background);
            });
        });
    }

    // Toggle switches
    const toggles = document.querySelectorAll('input[type="checkbox"]');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', handleToggle);
    });
}

function updateThemeColor(color) {
    // Update theme color
    document.documentElement.style.setProperty('--primary-color', color);
}

function handleToggle(e) {
    const setting = e.target.id;
    const value = e.target.checked;
    // Handle toggle changes
    console.log(`${setting} changed to ${value}`);
}

// Support Page Specific
function initializeChat() {
    const chatInput = document.querySelector('.chat-input textarea');
    const sendButton = document.querySelector('.chat-input .action-button');

    if (chatInput && sendButton) {
        sendButton.addEventListener('click', () => {
            sendChatMessage(chatInput.value);
            chatInput.value = '';
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendButton.click();
            }
        });
    }
}

function sendChatMessage(message) {
    if (message.trim()) {
        // Add message to chat (to be implemented)
        console.log('Sending message:', message);
    }
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Initialize Everything
function initializeAdminPortal() {
    initializeNavigation();
    initializeNotifications();
    initializeUserMenu();
    initializeFilters();
    initializeActionButtons();
    initializeBulkActions();
    initializeDataTable();
    initializeCharts();
    initializeForms();
    initializeSettings();
    initializeChat();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAdminPortal);

// Export functions for use in other files if needed
export {
    initializeAdminPortal,
    handleAction,
    handleBulkAction,
    sendChatMessage,
    formatDate,
    formatCurrency
}; 