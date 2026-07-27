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
@Table(name = "STUDENTS_PARENTS")
public class StudentsParent {
    @EmbeddedId
    private com.example.demo.entities.StudentsParentId id;

    @MapsId("parentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PARENT_ID", nullable = false)
    private Parent parent;

    @MapsId("studentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private Student student;

    @Size(max = 255)
    @NotNull
    @Column(name = "PARENT_ROLE", nullable = false)
    private String parentRole;

    @NotNull
    @Column(name = "ISGUARDIAN", nullable = false)
    private Long isguardian;


}