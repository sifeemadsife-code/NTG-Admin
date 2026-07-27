package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Embeddable
public class UserNotificationId implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @NotNull
    @Column(name = "NOTIFICATION_ID", nullable = false)
    private Long notificationId;

    @NotNull
    @Column(name = "SENT_TO", nullable = false)
    private Long sentTo;
}
