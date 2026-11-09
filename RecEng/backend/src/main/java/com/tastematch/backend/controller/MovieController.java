
package com.tastematch.backend.controller;

import com.tastematch.backend.model.Movie;
import com.tastematch.backend.service.MovieService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/api/movies")
    public List<Movie> getMovies() {
        return movieService.getAllMovies();
    }

    
    @GetMapping("/api/movies/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {

        Optional<Movie> movie = movieService.getMovieById(id);

        if (movie.isPresent()) {
            return ResponseEntity.ok(movie.get());
        }

        return ResponseEntity.notFound().build();
    }

}
