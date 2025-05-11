package com.pawfriends.service.impl;

import com.pawfriends.service.CurrencyService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Value("${currency.exchange-rate-api-key}")
    private String apiKey;

    private static final String EXCHANGE_RATE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
    private static final double DEFAULT_EXCHANGE_RATE = 83.0; // Fallback rate if API fails

    @Override
    public double convertToRupees(double amountInDollars) {
        double exchangeRate = getCurrentExchangeRate();
        return round(amountInDollars * exchangeRate, 2);
    }

    @Override
    public double convertToDollars(double amountInRupees) {
        double exchangeRate = getCurrentExchangeRate();
        return round(amountInRupees / exchangeRate, 2);
    }

    @Override
    public double getCurrentExchangeRate() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            ExchangeRateResponse response = restTemplate.getForObject(EXCHANGE_RATE_API_URL, ExchangeRateResponse.class);
            
            if (response != null && response.getRates() != null) {
                return response.getRates().get("INR");
            }
        } catch (Exception e) {
            // Log the error and return default rate
            System.err.println("Error fetching exchange rate: " + e.getMessage());
        }
        return DEFAULT_EXCHANGE_RATE;
    }

    private double round(double value, int places) {
        if (places < 0) throw new IllegalArgumentException();

        BigDecimal bd = BigDecimal.valueOf(value);
        bd = bd.setScale(places, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }

    // Inner class for API response
    private static class ExchangeRateResponse {
        private String base;
        private java.util.Map<String, Double> rates;

        public String getBase() {
            return base;
        }

        public void setBase(String base) {
            this.base = base;
        }

        public java.util.Map<String, Double> getRates() {
            return rates;
        }

        public void setRates(java.util.Map<String, Double> rates) {
            this.rates = rates;
        }
    }
} 