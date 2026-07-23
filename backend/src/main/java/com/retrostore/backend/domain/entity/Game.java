package com.retrostore.backend.domain.entity;

import com.retrostore.backend.domain.enums.GenreType;
import com.retrostore.backend.domain.enums.RatingType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity;

    @Column(name = "description", columnDefinition = "TEXT",nullable = false)
    private String description;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "release_year",nullable = false)
    private Integer releaseYear;

    @ElementCollection(targetClass = GenreType.class)
    @CollectionTable(name = "genre")
    @Enumerated(EnumType.STRING)
    private List<GenreType> genre;


    @Enumerated(EnumType.STRING)
    @Column(name = "rating", nullable = false)
    private RatingType rating;


}
