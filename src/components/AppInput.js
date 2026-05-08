import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

export function AppInput({ label, error, ...props }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={colors.textMuted}
        {...props}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    color: colors.textMain,
    fontWeight: '700',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: colors.textMain,
    backgroundColor: '#f9fafb',
  },
  inputError: {
    borderColor: colors.danger,
  },
  error: {
    marginTop: 6,
    color: colors.danger,
    fontSize: 12,
    fontWeight: '600',
  },
});
