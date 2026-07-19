package com.retrostore.backend.dto.response;

import com.retrostore.backend.domain.entity.Game;
import com.retrostore.backend.domain.enums.GenreType;

import java.math.BigDecimal;
import java.util.List;

public record GameItemResponse(
        Long id,
        String title,
        BigDecimal price,
        Integer stockQuantity,
        String imgUrl,
        List<String> genre



) {

    public static GameItemResponse mapToGameDto(Game game) {
        return new GameItemResponse(
        game.getId(),
        game.getTitle(),
        game.getPrice(),
        game.getStockQuantity(),
        game.getImgUrl(),
        game.getGenre()
                .stream()
                .map(GenreType::getDisplayName)
                .toList());
    }
}
