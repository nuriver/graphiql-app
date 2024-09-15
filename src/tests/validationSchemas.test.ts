import { ValidationError } from 'yup';
import {
  signInSchemaYup,
  signUpSchemaYup,
} from '../authorization/validationSchemas';
describe('signUpSchemaYup', () => {
  const t = (key: string) => key;

  it('should validate valid data', async () => {
    const schema = signUpSchemaYup(t);
    await expect(
      schema.validate({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password1!',
        confirmPassword: 'Password1!',
      })
    ).resolves.toBeTruthy();
  });

  it('should fail if required fields are missing', async () => {
    const schema = signUpSchemaYup(t);
    await expect(
      schema.validate({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
    ).rejects.toThrow(ValidationError);
  });

  it('should fail if email is invalid', async () => {
    const schema = signUpSchemaYup(t);
    await expect(
      schema.validate({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password1!',
        confirmPassword: 'Password1!',
      })
    ).rejects.toThrow(ValidationError);
  });

  it('should fail if passwords do not match', async () => {
    const schema = signUpSchemaYup(t);
    await expect(
      schema.validate({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'Password1!',
        confirmPassword: 'DifferentPassword1!',
      })
    ).rejects.toThrow(ValidationError);
  });

  it('should fail if password is too short or lacks required characters', async () => {
    const schema = signUpSchemaYup(t);
    await expect(
      schema.validate({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'short',
        confirmPassword: 'short',
      })
    ).rejects.toThrow(ValidationError);
  });
});

describe('signInSchemaYup', () => {
  const t = (key: string) => key;

  it('should validate valid data', async () => {
    const schema = signInSchemaYup(t);
    await expect(
      schema.validate({
        email: 'john.doe@example.com',
        password: 'Password1!',
      })
    ).resolves.toBeTruthy();
  });

  it('should fail if required fields are missing', async () => {
    const schema = signInSchemaYup(t);
    await expect(
      schema.validate({
        email: '',
        password: '',
      })
    ).rejects.toThrow(ValidationError);
  });

  it('should fail if email is invalid', async () => {
    const schema = signInSchemaYup(t);
    await expect(
      schema.validate({
        email: 'invalid-email',
        password: 'Password1!',
      })
    ).rejects.toThrow(ValidationError);
  });

  it('should fail if password is too short or lacks required characters', async () => {
    const schema = signInSchemaYup(t);
    await expect(
      schema.validate({
        email: 'john.doe@example.com',
        password: 'short',
      })
    ).rejects.toThrow(ValidationError);
  });
});
