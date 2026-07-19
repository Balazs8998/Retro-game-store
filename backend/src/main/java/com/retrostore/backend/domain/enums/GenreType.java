package com.retrostore.backend.domain.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum GenreType {

    FPS("FPS"),
    PLATFORMER("Platformer"),
    STRATEGY("Strategy"),
    SPORTS("Sports"),
    RPG("RPG"),
    RACING("Racing");

    private final String displayName;
}