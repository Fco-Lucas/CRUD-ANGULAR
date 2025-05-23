package com.lcsz.crud.models;

import com.lcsz.crud.enums.users.UserStatus;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.sql.Types;
import java.util.Objects;
import java.util.UUID;

@Entity()
@Table(name = "users")
public class AppUser {
    @Id
    @Column(length = 36, columnDefinition = "CHAR(36)")
    @JdbcTypeCode(Types.CHAR)
    private UUID id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 11)
    private String cpf;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status = UserStatus.ACTIVE;

    public AppUser() {
    }

    public AppUser(UUID id, String name, String cpf, String password, UserStatus status) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AppUser appUser = (AppUser) o;
        return Objects.equals(id, appUser.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AppUser{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cpf='" + cpf + '\'' +
                ", password='" + password + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
