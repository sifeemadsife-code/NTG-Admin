package com.example.demo.Services;

import com.example.demo.DTOs.CourseResponseDTO;
import com.example.demo.DTOs.CreateCourseRequestDTO;
import com.example.demo.DTOs.UpdateCourseRequestDTO;
import com.example.demo.entities.Course;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.Term;
import com.example.demo.repositories.CourseRepository;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.TermRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private final TermRepository termRepository;

    public List<CourseResponseDTO> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    public CourseResponseDTO getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return toResponse(course);
    }

    @Transactional
    public CourseResponseDTO createCourse(CreateCourseRequestDTO request) {
        if (courseRepository.existsByCourseNameIgnoreCase(request.courseName())) {
            throw new RuntimeException("Course already exists");
        }

        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Term term = termRepository.findById(request.termId())
                .orElseThrow(() -> new RuntimeException("Term not found"));

        Course course = new Course();
        course.setTeacher(teacher);
        course.setTerm(term);
        course.setCourseType("IT");
        course.setCourseName(request.courseName());
        course.setDescription(request.description());
        course.setStudyPlan(request.studyPlan());

        Course saved = courseRepository.save(course);
        return toResponse(saved);
    }

    @Transactional
    public CourseResponseDTO updateCourse(Long id, UpdateCourseRequestDTO request) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Term term = termRepository.findById(request.termId())
                .orElseThrow(() -> new RuntimeException("Term not found"));

        course.setTeacher(teacher);
        course.setTerm(term);
        course.setCourseName(request.courseName());
        course.setDescription(request.description());
        course.setStudyPlan(request.studyPlan());

        Course saved = courseRepository.save(course);
        return toResponse(saved);
    }

    @Transactional
    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new RuntimeException("Course not found");
        }
        courseRepository.deleteById(id);
    }

    private CourseResponseDTO toResponse(Course course) {
        return new CourseResponseDTO(
                course.getId(),
                course.getTeacher().getId(),
                course.getTeacher().getUser().getFirstName(),
                course.getTeacher().getUser().getLastName(),
                course.getTerm().getId(),
                course.getCourseType(),
                course.getCourseName(),
                course.getDescription(),
                course.getStudyPlan()
        );
    }
}