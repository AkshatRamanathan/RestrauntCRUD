const formatDate = (date) => {
    // Example: format a date object into a readable string
    return date.toLocaleDateString('en-US');
};

const formatCurrency = (amount) => {
    // Example: format a number as currency
    return `$${amount.toFixed(2)}`;
};

module.exports = {
    formatDate,
    formatCurrency
};
