import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
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

      {/* TEXTO */}
      <Text style={styles.heading}>Bora logar?</Text>

      {/* GOOGLE */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cadastro-google')}
      >
        <Text style={styles.buttonText}>
          Entrar com Google
        </Text>
      </TouchableOpacity>

      {/* ICLOUD */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cadastro-icloud')}
      >
        <Text style={styles.buttonText}>
          Entrar com iCloud
        </Text>
      </TouchableOpacity>

      {/* CELULAR */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cadastro-celular')}
      >
        <Text style={styles.buttonText}>
          Entrar com número de celular
        </Text>
      </TouchableOpacity>

      {/* EMAIL */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cadastro-email')}
      >
        <Text style={styles.buttonText}>
          Entrar com email
        </Text>
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

  heading: {
    marginTop: 5,
    fontSize: 25,
    color: '#22C55E',
    marginBottom: 20,
  },

  button: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
  },

  buttonText: {
    textAlign: 'center',
    color: '#E2E8F0',
    fontSize: 15,
  },
});
