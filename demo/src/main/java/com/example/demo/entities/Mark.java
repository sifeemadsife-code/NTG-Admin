package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.demo.entities.User;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "MARKS")
public class Mark {
    @Id
    @Column(name = "MARK_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "COURSE_ID", nullable = false)
    private Course course;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TYPE_ID", nullable = false)
    private com.example.demo.entities.MarksType type;

    @NotNull
    @Column(name = "FEEDBACK_DATE", nullable = false)
    private LocalDate feedbackDate;

    @Size(max = 255)
    @Column(name = "FEEDBACK")
    private String feedback;

    @Size(max = 255)
    @Column(name = "NOTES")
    private String notes;


}