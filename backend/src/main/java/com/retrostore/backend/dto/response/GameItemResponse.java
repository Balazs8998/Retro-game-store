package com.retrostore.backend.dto.response;

import com.retrostore.backend.domain.entity.Game;
import com.retrostore.backend.domain.enums.GenreType;

import java.util.List;

public record GameItemResponse(
        Long id,
        String title,
        Integer price,
        Integer stockQuantity,
        String description,
        String imgUrl,
        Integer releaseYer,
        List<String> genre

) {

    public static GameItemResponse mapToGameDto(Game game){
        return new GameItemResponse(
                game.getId(),
                game.getTitle(),
                game.getPrice(),
                game.getStockQuantity(),
                game.getDescription(),
                game.getImgUrl(),
                game.getReleaseYear(),
                game.getGenre().stream()
                        .map(GenreType::getDisplayName)
                        .toList()
        );
    }

}
