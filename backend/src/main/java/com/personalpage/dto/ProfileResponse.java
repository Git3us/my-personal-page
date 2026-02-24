package com.personalpage.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ProfileResponse(
        String fullName,
        String title,
        String avatarUrl,
        String bio,
        String dailyLife,
        List<String> skills,
        List<String> hobbies,
        LocalDateTime updatedAt) {
}
