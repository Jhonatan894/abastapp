import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
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

        {/* SLOGAN */}
        <Text style={styles.subtitle}>
          O combustível certo, no lugar certo
        </Text>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // mantém o fundo
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginRight: -10,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  titleA: {
    color: '#22C55E',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: '#CBD5E1',
    letterSpacing: 1,
    textAlign: 'center',
    marginRight: -10,
  },
});
