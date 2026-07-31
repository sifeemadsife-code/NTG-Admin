package com.example.demo.repositories;

import com.example.demo.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    Optional<User> findByFirstName(String firstName);
    boolean existsByEmail(String email);

    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE UPPER(u.role.roleName) <> 'STUDENT'")
    List<User> findAllExceptStudents();

    // NEW: excludes students AND the current logged-in user
    @Query("SELECT u FROM User u JOIN FETCH u.role " +
            "WHERE UPPER(u.role.roleName) <> 'STUDENT' AND u.id <> :currentUserId")
    List<User> findAllExceptStudentsAndUser(@Param("currentUserId") Long currentUserId);
}