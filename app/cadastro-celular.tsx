import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CadastroCelular() {
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');
  const [formValido, setFormValido] = useState(false);

  function validarTelefone(numeroAtual = telefone) {
    const numeroLimpo = numeroAtual.replace(/\D/g, '');

    if (!numeroLimpo) {
      setErro('Digite seu número de celular');
      setFormValido(false);
      return;
    }

    if (numeroLimpo.length !== 11) {
      setErro('Número deve ter 11 dígitos (DDD + número)');
      setFormValido(false);
      return;
    }

    if (!/^9/.test(numeroLimpo.substring(2))) {
      setErro('Celular deve começar com 9 após o DDD');
      setFormValido(false);
      return;
    }

    setErro('');
    setFormValido(true);
  }

  function handleContinuar() {
  if (!formValido) return;

  // envia o telefone para a próxima tela
  router.push({
    pathname: '/verificar-codigo',
    params: { telefone },
  });
}


  return (
    <View style={styles.container}>

      {/* LOGO + NOME */}
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
        Digite seu número para continuar
      </Text>

      {/* ERRO */}
      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      {/* INPUT TELEFONE */}
      <TextInput
        placeholder="( ) xxxxx-xxxx"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        style={[
          styles.input,
          erro && styles.inputError
        ]}
        value={telefone}
        onChangeText={(text) => {
          setTelefone(text);
          validarTelefone(text);
        }}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={[
          styles.button,
          !formValido && styles.buttonDisabled
        ]}
        disabled={!formValido}
        onPress={handleContinuar}
      >
        <Text style={styles.buttonText}>Continuar</Text>
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
    marginBottom: -5,
  },

  title: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 18,
    marginBottom: -5,
  },

  titleA: {
    color: '#22C55E',
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 16,
    marginBottom: 18,
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
    fontSize: 16,
    marginBottom: 14,
  },

  inputError: {
    borderColor: '#F87171',
  },

  button: {
    width: '100%',
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
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
