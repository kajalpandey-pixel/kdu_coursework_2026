package com.example.demo.config;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserSeeder implements CommandLineRunner {

     private UserRepository userRepository ;
     private final PasswordEncoder passwordEncoder  ;

     public UserSeeder(UserRepository userRepository , PasswordEncoder passwordEncoder){
            this.userRepository = userRepository ;
            this.passwordEncoder = passwordEncoder ;
     }


     @Override
    public void run(String... args){
            if(userRepository.count() > 0) return ;
            // it means it has users
          User admin = new User() ;
          admin.setUserName("admin");
          admin.setRole(Role.ADMIN);
          admin.setPassword(passwordEncoder.encode("admin123"));


          User user = new User() ;
          user.setUserName("user1");
          user.setPassword(passwordEncoder.encode("user123"));
          user.setRole(Role.USER)  ;

          userRepository.save(user) ;
          userRepository.save(admin)  ;

          System.out.println("users are seeded , one is admin other is user") ;


     }

}
