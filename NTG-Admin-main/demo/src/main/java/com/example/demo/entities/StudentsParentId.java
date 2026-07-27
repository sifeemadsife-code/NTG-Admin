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
public class StudentsParentId implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull
    @Column(name = "PARENT_ID", nullable = false)
    private Long parentId;

    @NotNull
    @Column(name = "STUDENT_ID", nullable = false)
    private Long studentId;
}
