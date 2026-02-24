package com.personalpage.service.impl;

import com.personalpage.dto.ProfileResponse;
import com.personalpage.entity.Profile;
import com.personalpage.repository.ProfileRepository;
import com.personalpage.service.ProfileService;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final ProfileRepository profileRepository;

    public ProfileServiceImpl(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public ProfileResponse getProfile() {
        Profile profile = profileRepository.findTopByOrderByUpdatedAtDesc()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));

        return new ProfileResponse(
                profile.getFullName(),
                profile.getTitle(),
                profile.getAvatarUrl(),
                profile.getBio(),
                profile.getDailyLife(),
                splitCsv(profile.getSkills()),
                splitCsv(profile.getHobbies()),
                profile.getUpdatedAt());
    }

    private List<String> splitCsv(String raw) {
        return Arrays.stream(raw.split(","))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .toList();
    }
}
