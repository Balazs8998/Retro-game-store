package com.retrostore.backend.domain.enums;

public enum RatingType {
    EVERYONE("E","Everyone"),
    EVERYONE_10_PLUS("E10","Everyone 10+"),
    TEEN("T", "Teen 13+ "),
    MATURE("M","Mature 17+"),
    ADULTS_ONLY("18", "Adult only 18+");


    private final String displayName;
    private final String longName;


    RatingType(String displayName, String longName) {
        this.displayName = displayName;
        this.longName = longName;
    }
}
