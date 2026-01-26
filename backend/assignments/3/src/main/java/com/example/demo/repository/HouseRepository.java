
package com.example.demo.repository;

import com.example.demo.entity.House;
import com.example.demo.entity.User;
import lombok.Getter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List ;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {

    // Houses user belongs to
    List<House> findByUsers_Id(Long userId);

    // Houses user is admin of
    List<House> findByAdmin_Id(Long adminId);
}
