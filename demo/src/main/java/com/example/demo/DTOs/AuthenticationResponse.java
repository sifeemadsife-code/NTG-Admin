package com.example.demo.DTOs;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private Long expiresAt;
    private String role;
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
}