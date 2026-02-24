import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useUser } from '../context/UserContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function CadastroGoogle() {
  const { setUser } = useUser();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '406772873074-tkqh4pao97b4ri8mfmprfph2i2ckd4b5.apps.googleusercontent.com', // web
    androidClientId: '406772873074-76gj816r07gh058vqr10h62cofn8ce9c.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const token = response.authentication?.accessToken;

      if (token) {
        pegarDadosUsuario(token);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o token.');
      }
    }

    if (response?.type === 'error') {
      Alert.alert('Erro', 'Falha na autenticação.');
    }
  }, [response]);

  async function pegarDadosUsuario(token: string) {
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userInfo = await userInfoResponse.json();

      if (!userInfo.email) {
        Alert.alert('Erro', 'Não foi possível obter os dados.');
        return;
      }

      setUser({
        nome: userInfo.given_name || '',
        sobrenome: userInfo.family_name || '',
        email: userInfo.email,
      });

      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar usuário.');
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
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
        Entre com sua conta Google
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Entrar com Google</Text>
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
  },
  buttonText: {
    textAlign: 'center',
    color: '#022C22',
    fontSize: 16,
    fontWeight: '600',
  },
});
