package com.example.demo.Controllers;

import com.example.demo.DTOs.UserListDTO;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/recipients")
    public List<UserListDTO> getRecipients() {
        return userRepository.findAllExceptStudents().stream()
                .map(u -> new UserListDTO(
                        u.getId(),
                        u.getFirstName(),
                        u.getLastName(),
                        u.getEmail(),
                        u.getRole() != null ? u.getRole().getRoleName() : null
                ))
                .toList();
    }
}