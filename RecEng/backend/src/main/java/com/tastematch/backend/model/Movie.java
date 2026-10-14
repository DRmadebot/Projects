package com.tastematch.backend.model;

public class Movie{
    private Long id;
    private String title;
    private String genre;
    private int releaseYear;

    public Movie(Long id, String title, String genre, int releaseYear){
        this.id = id;
        this.title = title;
        this.genre=genre;
        this.releaseYear = releaseYear;
    }
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getGenre() {
        return genre;
    }

    public int getReleaseYear() {
        return releaseYear;
    }
    
}