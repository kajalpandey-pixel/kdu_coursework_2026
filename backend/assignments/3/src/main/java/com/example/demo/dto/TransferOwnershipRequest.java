package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransferOwnershipRequest {
    private Long adminId;
    private Long newAdminId;
}
