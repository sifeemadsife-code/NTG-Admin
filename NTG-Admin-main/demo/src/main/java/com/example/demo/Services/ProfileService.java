package com.example.demo.Services;

import com.example.demo.DTOs.AdminProfileResponseDTO;
import com.example.demo.DTOs.ChangePasswordRequestDTO;
import com.example.demo.DTOs.UpdateProfileRequestDTO;
import com.example.demo.Security.AuthenticationService;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminProfileResponseDTO getMyProfile() {
        User user = authenticationService.getUser();
        return toResponse(user);
    }

    @Transactional
    public AdminProfileResponseDTO updateMyProfile(UpdateProfileRequestDTO request) {
        User user = authenticationService.getUser();

        if (!user.getEmail().equalsIgnoreCase(request.email())
                && userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already in use");
        }

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setFirstNameInArabic(request.firstNameInArabic());
        user.setLastNameInArabic(request.lastNameInArabic());
        user.setEmail(request.email());
        user.setAddress(request.address());
        user.setGender(request.gender());
        user.setNationality(request.nationality());
        user.setBirthDate(request.birthDate());
        user.setReligion(request.religion());
        user.setNationalNumber(request.nationalNumber());

        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    @Transactional
    public void changePassword(ChangePasswordRequestDTO request) {
        User user = authenticationService.getUser();

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    private AdminProfileResponseDTO toResponse(User user) {
        return new AdminProfileResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getFirstNameInArabic(),
                user.getLastNameInArabic(),
                user.getEmail(),
                user.getAddress(),
                user.getIsdeleted(),
                user.getCreatedAt(),
                user.getLastLogin(),
                user.getGender(),
                user.getNationality(),
                user.getBirthDate(),
                user.getReligion(),
                user.getNationalNumber(),
                user.getRole() != null ? user.getRole().getId() : null,
                user.getRole() != null ? user.getRole().getRoleName() : null
        );
    }
}