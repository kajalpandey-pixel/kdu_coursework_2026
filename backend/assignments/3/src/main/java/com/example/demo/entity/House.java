package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name  = "house")
public class House extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String name  ;
    private String address ;


    @ManyToOne
    @JoinColumn(name = "admin_id" , nullable = false)
    private User admin  ;


    @ManyToMany
    @JoinTable(name = "house_users"  , joinColumns = @JoinColumn(name = "house_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
     private Set<User> users  = new HashSet<>()  ;

    @OneToMany(mappedBy = "house" ,  cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();

    //  -- this cascade will ensure that if you delete the house  , all rooms associated with it will be deleted .

    @OneToMany(mappedBy = "house")
    private List<Device>devices  = new ArrayList<>()  ;







}
