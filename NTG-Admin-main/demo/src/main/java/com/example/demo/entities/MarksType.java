package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "MARKS_TYPE")
public class MarksType {

    @Id
    @Column(name = "TYPE_ID", nullable = false)
    private Long id;

    @Size(max = 50)
    @NotNull
    @Column(name = "MARK_TYPE", nullable = false, length = 50)
    private String markType;
}