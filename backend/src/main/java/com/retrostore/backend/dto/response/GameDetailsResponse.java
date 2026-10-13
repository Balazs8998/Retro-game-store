package com.retrostore.backend.dto.response;

import com.retrostore.backend.domain.entity.Game;
import com.retrostore.backend.domain.enums.GenreType;

import java.math.BigDecimal;
import java.util.List;

public record GameDetailsResponse(
        Long id,
        String title,
        BigDecimal price,
        Integer stockQuantity,
        String description,
        String imgUrl,
        Integer releaseYear,
        String rating,
        List<String> genre,
        String tagLine,
        String fastPacedCombat,
        String legendaryLevel

) {

    public static GameDetailsResponse mapToGameDetailsDto(Game game){
        return new GameDetailsResponse(
                game.getId(),
                game.getTitle(),
                game.getPrice(),
                game.getStockQuantity(),
                game.getDescription(),
                game.getImgUrl(),
                game.getReleaseYear(),
                game.getRating().toString(),
                game.getGenre().stream()
                        .map(GenreType::getDisplayName)
                        .toList(),
                game.getTagLine(),
                game.getFastPacedCombat(),
                game.getLegendaryLevel()
        );
    }

}
