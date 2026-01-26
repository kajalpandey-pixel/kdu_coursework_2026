package com.example.demo.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeviceRegistrationRequest {
    private String kickstonId;
    private String deviceUsername;
    private String devicePassword;
    private Long houseId;

    @Override
    public String toString() {
        return "DeviceRegistrationRequest{" +
                "kickstonId='" + kickstonId + '\'' +
                ", deviceUsername='" + deviceUsername + '\'' +
                ", devicePassword='" + devicePassword + '\'' +
                ", houseId=" + houseId +
                '}';
    }

}





