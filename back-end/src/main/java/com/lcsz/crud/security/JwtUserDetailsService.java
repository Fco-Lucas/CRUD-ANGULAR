package com.lcsz.crud.security;

import com.lcsz.crud.enums.users.UserStatus;
import com.lcsz.crud.models.AppUser;
import com.lcsz.crud.services.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserService userService;

    public JwtUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String cpf) throws UsernameNotFoundException {
        AppUser appUser = userService.getUserByCpf(cpf, UserStatus.ACTIVE);
        return new JwtUserDetails(appUser);
    }

    public JwtToken getTokenAuthenticated(String cpf) {
        AppUser appUser = userService.getUserByCpf(cpf, UserStatus.ACTIVE);
        return JwtUtils.createToken(appUser.getId(), cpf);
    }
}
