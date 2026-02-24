import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CadastroEmail() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [formValido, setFormValido] = useState(false);

  function validarFormulario(nomeAtual = nome, emailAtual = email) {
    if (!nomeAtual.trim()) {
      setErro('Digite seu nome completo');
      setFormValido(false);
      return;
    }

    if (nomeAtual.trim().split(' ').length < 2) {
      setErro('Digite nome e sobrenome');
      setFormValido(false);
      return;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;

    if (!emailRegex.test(emailAtual)) {
      setErro('Digite um Gmail válido');
      setFormValido(false);
      return;
    }

    setErro('');
    setFormValido(true);
  }

  function handleContinuar() {
  if (!formValido) return;

  router.push({
    pathname: '/verificacao-email',
    params: { email }
  });
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
        Crie sua conta com email
      </Text>

      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      {/* NOME */}
      <TextInput
        placeholder="Nome completo"
        placeholderTextColor="#94A3B8"
        style={[styles.input, erro && styles.inputError]}
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          validarFormulario(text, email);
        }}
      />

      {/* EMAIL */}
      <TextInput
        placeholder="Seu E-mail "
        placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        autoCapitalize="none"
        style={[styles.input, erro && styles.inputError]}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validarFormulario(nome, text);
        }}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={[styles.button, !formValido && styles.buttonDisabled]}
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
