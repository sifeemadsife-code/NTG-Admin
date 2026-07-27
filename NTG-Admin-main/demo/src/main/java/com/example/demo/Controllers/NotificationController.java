package com.example.demo.Controllers;

import com.example.demo.DTOs.CreateNotificationRequestDTO;
import com.example.demo.DTOs.NotificationResponseDTO;
import com.example.demo.Services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public List<NotificationResponseDTO> create(@RequestBody CreateNotificationRequestDTO request) {
        return notificationService.createNotification(request);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponseDTO> getUserNotifications(@PathVariable Long userId) {
        return notificationService.getUserNotifications(userId);
    }

    @GetMapping("/user/{userId}/count")
    public long countUserNotifications(@PathVariable Long userId) {
        return notificationService.countUserNotifications(userId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
    }
}