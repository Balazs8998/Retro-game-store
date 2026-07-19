package com.retrostore.backend.service;

import com.retrostore.backend.domain.entity.Game;
import com.retrostore.backend.dto.response.GameDetailsResponse;
import com.retrostore.backend.dto.response.GameItemResponse;
import com.retrostore.backend.repository.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class GameService {

    private final GameRepository gameRepository;


    public GameService(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    public List<GameItemResponse> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return games.stream().map(GameItemResponse::mapToGameDto).toList();

    }

    public GameDetailsResponse getGames(Long id) {
        Game game = this.gameRepository.findById(id).orElseThrow(()
                -> new EntityNotFoundException("Game with this id: " + id + "not found"));

        return GameDetailsResponse.mapToGameDetailsDto(game);
    }
}
