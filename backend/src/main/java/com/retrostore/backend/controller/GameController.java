package com.retrostore.backend.controller;

import com.retrostore.backend.dto.response.GameDetailsResponse;
import com.retrostore.backend.dto.response.GameItemResponse;
import com.retrostore.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping
    public ResponseEntity<List<GameItemResponse>> getAllGames(){
        return ResponseEntity.ok(this.gameService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDetailsResponse> getGameDetails(@PathVariable Long id){
        return ResponseEntity.ok(this.gameService.getGames(id));
    }
}
