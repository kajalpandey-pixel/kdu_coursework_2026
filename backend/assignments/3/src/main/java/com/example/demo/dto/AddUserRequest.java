package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
       private Long adminId ;
       // as admin is the only one who can add user
      private Long userId  ;
}
