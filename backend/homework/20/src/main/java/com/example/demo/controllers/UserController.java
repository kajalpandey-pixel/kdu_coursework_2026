package com.example.demo.controllers;


import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {


    private final UserRepository userRepository ;

    UserController(UserRepository userRepository){
        this.userRepository = userRepository ;
    }

    @PostMapping
    public User createUser(@RequestBody User user){
           return userRepository.save(user) ;
    }



}
