package com.example.demo.Controllers;

import com.example.demo.DTOs.AdminProfileResponseDTO;
import com.example.demo.DTOs.ChangePasswordRequestDTO;
import com.example.demo.DTOs.UpdateProfileRequestDTO;
import com.example.demo.Services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/me")
    public AdminProfileResponseDTO getMyProfile() {
        return profileService.getMyProfile();
    }

    @PutMapping("/me")
    public AdminProfileResponseDTO updateMyProfile(@RequestBody UpdateProfileRequestDTO request) {
        return profileService.updateMyProfile(request);
    }

    @PutMapping("/change-password")
    public void changePassword(@RequestBody ChangePasswordRequestDTO request) {
        profileService.changePassword(request);
    }
}