import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';

export function HomeScreen({ user, onLogout }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Panel Ciudadano</Text>
      <Text style={styles.subtitle}>Bienvenido, {user?.fullName}</Text>

      <View style={styles.kpiBox}>
        <Text style={styles.kpiLabel}>Estado de la sesión</Text>
        <Text style={styles.kpiValue}>Activa y segura</Text>
      </View>

      <Text style={styles.info}>
        Siguiente paso: captura foto, registra ubicacion GPS y envia el reporte al municipio.
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: colors.primaryDark,
    fontWeight: '700',
    marginBottom: 16,
  },
  kpiBox: {
    borderRadius: 14,
    backgroundColor: '#ecfeff',
    borderColor: '#a5f3fc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 14,
  },
  kpiLabel: {
    fontSize: 12,
    color: '#155e75',
    fontWeight: '700',
  },
  kpiValue: {
    fontSize: 20,
    color: '#0f766e',
    fontWeight: '900',
  },
  info: {
    fontSize: 14,
    color: colors.textMain,
    marginBottom: 18,
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontWeight: '800',
  },
});
