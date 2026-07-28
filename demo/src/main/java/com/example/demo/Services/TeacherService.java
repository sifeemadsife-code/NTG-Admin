package com.example.demo.Services;

import com.example.demo.DTOs.*;
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
import org.springframework.web.bind.annotation.PathVariable;

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
                        t.getUser().getEmail(),
                        t.getEducation(),
                        t.getUser().getIsdeleted(),
                        t.getNumberOfYearsOfExperience()
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
                teacher.getNumberOfYearsOfExperience(),
                teacher.getUser().getBirthDate(),
                teacher.getUser().getGender(),
                teacher.getUser().getReligion(),
                teacher.getUser().getNationalNumber(),
                teacher.getUser().getIsdeleted()
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
        System.out.println(request);

        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already registered");
        }

        Role engineerRole = roleRepository.findById(ENGINEER_ROLE_ID)
                .orElseThrow(() -> new RuntimeException("Engineer role not found"));

        User user = User.builder()
                .firstName(request.firstName())
                .lastName(request.lastName())
                .firstNameInArabic(request.firstNameInArabic())
                .lastNameInArabic(request.lastNameInArabic())
                .address(request.address())
                .gender(request.gender())
                .nationality(request.nationality())
                .birthDate(request.birthDate())
                .nationalNumber(request.nationalNumber())
                .religion(request.religion())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(engineerRole)
                .isdeleted(false)
                .build();

        User savedUser = userRepository.save(user);

        Teacher teacher = new Teacher();
        teacher.setUser(savedUser);
        teacher.setEducation(request.education());
        teacher.setEmploymentHistory(request.employmentHistory());
        teacher.setNumberOfYearsOfExperience(request.numberOfYearsOfExperience());

        Teacher savedTeacher = teacherRepository.save(teacher);

        return new TeacherProfileDTO(
                teacher.getId(),
                teacher.getUser().getFirstName(),
                teacher.getUser().getLastName(),
                teacher.getUser().getEmail(),
                teacher.getUser().getAddress(),
                teacher.getEducation(),
                teacher.getEmploymentHistory(),
                teacher.getNumberOfYearsOfExperience(),
                teacher.getUser().getBirthDate(),
                teacher.getUser().getGender(),
                teacher.getUser().getReligion(),
                teacher.getUser().getNationalNumber(),
                teacher.getUser().getIsdeleted()
        );
    }
    @Transactional
    public void deleteEngineer(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        User user = teacher.getUser();
        user.setIsdeleted(true);
        userRepository.save(user);
    }
    @Transactional
    public void restoreEngineer(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        User user = teacher.getUser();
        user.setIsdeleted(false);

        userRepository.save(user);
    }
    @Transactional
    public TeacherProfileDTO updateEngineer(Long id, UpdateEngineerRequestDTO request) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        User user = teacher.getUser();

        if (userRepository.existsByEmail(request.email())
                && !user.getEmail().equals(request.email())) {
            throw new RuntimeException("Email already registered");
        }

        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setEmail(request.email());
        user.setAddress(request.address());

        teacher.setEducation(request.education());
        teacher.setEmploymentHistory(request.employmentHistory());
        teacher.setNumberOfYearsOfExperience(request.numberOfYearsOfExperience());

        userRepository.save(user);
        Teacher savedTeacher = teacherRepository.save(teacher);

        return new TeacherProfileDTO(
                teacher.getId(),
                teacher.getUser().getFirstName(),
                teacher.getUser().getLastName(),
                teacher.getUser().getEmail(),
                teacher.getUser().getAddress(),
                teacher.getEducation(),
                teacher.getEmploymentHistory(),
                teacher.getNumberOfYearsOfExperience(),
                teacher.getUser().getBirthDate(),
                teacher.getUser().getGender(),
                teacher.getUser().getReligion(),
                teacher.getUser().getNationalNumber(),
                teacher.getUser().getIsdeleted()
        );
    }
}