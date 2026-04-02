import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // 🔥 VALIDA EMAIL
  function validarEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // 🔥 FORMATA TELEFONE ( (99) 99999-9999 )
  function formatarTelefone(text: string) {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11);

    if (cleaned.length <= 10) {
      return cleaned.replace(
        /(\d{0,2})(\d{0,4})(\d{0,4})/,
        (_, a, b, c) => {
          if (!b) return a;
          if (!c) return `(${a}) ${b}`;
          return `(${a}) ${b}-${c}`;
        }
      );
    }

    return cleaned.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  }

  function salvar() {
    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Digite um email válido');
      return;
    }

    if (telefone.length < 14) {
      Alert.alert('Erro', 'Digite um telefone válido');
      return;
    }

    console.log('Salvo:', { nome, sobrenome, email, telefone });

    router.back();
  }

  function cancelar() {
    setNome('');
    setSobrenome('');
    setEmail('');
    setTelefone('');

    router.back();
  }

  return (
    <View style={styles.container}>

      {/* LOGO + NOME */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.logoTextContainer}>
          <Text style={[styles.logoText, styles.titleA]}>A</Text>
          <Text style={styles.logoText}>bastapp</Text>
        </View>
      </View>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Atualize suas informações</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} color="#22C55E" />
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={18} color="#22C55E" />
          <TextInput
            placeholder="Sobrenome"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={sobrenome}
            onChangeText={setSobrenome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={18} color="#22C55E" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none" // 🔥 evita erro tipo Gmail virar GMAIL
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={18} color="#22C55E" />
          <TextInput
            placeholder="Telefone"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={telefone}
            onChangeText={(text) => setTelefone(formatarTelefone(text))}
            keyboardType="phone-pad"
            maxLength={15} // 🔥 limite com máscara
          />
        </View>

      </View>

      {/* BOTÕES */}
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.saveButton} onPress={salvar}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={cancelar}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
    marginBottom: 20,
  },

  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginRight: -10,
  },

  logoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoText: {
    fontSize: 50,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  titleA: {
    color: '#22C55E',
  },

  header: {
    marginBottom: 20,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },

  subtitle: {
    color: '#94A3B8',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#22C55E',
  },

  input: {
    flex: 1,
    color: '#FFFFFF',
    padding: 10,
    marginLeft: 8,
  },

  buttonContainer: {
    marginTop: 25,
    gap: 10,
  },

  saveButton: {
    backgroundColor: '#22C55E',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  saveText: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 16,
  },

  cancelButton: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },

  cancelText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
});