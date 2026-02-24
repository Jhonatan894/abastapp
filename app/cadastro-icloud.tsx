import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

export default function CadastroIcloud() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [erro, setErro] = useState('');
  const [formValido, setFormValido] = useState(false);

  function validarCampos(nomeAtual = nome, sobrenomeAtual = sobrenome) {
    const nomeLimpo = nomeAtual.trim();
    const sobrenomeLimpo = sobrenomeAtual.trim();

    const regexLetras = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

    if (!nomeLimpo || !sobrenomeLimpo) {
      setErro('Preencha nome e sobrenome');
      setFormValido(false);
      return;
    }

    if (nomeLimpo.length < 2) {
      setErro('Nome deve ter pelo menos 2 letras');
      setFormValido(false);
      return;
    }

    if (sobrenomeLimpo.length < 2) {
      setErro('Sobrenome deve ter pelo menos 2 letras');
      setFormValido(false);
      return;
    }

    if (!regexLetras.test(nomeLimpo) || !regexLetras.test(sobrenomeLimpo)) {
      setErro('Use apenas letras no nome');
      setFormValido(false);
      return;
    }

    setErro('');
    setFormValido(true);
  }

  function handleContinuar() {
    if (!formValido) return;

    // login fake concluído (front-end apenas)
    router.replace('/(tabs)');
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
        Complete seus dados para continuar
      </Text>

      {/* ERRO */}
      {erro !== '' && <Text style={styles.errorText}>{erro}</Text>}

      {/* INPUT NOME */}
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#94A3B8"
        style={[
          styles.input,
          erro && !nome.trim() ? styles.inputError : null,
        ]}
        value={nome}
        onChangeText={(text) => {
          setNome(text);
          validarCampos(text, sobrenome);
        }}
      />

      {/* INPUT SOBRENOME */}
      <TextInput
        placeholder="Sobrenome"
        placeholderTextColor="#94A3B8"
        style={[
          styles.input,
          erro && !sobrenome.trim() ? styles.inputError : null,
        ]}
        value={sobrenome}
        onChangeText={(text) => {
          setSobrenome(text);
          validarCampos(nome, text);
        }}
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={[
          styles.button,
          !formValido && styles.buttonDisabled
        ]}
        onPress={handleContinuar}
        disabled={!formValido}
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
