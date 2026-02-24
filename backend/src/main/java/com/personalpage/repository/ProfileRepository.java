package com.personalpage.repository;

import com.personalpage.entity.Profile;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findTopByOrderByUpdatedAtDesc();
}
