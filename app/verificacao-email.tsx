import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function VerificacaoEmail() {

  const { email } = useLocalSearchParams();

  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');

  function validarCodigo(texto: string) {
    setCodigo(texto);

    if (texto.length < 6) {
      setErro('Digite os 6 dígitos');
      return;
    }

    setErro('');
  }

  function handleConfirmar() {
    if (codigo.length !== 6) {
      setErro('Código inválido');
      return;
    }

    // Aqui depois você valida no backend
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.brand}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>
          <Text style={styles.titleA}>A</Text>bastapp
        </Text>
      </View>

      <Text style={styles.subtitle}>
        Enviamos um código para:
      </Text>

      <Text style={styles.emailText}>{email}</Text>

      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      <TextInput
        style={styles.input}
        placeholder="000-000"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        maxLength={6}
        value={codigo}
        onChangeText={validarCodigo}
      />

      <TouchableOpacity
        style={[
          styles.button,
          codigo.length !== 6 && styles.buttonDisabled
        ]}
        disabled={codigo.length !== 6}
        onPress={handleConfirmar}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: -4,
  },

  title: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  titleA: {
    color: '#22C55E',
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 16,
    marginBottom: 6,
  },

  emailText: {
    color: '#22C55E',
    marginBottom: 18,
    fontSize: 15,
  },

  errorText: {
    color: '#F87171',
    marginBottom: 10,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 14,
  },

  button: {
    width: '100%',
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 8,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  buttonText: {
    textAlign: 'center',
    color: '#022C22',
    fontSize: 16,
    fontWeight: '600',
  },
});
