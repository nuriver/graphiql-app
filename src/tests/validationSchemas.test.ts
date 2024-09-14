import { signInSchema, signUpSchema } from '../authorization/validationSchemas';

describe('Validation Schemas', () => {
  describe('signUpSchema', () => {
    test('should pass with valid data', async () => {
      const validData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(signUpSchema.validate(validData)).resolves.toBe(validData);
    });

    test('should fail when name is missing', async () => {
      const invalidData = {
        email: 'ryan.go@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Имя обязательно'
      );
    });

    test('should fail with invalid email format', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Некорректный формат email'
      );
    });

    test('should fail if password and confirmPassword do not match', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: 'Password123!',
        confirmPassword: 'DifferentPassword!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Пароли должны совпадать'
      );
    });

    test('should fail if password is too short', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: 'Pass1!',
        confirmPassword: 'Pass1!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать минимум 8 символов'
      );
    });

    test('should fail if password does not contain a letter', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: '12345678!',
        confirmPassword: '12345678!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы одну букву'
      );
    });

    test('should fail if password does not contain a digit', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: 'Password!',
        confirmPassword: 'Password!',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы одну цифру'
      );
    });

    test('should fail if password does not contain a special character', async () => {
      const invalidData = {
        name: 'Ryan Gosling',
        email: 'ryan.go@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      };

      await expect(signUpSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы один специальный символ'
      );
    });
  });

  describe('signInSchema', () => {
    test('should pass with valid data', async () => {
      const validData = {
        email: 'ryan.go@example.com',
        password: 'Password123!',
      };

      await expect(signInSchema.validate(validData)).resolves.toBe(validData);
    });

    test('should fail with invalid email format', async () => {
      const invalidData = {
        email: 'ryan.go',
        password: 'Password123!',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Некорректный формат email'
      );
    });

    test('should fail if email is missing', async () => {
      const invalidData = {
        password: 'Password123!',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Email обязателен'
      );
    });

    test('should fail if password is too short', async () => {
      const invalidData = {
        email: 'ryan.go@example.com',
        password: 'Pass1!',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать минимум 8 символов'
      );
    });

    test('should fail if password does not contain a letter', async () => {
      const invalidData = {
        email: 'ryan.go@example.com',
        password: '12345678!',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы одну букву'
      );
    });

    test('should fail if password does not contain a digit', async () => {
      const invalidData = {
        email: 'ryan.go@example.com',
        password: 'Password!',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы одну цифру'
      );
    });

    test('should fail if password does not contain a special character', async () => {
      const invalidData = {
        email: 'ryan.go@example.com',
        password: 'Password123',
      };

      await expect(signInSchema.validate(invalidData)).rejects.toThrow(
        'Пароль должен содержать хотя бы один специальный символ'
      );
    });
  });
});
