package com.example.demo.repositories;

import com.example.demo.entities.UserNotification;
import com.example.demo.entities.UserNotificationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserNotificationRepository extends JpaRepository<UserNotification, UserNotificationId> {
    List<UserNotification> findBySentTo_IdOrderByNotification_SentAtDesc(Long sentToId);
    long countBySentTo_Id(Long sentToId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserNotification un WHERE un.notification.id = :notificationId")
    void deleteByNotification_Id(@Param("notificationId") Long notificationId);
}