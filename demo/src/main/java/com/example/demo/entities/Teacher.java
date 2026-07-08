package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "TEACHER")
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "teacher_seq")
    @SequenceGenerator(name = "teacher_seq", sequenceName = "TEACHER_SEQ", allocationSize = 1)
    @Column(name = "teacher_id")
    private Long Id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false, unique = true)
    private com.example.demo.entities.User user;

    @Size(max = 255)
    @Column(name = "EDUCATION")
    private String education;

    @Size(max = 255)
    @Column(name = "EMPLOYMENT_HISTORY")
    private String employmentHistory;

    @Column(name = "NUMBER_OF_YEARS_OF_EXPERIENCE")
    private Long numberOfYearsOfExperience;
}