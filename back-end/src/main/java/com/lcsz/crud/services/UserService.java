package com.lcsz.crud.services;

import com.lcsz.crud.dtos.users.UserCreateDto;
import com.lcsz.crud.dtos.users.UserResponseDto;
import com.lcsz.crud.dtos.users.UserUpdateDto;
import com.lcsz.crud.enums.users.UserStatus;
import com.lcsz.crud.exceptions.customExceptions.EntityExistsException;
import com.lcsz.crud.exceptions.customExceptions.EntityNotFoundException;
import com.lcsz.crud.mappers.UserMapper;
import com.lcsz.crud.models.AppUser;
import com.lcsz.crud.repositories.UserInterface;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserInterface userInterface;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserInterface userInterface, PasswordEncoder passwordEncoder) {
        this.userInterface = userInterface;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDto createUser(UserCreateDto dto) {
        if(userInterface.findByCpfAndStatus(dto.getCpf(), UserStatus.ACTIVE).isPresent()) {
            throw new EntityExistsException(String.format("Usuário com CPF '%s' já existente", dto.getCpf()));
        }

        AppUser user = UserMapper.toUser(dto);
        user.setId(UUID.randomUUID());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        AppUser saved = userInterface.save(user);
        return UserMapper.toDto(saved);
    }

    public List<UserResponseDto> getAll() {
        List<AppUser> users = userInterface.findAll();
        return UserMapper.toListDto(users);
    }

    public AppUser getById(UUID id) {
        return userInterface.findById(id).orElseThrow(
                () -> new EntityExistsException(String.format("Usuário com id '%s' não encontrado", id))
        );
    }

    public UserResponseDto getByIdDto(UUID id) {
        AppUser user = this.getById(id);
        return UserMapper.toDto(user);
    }

    public AppUser getUserByCpf(String cpf, UserStatus status) {
        return userInterface.findByCpfAndStatus(cpf, status).orElseThrow(
                () -> new EntityNotFoundException(String.format("Usuário com cpf '%s' não encontrado", cpf))
        );
    }

    public void updateUser(UserUpdateDto dto) {
        AppUser user = this.getById(dto.getId());

        if(dto.getName() != null) user.setName(dto.getName());
        if(dto.getCpf() != null) {
            Optional<AppUser> userCpf = userInterface.findByCpfAndStatus(dto.getCpf(), UserStatus.ACTIVE);
            if(userCpf.isPresent() && !userCpf.get().getCpf().equals(user.getCpf())) {
                throw new DataIntegrityViolationException("Usuário com cpf informado já existente no banco de dados");
            }
            user.setCpf(dto.getCpf());
        }
        if(dto.getStatus() != null) user.setStatus(dto.getStatus());

        AppUser saved = userInterface.save(user);
    }

    public void deleteUser(UUID id) {
        AppUser user = this.getById(id);
        user.setStatus(UserStatus.INACTIVE);
        AppUser saved = userInterface.save(user);
    }
}
