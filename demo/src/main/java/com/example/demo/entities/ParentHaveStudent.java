package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PARENT_HAVE_STUDENT")
public class ParentHaveStudent {
    @EmbeddedId
    private com.example.demo.entities.ParentHaveStudentId id;

    @MapsId("parentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "PARENT_ID", nullable = false)
    private Parent parent;

    @MapsId("studentId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private com.example.demo.entities.Student student;

    @Size(max = 50)
    @Column(name = "PARENT_ROLE", length = 50)
    private String parentRole;

    @ColumnDefault("0")
    @Column(name = "IS_GUARDIAN")
    private Boolean isGuardian;


}