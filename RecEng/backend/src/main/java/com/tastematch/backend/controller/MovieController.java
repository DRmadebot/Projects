package com.tastematch.backend.controller;

import com.tastematch.backend.model.Movie;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


import java.util.Optional;
import java.util.List;

@RestController
public class MovieController {

    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return List.of(
            new Movie(1L, "Interstellar", "Sci-Fi", 2014),
            new Movie(2L, "The Dark Knight", "Action", 2008)
        );
    }

    @GetMapping("/api/movies/{id}")
    public Optional<Movie> getMovieById(@PathVariable Long id) {
        return getMovies().stream()
            .filter(movie -> movie.getId().equals(id))
            .findFirst();
    }
}
