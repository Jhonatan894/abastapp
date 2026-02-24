import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function VerificarCodigo() {
  const { telefone } = useLocalSearchParams();
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const [valido, setValido] = useState(false);

  function validarCodigo(valor = codigo) {
    const somenteNumeros = valor.replace(/\D/g, '');

    setCodigo(somenteNumeros);

    if (somenteNumeros.length < 6) {
      setValido(false);
      return;
    }

    if (somenteNumeros !== '123456') {
      setErro('Código inválido');
      setValido(false);
      return;
    }

    setErro('');
    setValido(true);
  }

  function handleConfirmar() {
    if (!valido) return;

    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Verificação</Text>

      <Text style={styles.subtitle}>
        Enviamos um código para {telefone}
      </Text>

      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      <TextInput
        style={[styles.input, erro && styles.inputError]}
        placeholder="Digite os 6 dígitos"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        maxLength={6}
        value={codigo}
        onChangeText={(text) => validarCodigo(text)}
      />

      <TouchableOpacity
        style={[styles.button, !valido && styles.buttonDisabled]}
        disabled={!valido}
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

  title: {
    fontSize: 28,
    color: '#22C55E',
    fontWeight: '700',
    marginBottom: 10,
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },

  errorText: {
    color: '#F87171',
    marginBottom: 10,
    fontSize: 14,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 6,
    marginBottom: 20,
  },

  inputError: {
    borderColor: '#F87171',
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
