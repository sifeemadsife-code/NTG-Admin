package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "STUDENT_EVALUATION")
public class StudentEvaluation {
    @Id
    @Column(name = "EVALUATION_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private Student student;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "USER_ID", nullable = false)
    private com.example.demo.entities.User user;

    @NotNull
    @Column(name = "EVALUATION_DATE", nullable = false)
    private LocalDate evaluationDate;

    @Column(name = "SCORE")
    private Long score;

    @Size(max = 150)
    @NotNull
    @Column(name = "EVALUATION_TEXT", nullable = false, length = 150)
    private String evaluationText;

    @Size(max = 150)
    @Column(name = "EVALUATION_NOTE", length = 150)
    private String evaluationNote;


}