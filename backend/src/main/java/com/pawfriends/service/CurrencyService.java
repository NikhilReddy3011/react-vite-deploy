package com.pawfriends.service;

public interface CurrencyService {
    double convertToRupees(double amountInDollars);
    double convertToDollars(double amountInRupees);
    double getCurrentExchangeRate();
} 