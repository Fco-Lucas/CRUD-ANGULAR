package com.lcsz.crud.mappers;

import com.lcsz.crud.dtos.users.UserCreateDto;
import com.lcsz.crud.dtos.users.UserResponseDto;
import com.lcsz.crud.models.AppUser;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {
    public static AppUser toUser(UserCreateDto dto) {
        return new ModelMapper().map(dto, AppUser.class);
    }

    public static UserResponseDto toDto(AppUser user) {
        return new ModelMapper().map(user, UserResponseDto.class);
    }

    public static List<UserResponseDto> toListDto(List<AppUser> users) {
        return users.stream().map(user -> toDto(user)).collect(Collectors.toList());
    }
}
