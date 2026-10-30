package com.fec.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.fec.backend.repository")
public class FecBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FecBackendApplication.class, args);
    }
}