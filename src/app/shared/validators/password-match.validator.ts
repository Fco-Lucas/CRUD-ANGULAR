import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador customizado para garantir que dois campos de senha coincidam.
 * Deve ser aplicado ao FormGroup que contém os dois campos.
 *
 * @param passwordControlName O nome do FormControl para a senha principal.
 * @param confirmPasswordControlName O nome do FormControl para a confirmação de senha.
 * @returns Um objeto de erro { passwordMismatch: true } se as senhas não coincidirem, ou null se coincidirem.
 */
export function passwordMatchValidator(
  passwordControlName: string,
  confirmPasswordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordControlName);
    const confirmPassword = control.get(confirmPasswordControlName);

    // Se um dos campos não existe ou não foi tocado ainda, não valida
    if (!password || !confirmPassword) {
      return null;
    }

    // Se confirmPassword já tem um erro de validação (ex: 'required'), não sobrescreva
    // e deixe o erro original ser exibido primeiro.
    if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
      return null;
    }

    // Compara os valores
    if (password.value !== confirmPassword.value) {
      // Define o erro 'passwordMismatch' no FormControl de confirmação de senha
      // Isso permite que você mostre a mensagem de erro específica para o campo de confirmação
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }; // Retorna o erro no FormGroup também
    } else {
      // Se as senhas coincidem, remove o erro 'passwordMismatch' do campo de confirmação
      confirmPassword.setErrors(null);
      return null;
    }
  };
}