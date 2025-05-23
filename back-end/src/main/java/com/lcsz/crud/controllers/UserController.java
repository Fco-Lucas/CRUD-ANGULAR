package com.lcsz.crud.controllers;

import com.lcsz.crud.dtos.users.UserCreateDto;
import com.lcsz.crud.dtos.users.UserResponseDto;
import com.lcsz.crud.dtos.users.UserUpdateDto;
import com.lcsz.crud.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> create(@RequestBody @Valid UserCreateDto dto) {
        UserResponseDto response = userService.createUser(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAll() {
        List<UserResponseDto> response = userService.getAll();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getById(@PathVariable UUID id) {
        UserResponseDto response = userService.getByIdDto(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PatchMapping
    public ResponseEntity<Void> update(@RequestBody @Valid UserUpdateDto dto) {
        userService.updateUser(dto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
