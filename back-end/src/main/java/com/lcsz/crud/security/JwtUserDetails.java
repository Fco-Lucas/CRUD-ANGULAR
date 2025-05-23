package com.lcsz.crud.security;

import com.lcsz.crud.models.AppUser;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import java.util.UUID;

public class JwtUserDetails extends User {
    private AppUser appUser;

    public JwtUserDetails(AppUser appUser) {
        super(appUser.getCpf(), appUser.getPassword(), AuthorityUtils.NO_AUTHORITIES);
        this.appUser = appUser;
    }

    public UUID getId() {
        return this.appUser.getId();
    }
}
