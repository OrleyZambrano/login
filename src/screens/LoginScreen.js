import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppInput } from '../components/AppInput';
import { AppButton } from '../components/AppButton';
import { colors } from '../theme/colors';

const REPORT_LOGO = require('../../assets/b9bb2bda-3dcf-4d40-bafc-67ea8fa9ed0f.png');

export function LoginScreen({
	values,
	errors,
	generalMessage,
	loading,
	onChange,
	onSubmit,
	onRegister,
	onForgotPassword,
}) {
	return (
		<View style={styles.card}>
			<View style={styles.heroArea}>
				<View style={styles.logoWrap}>
					<Image source={REPORT_LOGO} style={styles.logo} resizeMode="contain" />
				</View>
				<View style={styles.badge}>
					<Text style={styles.badgeText}>Ciudad Activa</Text>
				</View>
				<Text style={styles.title}>Sistema de Reporte Ciudadano</Text>
				<Text style={styles.subtitle}>Accede para fotografiar y geolocalizar problemas urbanos.</Text>
			</View>

			<AppInput
				label="Correo ciudadano"
				value={values.email}
				onChangeText={(text) => onChange('email', text)}
				placeholder="ejemplo@correo.com"
				keyboardType="email-address"
				autoCapitalize="none"
				error={errors.email}
			/>

			<AppInput
				label="Contraseña"
				value={values.password}
				onChangeText={(text) => onChange('password', text)}
				placeholder="Tu contraseña"
				secureTextEntry
				autoCapitalize="none"
				error={errors.password}
			/>

			{generalMessage ? <Text style={styles.general}>{generalMessage}</Text> : null}

			<AppButton title="Iniciar sesión" onPress={onSubmit} loading={loading} />
			<AppButton title="Registrarme" onPress={onRegister} variant="secondary" />

			<TouchableOpacity onPress={onForgotPassword} style={styles.linkWrap}>
				<Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
			</TouchableOpacity>

			<View style={styles.infoRow}>
				<View style={styles.infoPill}>
					<Text style={styles.infoPillText}>Foto</Text>
				</View>
				<View style={styles.infoPill}>
					<Text style={styles.infoPillText}>GPS</Text>
				</View>
				<View style={styles.infoPill}>
					<Text style={styles.infoPillText}>Reporte</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: colors.card,
		borderRadius: 24,
		padding: 20,
		borderWidth: 1,
		borderColor: '#e2e8f0',
		shadowColor: '#0f172a',
		shadowOpacity: 0.16,
		shadowRadius: 18,
		elevation: 6,
	},
	heroArea: {
		alignItems: 'center',
		marginBottom: 14,
	},
	logoWrap: {
		width: 148,
		height: 148,
		borderRadius: 74,
		backgroundColor: '#f8fafc',
		borderWidth: 1,
		borderColor: '#cbd5e1',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#0f172a',
		shadowOpacity: 0.14,
		shadowRadius: 14,
		elevation: 4,
	},
	logo: {
		width: 136,
		height: 136,
	},
	badge: {
		marginTop: 12,
		backgroundColor: '#ecfeff',
		borderColor: '#99f6e4',
		borderWidth: 1,
		paddingVertical: 4,
		paddingHorizontal: 10,
		borderRadius: 999,
	},
	badgeText: {
		color: '#0f766e',
		fontSize: 12,
		fontWeight: '800',
		letterSpacing: 0.5,
	},
	title: {
		fontSize: 25,
		fontWeight: '900',
		color: colors.textMain,
		marginTop: 10,
		marginBottom: 8,
		textAlign: 'center',
		letterSpacing: 0.3,
	},
	subtitle: {
		fontSize: 14,
		color: colors.textMuted,
		marginBottom: 8,
		textAlign: 'center',
		lineHeight: 20,
	},
	general: {
		color: colors.danger,
		marginBottom: 10,
		fontWeight: '700',
		backgroundColor: '#fef2f2',
		borderWidth: 1,
		borderColor: '#fecaca',
		borderRadius: 10,
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	linkWrap: {
		marginTop: 16,
		alignSelf: 'center',
	},
	link: {
		color: colors.primaryDark,
		fontWeight: '700',
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 14,
		gap: 8,
	},
	infoPill: {
		backgroundColor: '#f1f5f9',
		borderColor: '#cbd5e1',
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 11,
		borderRadius: 999,
	},
	infoPillText: {
		color: '#334155',
		fontWeight: '700',
		fontSize: 12,
	},
});