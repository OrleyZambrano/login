export const SECURITY_RULES = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minPasswordLength: 8,
  passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
  maxLoginAttempts: 5,
  lockMinutes: 15,
  forgotCooldownSeconds: 60,
};

export function validateEmail(email) {
  if (!email) return 'El correo es obligatorio.';
  if (!SECURITY_RULES.emailRegex.test(email.trim())) return 'Ingresa un correo valido.';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'La contraseña es obligatoria.';
  if (password.length < SECURITY_RULES.minPasswordLength) {
    return `La contraseña debe tener al menos ${SECURITY_RULES.minPasswordLength} caracteres.`;
  }
  if (!SECURITY_RULES.passwordRegex.test(password)) {
    return 'Debe incluir mayuscula, minuscula, numero y simbolo.';
  }
  return null;
}
