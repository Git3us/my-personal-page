package com.personalpage.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 64)
    private String fullName;

    @Column(nullable = false, length = 64)
    private String title;

    @Column(nullable = false, length = 255)
    private String avatarUrl;

    @Column(nullable = false, length = 1000)
    private String bio;

    @Column(nullable = false, length = 1000)
    private String dailyLife;

    @Column(nullable = false, length = 500)
    private String skills;

    @Column(nullable = false, length = 500)
    private String hobbies;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
