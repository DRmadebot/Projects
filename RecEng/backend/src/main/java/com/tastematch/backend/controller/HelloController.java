package com.tastematch.backend.controller;

import com.tastematch.backend.dto.HelloResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController{

    @GetMapping("/api/hello")
    public HelloResponse hello(){
        return new HelloResponse(
            "TasteMathc backend is working",
            "OK"
        );
    }
}