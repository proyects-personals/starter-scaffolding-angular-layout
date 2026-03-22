export const RegexPatterns = {
  PHONE: /^[0-9]{10,}$/,
  CEDULA: /^[0-9]{7,10}$/,
  CONFIRMATION_CODE: /^[^\s]{6}$/,

  PASSWORD_NUMBER: /[0-9]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_SPECIAL: /[^A-Za-z0-9]/,
};
