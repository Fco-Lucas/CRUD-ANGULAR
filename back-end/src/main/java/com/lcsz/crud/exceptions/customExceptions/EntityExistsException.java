package com.lcsz.crud.exceptions.customExceptions;

public class EntityExistsException extends RuntimeException {
    public EntityExistsException(String message) {
        super(message);
    }
}
