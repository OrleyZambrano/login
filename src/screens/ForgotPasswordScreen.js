import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppInput } from '../components/AppInput';
import { AppButton } from '../components/AppButton';
import { colors } from '../theme/colors';

export function ForgotPasswordScreen({
  email,
  error,
  message,
  loading,
  onChangeEmail,
  onSubmit,
  onBack,
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.subtitle}>
        Te enviaremos un enlace de un solo uso y vigencia limitada para recuperar acceso.
      </Text>

      <AppInput
        label="Correo asociado"
        value={email}
        onChangeText={onChangeEmail}
        placeholder="ejemplo@correo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={error}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <AppButton title="Enviar enlace" onPress={onSubmit} loading={loading} />
      <AppButton title="Volver al login" onPress={onBack} variant="secondary" />

      <TouchableOpacity onPress={onBack} style={styles.linkWrap}>
        <Text style={styles.link}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textMain,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 18,
  },
  message: {
    marginBottom: 12,
    color: colors.primaryDark,
    fontWeight: '700',
  },
  linkWrap: {
    marginTop: 14,
    alignSelf: 'center',
  },
  link: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
});
