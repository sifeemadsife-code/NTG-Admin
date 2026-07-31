package com.example.demo.Controllers;

import com.example.demo.DTOs.UserListDTO;
import com.example.demo.Security.AuthenticationService;
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
    private final AuthenticationService authenticationService;

    @GetMapping("/recipients")
    public List<UserListDTO> getRecipients() {
        Long currentUserId = authenticationService.getUser().getId();

        return userRepository.findAllExceptStudentsAndUser(currentUserId).stream()
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