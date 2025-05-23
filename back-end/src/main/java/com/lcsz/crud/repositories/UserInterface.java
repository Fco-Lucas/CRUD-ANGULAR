package com.lcsz.crud.repositories;

import com.lcsz.crud.enums.users.UserStatus;
import com.lcsz.crud.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserInterface extends JpaRepository<AppUser, UUID> {
    Optional<AppUser> findByCpfAndStatus(String cpf, UserStatus status);
}
