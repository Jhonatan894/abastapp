import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '../context/UserContext';
import { useState } from 'react';

export default function CadastroIcloud() {
  const { setUser } = useUser();

  const [loading, setLoading] = useState(false);

  async function handleLoginIcloud() {
    try {
      setLoading(true);

      // 🔥 SIMULAÇÃO (depois entra Apple Auth aqui)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 👇 DADOS MOCK (simulando retorno da Apple)
      const userFake = {
        nome: 'Jess',
        sobrenome: 'Bernardes',
        email: 'icloud@exemplo.com',
      };

      if (!userFake.email) {
        Alert.alert('Erro', 'Não foi possível obter os dados.');
        return;
      }

      setUser(userFake);

      router.replace('/(tabs)');

    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação com iCloud.');
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        Entre com sua conta iCloud
      </Text>

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLoginIcloud}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#022C22" />
        ) : (
          <Text style={styles.buttonText}>Entrar com iCloud</Text>
        )}
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
    marginBottom: 30,
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
    marginBottom: 30,
  },

  button: {
    width: '100%',
    backgroundColor: '#22C55E',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#022C22',
    fontSize: 16,
    fontWeight: '600',
  },
});