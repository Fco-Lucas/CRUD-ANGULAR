package com.lcsz.crud.exceptions;

import com.lcsz.crud.exceptions.customExceptions.EntityExistsException;
import com.lcsz.crud.exceptions.customExceptions.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    // Exceção criada quando o usuário fornece um payload errôniamente, ou seja, ainda nem chegou ao '@Valid' dos DTOs
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionMessage> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.BAD_REQUEST, String.format("PayLoad inválido: %s", ex.getMessage())));
    }

    // Exceção criada pelo SPRING qual se há campos inválidos em uma requisição, validação pela anotação '@Valid'
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionMessage> methodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request, BindingResult result) {
        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.UNPROCESSABLE_ENTITY, "Campo(s) inválido(s)", result));
    }

    // Exceção criada quando houver uma violação no banco de dados
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionMessage> dataIntegrityViolationException(DataIntegrityViolationException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.CONFLICT, ex.getMessage()));
    }

    // Exceção criada quando uma entidade não for encontrada
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionMessage> entityNotFoundException(RuntimeException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    // Exceção criada quando uma entidade já existe
    @ExceptionHandler(EntityExistsException.class)
    public ResponseEntity<ExceptionMessage> entityExistsException(RuntimeException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.CONFLICT, ex.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionMessage> runtimeException(RuntimeException ex, HttpServletRequest request) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .contentType(MediaType.APPLICATION_JSON)
                .body(new ExceptionMessage(request, HttpStatus.CONFLICT, "Erro interno do servidor: " + ex.getMessage()));
    }
}
