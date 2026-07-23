package com.retrostore.backend.dto.response;

import java.util.List;

public record GameFormInitData(
        List<GenreOption> genres,
        List<RatingOption> ratings

) {
}
