package com.lcsz.crud.dtos.users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserCreateDto {
    @NotBlank(message = "O campo 'name' é obrigatório")
    private String name;
    @NotBlank(message = "O campo 'cpf' é obrigatório")
    @Size(min = 11, max = 11, message = "O campo 'cpf' deve conter 11 caracteres")
    private String cpf;
    @NotBlank(message = "O campo 'password' é obrigatório")
    @Size(min = 6, message = "O campo 'password' deve conter ao menos 6 caracteres")
    private String password;

    public UserCreateDto() {
    }

    public UserCreateDto(String name, String cpf, String password) {
        this.name = name;
        this.cpf = cpf;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "CreateUserDto{" +
                "name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
