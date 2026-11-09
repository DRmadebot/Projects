
package com.tastematch.backend.service;

import com.tastematch.backend.model.Movie;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final List<Movie> movies = List.of(
        new Movie(1L, "Interstellar", "Sci-Fi", 2014),
        new Movie(2L, "The Dark Knight", "Action", 2008)
    );

    public List<Movie> getAllMovies() {
        return movies;
    }

    public Optional<Movie> getMovieById(Long id) {
        return movies.stream()
            .filter(movie -> movie.getId().equals(id))
            .findFirst();
    }
}
