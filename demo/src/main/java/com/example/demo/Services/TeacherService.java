package com.example.demo.Services;

import com.example.demo.DTOs.CreateEngineerRequestDTO;
import com.example.demo.DTOs.EngineerCardsDTO;
import com.example.demo.DTOs.EngineerFeedbackResponseDTO;
import com.example.demo.DTOs.TeacherListDTO;
import com.example.demo.DTOs.TeacherProfileDTO;
import com.example.demo.entities.Role;
import com.example.demo.entities.Teacher;
import com.example.demo.entities.User;
import com.example.demo.repositories.EngineerFeedbackRepository;
import com.example.demo.repositories.MarkRepository;
import com.example.demo.repositories.ReportRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.TeacherRepository;
import com.example.demo.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private static final Long ENGINEER_ROLE_ID = 5L;

    private final TeacherRepository teacherRepository;
    private final EngineerFeedbackRepository engineerFeedbackRepository;
    private final ReportRepository reportRepository;
    private final MarkRepository markRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public List<TeacherListDTO> getAllTeachers() {
        return teacherRepository.findByUser_Role_Id(ENGINEER_ROLE_ID).stream()
                .map(t -> new TeacherListDTO(
                        t.getId(),
                        t.getUser().getFirstName(),
                        t.getUser().getLastName(),
                        t.getUser().getEmail()
                ))
                .toList();
    }

    public TeacherProfileDTO getTeacherProfile(Long teacherId) {
        var teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        return new TeacherProfileDTO(
                teacher.getId(),
                teacher.getUser().getFirstName(),
                teacher.getUser().getLastName(),
                teacher.getUser().getEmail(),
                teacher.getUser().getAddress(),
                teacher.getEducation(),
                teacher.getEmploymentHistory(),
                teacher.getNumberOfYearsOfExperience()
        );
    }

    public List<EngineerFeedbackResponseDTO> getTeacherFeedback(Long teacherId) {
        return engineerFeedbackRepository.findByTeacherId(teacherId).stream()
                .map(f -> new EngineerFeedbackResponseDTO(
                        f.getId(),
                        f.getFeedbackDate(),
                        f.getFeedback(),
                        f.getNotes(),
                        f.getUser().getFirstName(),
                        f.getUser().getLastName()
                ))
                .toList();
    }

    public EngineerCardsDTO getEngineerCards(Long teacherId) {
        var teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        Long userId = teacher.getUser().getId();

        long studentsCount = markRepository.countDistinctStudentsByTeacherId(teacherId);
        long reportsCount = reportRepository.countByUserId(userId);
        Double averageRate = engineerFeedbackRepository.findAverageRateByTeacherId(teacherId);

        return new EngineerCardsDTO(studentsCount, reportsCount, averageRate);
    }

    @Transactional
    public TeacherProfileDTO createEngineer(CreateEngineerRequestDTO request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already registered");
        }

        Role engineerRole = roleRepository.findById(ENGINEER_ROLE_ID)
                .orElseThrow(() -> new RuntimeException("Engineer role not found"));

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(engineerRole)
                .isdeleted(false)
                .build();

        User savedUser = userRepository.save(user);

        Teacher teacher = new Teacher();
        teacher.setId(savedUser.getId());
        teacher.setUser(savedUser);
        teacher.setEducation(request.education());
        teacher.setEmploymentHistory(request.employmentHistory());
        teacher.setNumberOfYearsOfExperience(request.numberOfYearsOfExperience());

        Teacher savedTeacher = teacherRepository.save(teacher);

        return new TeacherProfileDTO(
                savedTeacher.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getEmail(),
                savedUser.getAddress(),
                savedTeacher.getEducation(),
                savedTeacher.getEmploymentHistory(),
                savedTeacher.getNumberOfYearsOfExperience()
        );
    }
}