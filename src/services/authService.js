import { SECURITY_RULES, validateEmail, validatePassword } from '../config/securityRules';

const DEMO_USER = {
  email: 'ciudadano@reporte.app',
  password: 'Ciudadano2026*',
  fullName: 'Ciudadano Orley',
};

const state = {
  failedAttempts: 0,
  lockUntil: null,
  lastRecoveryRequestAt: null,
};

function now() {
  return Date.now();
}

function getLockRemainingMs() {
  if (!state.lockUntil) return 0;
  return Math.max(0, state.lockUntil - now());
}

function formatMinutes(ms) {
  return Math.ceil(ms / 60000);
}

export async function loginCitizen({ email, password }) {
  const emailError = validateEmail(email);
  if (emailError) {
    return { ok: false, message: emailError };
  }

  if (!password) {
    return { ok: false, message: 'La contraseña es obligatoria.' };
  }

  const lockRemaining = getLockRemainingMs();
  if (lockRemaining > 0) {
    return {
      ok: false,
      message: `Cuenta bloqueada temporalmente. Intenta en ${formatMinutes(lockRemaining)} min.`,
      code: 'LOCKED',
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const validCredentials =
    normalizedEmail === DEMO_USER.email.toLowerCase() && password === DEMO_USER.password;

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!validCredentials) {
    state.failedAttempts += 1;

    if (state.failedAttempts >= SECURITY_RULES.maxLoginAttempts) {
      state.lockUntil = now() + SECURITY_RULES.lockMinutes * 60000;
      state.failedAttempts = 0;
      return {
        ok: false,
        message: `Demasiados intentos. Bloqueo de ${SECURITY_RULES.lockMinutes} minutos.`,
        code: 'LOCKED',
      };
    }

    return {
      ok: false,
      message: `Credenciales invalidas. Intento ${state.failedAttempts}/${SECURITY_RULES.maxLoginAttempts}.`,
      code: 'INVALID_CREDENTIALS',
    };
  }

  state.failedAttempts = 0;
  state.lockUntil = null;

  return {
    ok: true,
    session: {
      token: `demo-token-${now()}`,
      user: {
        email: DEMO_USER.email,
        fullName: DEMO_USER.fullName,
      },
    },
  };
}

export async function requestPasswordRecovery({ email }) {
  const emailError = validateEmail(email);
  if (emailError) {
    return { ok: false, message: emailError };
  }

  const cooldownMs = SECURITY_RULES.forgotCooldownSeconds * 1000;
  const elapsed = now() - (state.lastRecoveryRequestAt || 0);
  const inCooldown = state.lastRecoveryRequestAt && elapsed < cooldownMs;

  if (inCooldown) {
    const seconds = Math.ceil((cooldownMs - elapsed) / 1000);
    return {
      ok: false,
      message: `Espera ${seconds}s antes de solicitar otro enlace.`,
      code: 'COOLDOWN',
    };
  }

  // En producción se enviaria un correo con token de un solo uso y vencimiento corto.
  state.lastRecoveryRequestAt = now();
  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    ok: true,
    message: 'Si el correo existe, se envio un enlace de recuperacion valido por 15 minutos.',
  };
}

export function validateNewPasswordPolicy(newPassword) {
  return validatePassword(newPassword);
}
