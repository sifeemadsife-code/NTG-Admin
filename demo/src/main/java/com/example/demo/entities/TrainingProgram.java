package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TRAINING_PROGRAM")
public class TrainingProgram {
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "training_program_seq"
    )
    @SequenceGenerator(
            name = "training_program_seq",
            sequenceName = "TRAINING_PROGRAM_SEQ",
            allocationSize = 1
    )
    @Column(name = "PROGRAM_ID")
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "TEACHER_ID", nullable = false)
    private Teacher teacher;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false)
    private com.example.demo.entities.User user;

    @Size(max = 255)
    @NotNull
    @Column(name = "PROGRAM_NAME", nullable = false)
    private String programName;

    @Size(max = 255)
    @Column(name = "DESCRIPTION")
    private String description;

    @NotNull
    @Column(name = "START_DATE", nullable = false)
    private LocalDate startDate;

    @Column(name = "END_DATE")
    private LocalDate endDate;

    @Size(max = 255)
    @Column(name = "LOCATION")
    private String location;

    @NotNull
    @Column(name = "CREATED_AT", nullable = false)
    private Instant createdAt;


}