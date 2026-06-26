package com.example.demo.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PERMISSIONS")
public class Permission {
    @Id
    @Column(name = "PERMISSION_ID", nullable = false)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private com.example.demo.entities.Student student;

    @Size(max = 255)
    @NotNull
    @Column(name = "REASON", nullable = false)
    private String reason;

    @Size(max = 255)
    @Column(name = "NOTES")
    private String notes;

    @ColumnDefault("sysdate")
    @Column(name = "\"date\"")
    private LocalDate date;


}