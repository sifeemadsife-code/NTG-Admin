package com.example.demo.repositories;

import com.example.demo.entities.UserNotification;
import com.example.demo.entities.UserNotificationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UserNotificationId> {
    List<UserNotification> findBySentTo_IdOrderByNotification_SentAtDesc(Long sentToId);
    long countBySentTo_Id(Long sentToId);
}