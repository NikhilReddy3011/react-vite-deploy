package com.pawfriends.dto;

import lombok.Data;

@Data
public class CurrencyConversionDTO {
    private double amountInDollars;
    private double amountInRupees;
    private double exchangeRate;
    private String timestamp;
} 