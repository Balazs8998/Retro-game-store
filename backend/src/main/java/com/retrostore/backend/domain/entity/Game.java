package com.retrostore.backend.domain.entity;

import com.retrostore.backend.domain.enums.GenreType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private Integer price;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "release_year")
    private Integer releaseYear;

    @ElementCollection(targetClass = GenreType.class)
    @CollectionTable(name = "genre")
    @Enumerated(EnumType.STRING)
    private List<GenreType> genre;


}
