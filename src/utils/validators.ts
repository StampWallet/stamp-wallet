const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const PASSWORD_MINLENGTH = 8;

export const required = {
  value: true,
  message: `This field is required.`,
};

export const maxLength = (maxNumberOfCharacters: number) => ({
  value: maxNumberOfCharacters,
  message: `Maximum number of characters is ${maxNumberOfCharacters}.`,
});

export const minLength = () => ({
  value: PASSWORD_MINLENGTH,
  message: `Minimum number of characters is ${PASSWORD_MINLENGTH}.`,
});

export const validateEmail = {
  value: EMAIL_REGEX,
  message: 'Invalid email.',
};

export const validatePhoneNumber = {
  value: PHONE_REGEX,
  message: 'Invalid phone number.',
};

export const validateMatchingPasswords = (
  password: string,
  passwordToMatch: string
): string | boolean => {
  if (password.localeCompare(passwordToMatch) === 0) {
    return true;
  }

  return 'Passwords do not match.';
};

export const validateNumber = (value: any): string | boolean => {
  if (isNaN(value)) return 'Please provide a number.';

  return true;
};
