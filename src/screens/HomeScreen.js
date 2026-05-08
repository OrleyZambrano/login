import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';

export function HomeScreen({ user, onLogout }) {
  const [selectedImage, setSelectedImage] = useState('');
  const [observation, setObservation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [evidences, setEvidences] = useState([]);

  const formattedUser = useMemo(() => user?.fullName || 'Ciudadano', [user]);

  async function requestCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  }

  async function requestGalleryPermission() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  }

  async function handleTakePhoto() {
    const allowed = await requestCameraPermission();

    if (!allowed) {
      setErrorMessage('Necesitamos permiso de camara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.length) {
      setSelectedImage(result.assets[0].uri);
      setErrorMessage('');
    }
  }

  async function handlePickImage() {
    const allowed = await requestGalleryPermission();

    if (!allowed) {
      setErrorMessage('Necesitamos permiso de galeria para seleccionar imagenes.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      aspect: [4, 3],
    });

    if (!result.canceled && result.assets?.length) {
      setSelectedImage(result.assets[0].uri);
      setErrorMessage('');
    }
  }

  function formatDate(value) {
    const date = new Date(value);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function handleSaveEvidence() {
    if (!selectedImage) {
      setErrorMessage('Debes seleccionar o tomar una imagen.');
      return;
    }

    if (!observation.trim()) {
      setErrorMessage('La observacion es obligatoria.');
      return;
    }

    const createdAt = new Date().toISOString();
    const newEvidence = {
      id: `${Date.now()}`,
      imageUri: selectedImage,
      observation: observation.trim(),
      createdAt,
    };

    setEvidences((prev) => [newEvidence, ...prev]);
    setSelectedImage('');
    setObservation('');
    setErrorMessage('');
  }

  function handleDeleteEvidence(item) {
    Alert.alert(
      'Eliminar evidencia',
      'Confirma que deseas borrar este registro.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setEvidences((prev) => prev.filter((entry) => entry.id !== item.id));
          },
        },
      ]
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.card}>
        <Text style={styles.title}>Registro de Evidencias</Text>
        <Text style={styles.subtitle}>Bienvenido, {formattedUser}</Text>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Imagen seleccionada</Text>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.preview} />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={styles.previewText}>Sin imagen</Text>
            </View>
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleTakePhoto}>
              <Text style={styles.actionText}>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonOutline} onPress={handlePickImage}>
              <Text style={styles.actionTextOutline}>Elegir de galeria</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Observacion</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe lo observado"
            placeholderTextColor={colors.textMuted}
            value={observation}
            onChangeText={(value) => {
              setObservation(value);
              if (errorMessage) setErrorMessage('');
            }}
            multiline
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEvidence}>
            <Text style={styles.saveText}>Guardar evidencia</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Evidencias registradas</Text>

          {evidences.length === 0 ? (
            <Text style={styles.emptyText}>Aun no hay evidencias guardadas.</Text>
          ) : (
            evidences.map((item, index) => (
              <View style={styles.evidenceCard} key={item.id}>
                <View style={styles.evidenceHeader}>
                  <Text style={styles.evidenceIndex}>{index + 1}.</Text>
                  <Text style={styles.evidenceObservation}>{item.observation}</Text>
                </View>
                <Text style={styles.evidenceDate}>{formatDate(item.createdAt)}</Text>
                <View style={styles.evidenceImageWrap}>
                  <Image source={{ uri: item.imageUri }} style={styles.evidenceImage} />
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteEvidence(item)}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },
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
  formSection: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textMain,
    marginBottom: 8,
  },
  preview: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginBottom: 12,
  },
  previewPlaceholder: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#f3f4f6',
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '800',
  },
  actionButtonOutline: {
    flex: 1,
    borderColor: colors.primary,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionTextOutline: {
    color: colors.primary,
    fontWeight: '800',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    minHeight: 90,
    textAlignVertical: 'top',
    color: colors.textMain,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '700',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveText: {
    color: '#1f2937',
    fontWeight: '900',
  },
  listSection: {
    marginBottom: 16,
  },
  emptyText: {
    color: colors.textMuted,
    fontWeight: '600',
  },
  evidenceCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginTop: 12,
    backgroundColor: '#f9fafb',
  },
  evidenceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  evidenceIndex: {
    fontWeight: '900',
    color: colors.textMain,
    marginRight: 6,
  },
  evidenceObservation: {
    flex: 1,
    fontWeight: '700',
    color: colors.textMain,
  },
  evidenceDate: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
  },
  evidenceImageWrap: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  evidenceImage: {
    width: '100%',
    height: 160,
  },
  deleteButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: colors.danger,
    fontWeight: '800',
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
