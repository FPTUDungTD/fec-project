package com.fec.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "users")
public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column (name = "username", nullable = false, unique = true, length = 50)
    private String username;
    @Column (name = "email", nullable = false, unique = true, length = 100)
    private String email;
    @Column (name = "password", nullable = false, length = 100)
    private String password;
    @Column (name = "role", nullable = false, length = 50)
    private String role;
    @Column (name = "state", nullable = false)
    private boolean state;
}