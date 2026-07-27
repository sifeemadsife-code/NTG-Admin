package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "USER_NOTIFICATIONS")
public class UserNotification {
    @EmbeddedId
    private com.example.demo.entities.UserNotificationId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @MapsId("notificationId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "NOTIFICATION_ID", nullable = false)
    private Notification notification;

    @MapsId("sentTo")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "SENT_TO", nullable = false)
    private User sentTo;


}