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
@Table(name = "MEDICAL_RECORD")
public class MedicalRecord {
    @Id
    @Column(name = "MEDICAL_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private com.example.demo.entities.Student student;

    @Size(max = 255)
    @NotNull
    @Column(name = "ILLNESS_TYPE", nullable = false)
    private String illnessType;


}