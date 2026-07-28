package com.example.demo.Services;

import com.example.demo.DTOs.CreateNotificationRequestDTO;
import com.example.demo.DTOs.NotificationResponseDTO;
import com.example.demo.entities.Notification;
import com.example.demo.entities.User;
import com.example.demo.entities.UserNotification;
import com.example.demo.entities.UserNotificationId;
import com.example.demo.repositories.NotificationRepository;
import com.example.demo.repositories.UserNotificationRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserNotificationRepository userNotificationRepository;
    private final UserRepository userRepository;

    @Transactional
    public List<NotificationResponseDTO> createNotification(CreateNotificationRequestDTO request) {
        User sender = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Notification notification = new Notification();
        notification.setId(notificationRepository.getNextId());
        notification.setTitle(request.title());
        notification.setType(request.type());
        notification.setPriority(request.priority());
        notification.setBody(request.body());
        notification.setSentAt(LocalDate.now());

        Notification savedNotification = notificationRepository.save(notification);

        return request.sentToIds().stream().map(recipientId -> {
            User recipient = userRepository.findById(recipientId)
                    .orElseThrow(() -> new RuntimeException("Recipient not found: " + recipientId));

            UserNotification userNotification = new UserNotification();
            userNotification.setId(new UserNotificationId(sender.getId(), savedNotification.getId(), recipient.getId()));
            userNotification.setUser(sender);
            userNotification.setNotification(savedNotification);
            userNotification.setSentTo(recipient);

            UserNotification saved = userNotificationRepository.save(userNotification);
            return toResponse(saved);
        }).toList();
    }

    public List<NotificationResponseDTO> getUserNotifications(Long userId) {
        return userNotificationRepository.findBySentTo_IdOrderByNotification_SentAtDesc(userId)
                .stream().map(this::toResponse).toList();
    }

    public long countUserNotifications(Long userId) {
        return userNotificationRepository.countBySentTo_Id(userId);
    }

    @Transactional
    public void deleteNotification(Long id) {
        if (!notificationRepository.existsById(id)) {
            throw new RuntimeException("Notification not found");
        }
        userNotificationRepository.deleteByNotification_Id(id);
        notificationRepository.deleteById(id);
    }

    private NotificationResponseDTO toResponse(UserNotification un) {
        Notification n = un.getNotification();
        return new NotificationResponseDTO(
                n.getId(),
                n.getTitle(),
                n.getType(),
                n.getPriority(),
                n.getBody(),
                n.getSentAt(),
                un.getUser().getId(),
                un.getUser().getFirstName(),
                un.getUser().getLastName(),
                un.getSentTo().getId(),
                un.getSentTo().getFirstName(),
                un.getSentTo().getLastName()
        );
    }
}