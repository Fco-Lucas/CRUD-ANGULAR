package com.lcsz.crud.dtos.users;

import com.lcsz.crud.enums.users.UserStatus;

import java.util.UUID;

public class UserResponseDto {
    private UUID id;
    private String name;
    private String cpf;
    private UserStatus status;

    public UserResponseDto() {
    }

    public UserResponseDto(UUID id, String name, String cpf, UserStatus status) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.status = status;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UsersResponseDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
