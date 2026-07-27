package com.example.demo.Services;

import com.example.demo.DTOs.StudentDTO;
import com.example.demo.DTOs.StudentDetailsDTO;
import com.example.demo.DTOs.StudentSubjectDTO;
import com.example.demo.entities.Attendance;
import com.example.demo.entities.Course;
import com.example.demo.entities.Mark;
import com.example.demo.entities.Student;
import com.example.demo.entities.User;
import com.example.demo.repositories.AttendanceRepository;
import com.example.demo.repositories.MarkRepository;
import com.example.demo.repositories.StudentRepository;
import com.example.demo.repositories.ViolationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final AttendanceRepository attendanceRepository;
    private final ViolationRepository violationRepository;
    private final MarkRepository markRepository;

    public Optional<Student> findByUserId(Long userId) {
        return studentRepository.findByUserId(userId);
    }

    public List<StudentDTO> findAllStudents() {
        return studentRepository.findAll().stream().map(s -> new StudentDTO(
                s.getId(),
                s.getUser().getFirstName(),
                s.getUser().getLastName(),
                s.getStudentClass() != null && s.getStudentClass().getGrade() != null
                        ? s.getStudentClass().getGrade().getName()
                        : null,
                s.getUser().getIsdeleted()
        )).toList();
    }

    public Long countStudents() {
        return studentRepository.count();
    }

    @Transactional(readOnly = true)
    public StudentDetailsDTO getStudentDetails(Long studentId) {
        Student student = studentRepository.findDetailsById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        User user = student.getUser();

        // --- Attendance rate ---
        List<Attendance> attendances = attendanceRepository.findByStudentId(studentId);
        long totalSessions = attendances.size();
        long presentSessions = attendances.stream()
                .filter(a -> a.getStatus() != null && Character.toUpperCase(a.getStatus()) == 'P')
                .count();
        double attendanceRate = totalSessions == 0
                ? 0.0
                : Math.round((presentSessions * 10000.0) / totalSessions) / 100.0;

        // --- Violations ---
        long violationsCount = violationRepository.countByStudentId(studentId);

        // --- Marks grouped by course ---
        List<Mark> marks = markRepository.findByUserIdWithCourseAndType(user.getId());

        Map<Long, List<Mark>> marksByCourse = marks.stream()
                .collect(Collectors.groupingBy(m -> m.getCourse().getId()));

        List<StudentSubjectDTO> subjects = marksByCourse.values().stream()
                .map(courseMarks -> {
                    Course course = courseMarks.get(0).getCourse();
                    Double midterm = findScoreByType(courseMarks, "Midterm");
                    Double finalScore = findScoreByType(courseMarks, "Final");
                    double total = (midterm != null ? midterm : 0)
                            + (finalScore != null ? finalScore : 0);
                    return new StudentSubjectDTO(course.getCourseName(), midterm, finalScore, total);
                })
                .toList();

        // --- Assignments done (marks of type "Assignment") ---
        long assignmentsDone = marks.stream()
                .filter(m -> m.getType() != null
                        && "Assignment".equalsIgnoreCase(m.getType().getMarkType()))
                .count();

        // --- Class rank (based on total marks within the same class) ---
        long classRank = 1;
        if (student.getStudentClass() != null) {
            List<Long> classmateIds = studentRepository.findIdsByClassId(student.getStudentClass().getId());
            Map<Long, Double> totalsByStudent = new HashMap<>();

            for (Long classmateId : classmateIds) {
                studentRepository.findById(classmateId).ifPresent(classmate -> {
                    List<Mark> cMarks = markRepository.findByUserIdWithCourseAndType(classmate.getUser().getId());
                    double sum = cMarks.stream()
                            .mapToDouble(m -> m.getScore() != null ? m.getScore() : 0)
                            .sum();
                    totalsByStudent.put(classmateId, sum);
                });
            }

            double myTotal = totalsByStudent.getOrDefault(studentId, 0.0);
            classRank = totalsByStudent.values().stream()
                    .filter(v -> v > myTotal)
                    .count() + 1;
        }

        return new StudentDetailsDTO(
                student.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                student.getStudentClass() != null && student.getStudentClass().getGrade() != null
                        ? student.getStudentClass().getGrade().getName()
                        : null,
                student.getId(),
                attendanceRate,
                assignmentsDone,
                violationsCount,
                classRank,
                subjects
        );
    }

    private Double findScoreByType(List<Mark> marks, String typeName) {
        return marks.stream()
                .filter(m -> m.getType() != null && typeName.equalsIgnoreCase(m.getType().getMarkType()))
                .map(Mark::getScore)
                .filter(Objects::nonNull)
                .findFirst()
                .orElse(null);
    }
}