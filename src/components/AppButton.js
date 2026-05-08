import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

export function AppButton({ title, onPress, loading, variant = 'primary' }) {
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[styles.button, isSecondary ? styles.secondaryButton : styles.primaryButton]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={isSecondary ? colors.primary : '#ffffff'} />
      ) : (
        <Text style={[styles.buttonText, isSecondary ? styles.secondaryText : styles.primaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontWeight: '800',
    letterSpacing: 0.3,
    fontSize: 15,
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: colors.primaryDark,
  },
});
