import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { validateEmail } from './config/securityRules';
import { loginCitizen, requestPasswordRecovery } from './services/authService';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { colors } from './theme/colors';

const ROUTES = {
  LOGIN: 'LOGIN',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  HOME: 'HOME',
};

export default function AppRoot() {
  const [route, setRoute] = useState(ROUTES.LOGIN);
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(null);

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [generalMessage, setGeneralMessage] = useState('');

  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState('');

  const headerText = useMemo(() => {
    if (route === ROUTES.HOME) return 'Seguimiento de incidencias urbanas';
    if (route === ROUTES.FORGOT_PASSWORD) return 'Seguridad de acceso ciudadano';
    return 'Acceso seguro al sistema';
  }, [route]);

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setGeneralMessage('');
  }

  async function handleLogin() {
    const emailError = validateEmail(values.email);
    const passwordError = values.password ? '' : 'La contraseña es obligatoria.';

    if (emailError || passwordError) {
      setErrors({ email: emailError || '', password: passwordError || '' });
      return;
    }

    setLoading(true);
    setGeneralMessage('');

    const result = await loginCitizen(values);

    setLoading(false);

    if (!result.ok) {
      setGeneralMessage(result.message);
      return;
    }

    setSession(result.session);
    setRoute(ROUTES.HOME);
  }

  async function handleRecovery() {
    const emailError = validateEmail(recoveryEmail);

    if (emailError) {
      setRecoveryError(emailError);
      return;
    }

    setLoading(true);
    setRecoveryError('');
    setRecoveryMessage('');

    const result = await requestPasswordRecovery({ email: recoveryEmail });

    setLoading(false);

    if (!result.ok) {
      setRecoveryMessage(result.message);
      return;
    }

    setRecoveryMessage(result.message);
  }

  function handleLogout() {
    setSession(null);
    setValues({ email: '', password: '' });
    setRoute(ROUTES.LOGIN);
    setGeneralMessage('Sesion cerrada correctamente.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>Ciudad Activa</Text>
          <Text style={styles.headerText}>{headerText}</Text>
        </View>

        {route === ROUTES.LOGIN ? (
          <LoginScreen
            values={values}
            errors={errors}
            generalMessage={generalMessage}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleLogin}
            onRegister={() => {
              setGeneralMessage('Registro disponible pronto.');
            }}
            onForgotPassword={() => {
              setRoute(ROUTES.FORGOT_PASSWORD);
              setRecoveryEmail(values.email);
              setRecoveryError('');
              setRecoveryMessage('');
            }}
          />
        ) : null}

        {route === ROUTES.FORGOT_PASSWORD ? (
          <ForgotPasswordScreen
            email={recoveryEmail}
            error={recoveryError}
            message={recoveryMessage}
            loading={loading}
            onChangeEmail={(value) => {
              setRecoveryEmail(value);
              setRecoveryError('');
            }}
            onSubmit={handleRecovery}
            onBack={() => setRoute(ROUTES.LOGIN)}
          />
        ) : null}

        {route === ROUTES.HOME ? (
          <HomeScreen user={session?.user} onLogout={handleLogout} />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundTop,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 28,
    backgroundColor: colors.backgroundBottom,
  },
  header: {
    marginBottom: 18,
  },
  appName: {
    color: '#d1fae5',
    fontWeight: '900',
    fontSize: 30,
    letterSpacing: 0.6,
  },
  headerText: {
    color: '#e0f2fe',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
  },
});
