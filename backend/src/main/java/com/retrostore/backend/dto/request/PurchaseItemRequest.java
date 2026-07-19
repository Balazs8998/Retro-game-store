package com.retrostore.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;


public record PurchaseItemRequest(
        @NotNull
        Long gameId,
        @NotNull @Positive
        Integer quantity
) {
}
