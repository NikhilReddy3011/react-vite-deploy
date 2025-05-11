// Current exchange rate (1 USD to INR)
const EXCHANGE_RATE = 83.0;

export const convertToRupees = (dollars: number): number => {
    return Math.round(dollars * EXCHANGE_RATE);
};

export const formatCurrency = (amount: number, currency: 'USD' | 'INR' = 'INR'): string => {
    if (currency === 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2
    }).format(amount);
}; 