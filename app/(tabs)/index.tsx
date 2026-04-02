import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import { useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';

const postos = [
  {
    id: '1',
    nome: 'Posto Petrobras',
    endereco: 'Av. Rondon Pacheco 2184, Uberlândia',
    gasolina: 'R$6,20',
    etanol: 'R$4,35',
    diesel: 'R$9,00',
    distancia: 2.4,
    imagem: 'https://logodownload.org/wp-content/uploads/2014/05/petrobras-logo-1.png'
  },
  {
    id: '2',
    nome: 'Posto sem imagem',
    endereco: 'Uberlândia',
    gasolina: 'R$5,20',
    etanol: 'R$3,35',
    diesel: 'R$4,00',
    distancia: 3.1,
    imagem: null,
  },
  {
    id: '3',
    nome: 'Posto genérico',
    endereco: 'Uberlândia',
    gasolina: 'R$6,20',
    etanol: 'R$4,35',
    diesel: 'R$7,00',
    distancia: 1.2,
    imagem: null,
  },
];

export default function Home() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('home');
  const [filtroAtivo, setFiltroAtivo] = useState('preco');
  const [favoritos, setFavoritos] = useState<string[]>([]);

  // ✅ CORREÇÃO: quando voltar do perfil, ativa HOME
  useFocusEffect(
    useCallback(() => {
      setActiveTab('home');
    }, [])
  );

  function toggleFavorito(id: string) {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function limparPreco(preco: string) {
    return parseFloat(preco.replace('R$', '').replace(',', '.'));
  }

  function abrirMapa(endereco: string) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}`;
    Linking.openURL(url);
  }

  function abrirMapaPostos() {
    const url = 'https://www.google.com/maps/search/postos+de+gasolina+em+Uberlandia';
    Linking.openURL(url);
  }

  const postosFiltrados = [...postos]
    .filter((posto) => {
      if (filtroAtivo === 'favoritos') {
        return favoritos.includes(posto.id);
      }
      return true;
    })
    .sort((a, b) => {
      if (filtroAtivo === 'preco') {
        return limparPreco(a.gasolina) - limparPreco(b.gasolina);
      }

      if (filtroAtivo === 'distancia') {
        return a.distancia - b.distancia;
      }

      return 0;
    });

  return (
    <View style={styles.container}>

      {/* HERO */}
      <View style={styles.heroContainer}>
        <Image
          source={require('../../assets/images/carro.png')}
          style={styles.heroImage}
        />

        <View style={styles.overlayTop}>
          <Text style={styles.greeting}>
            {user?.nome ?? 'Motorista'}
          </Text>

          <Text style={styles.subGreeting}>
            Onde vamos abastecer hoje?
          </Text>
        </View>

        <View style={styles.searchOverlay}>
          <View style={styles.searchWrapper}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={22} color="#22C55E" style={styles.icon} />
              <TextInput
                placeholder="Digite o bairro"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* ÁREA */}
      <View style={styles.bottomContainer}>

        {/* FILTROS */}
        <View style={styles.filtroContainer}>
          <Text onPress={() => setFiltroAtivo('preco')} style={[styles.filtroText, { color: filtroAtivo === 'preco' ? '#22C55E' : '#94A3B8' }]}>
            Preço
          </Text>

          <Text onPress={() => setFiltroAtivo('distancia')} style={[styles.filtroText, { color: filtroAtivo === 'distancia' ? '#22C55E' : '#94A3B8' }]}>
            Distância
          </Text>

          <Text onPress={() => setFiltroAtivo('favoritos')} style={[styles.filtroText, { color: filtroAtivo === 'favoritos' ? '#22C55E' : '#94A3B8' }]}>
            Favoritos
          </Text>
        </View>

        {/* LISTA */}
        <FlatList
          data={postosFiltrados}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 90 }}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <View style={styles.logoPlaceholder}>
                {item.imagem ? (
                  <Image source={{ uri: item.imagem }} style={styles.logoImage} />
                ) : (
                  <Ionicons name="car-sport-outline" size={28} color="#FFFFFF" />
                )}
              </View>

              <View style={{ flex: 1 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.nome}>{item.nome}</Text>

                  <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                    <Ionicons
                      name={favoritos.includes(item.id) ? 'star' : 'star-outline'}
                      size={20}
                      color={favoritos.includes(item.id) ? '#FACC15' : '#94A3B8'}
                    />
                  </TouchableOpacity>
                </View>

                <Text style={styles.endereco}>
                  {item.endereco ?? 'Endereço não informado'}
                </Text>

                <View style={{ marginTop: 6 }}>

                  <View style={styles.distanciaContainer}>
                    <Ionicons name="location-outline" size={14} color="#94A3B8" />
                    <Text style={[styles.distanciaText, { color: '#94A3B8' }]}>
                      {item.distancia ?? '--'} km
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[styles.distanciaContainer, { marginTop: 4 }]}
                    onPress={() => abrirMapa(item.endereco)}
                  >
                    <Ionicons name="navigate-outline" size={16} color="#22C55E" />
                    <Text style={[styles.distanciaText, { color: '#22C55E' }]}>
                      Ir até lá
                    </Text>
                  </TouchableOpacity>

                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.gasolinaPrice}>
                    Gasolina {item.gasolina ?? '--'}
                  </Text>

                  <Text style={styles.etanolPrice}>
                    Etanol {item.etanol ?? '--'}
                  </Text>

                  {item.diesel && (
                    <Text style={styles.dieselPrice}>
                      Diesel {item.diesel}
                    </Text>
                  )}
                </View>

              </View>

            </View>
          )}
        />
      </View>

      {/* RODAPÉ */}
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={22}
            color={activeTab === 'home' ? '#22C55E' : '#94A3B8'}
            onPress={() => setActiveTab('home')}
          />
          <Text style={[styles.footerText, { color: activeTab === 'home' ? '#22C55E' : '#94A3B8' }]}>
            Home
          </Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'localizacao' ? 'location' : 'location-outline'}
            size={22}
            color={activeTab === 'localizacao' ? '#22C55E' : '#94A3B8'}
            onPress={() => {
              setActiveTab('localizacao');
              abrirMapaPostos();
            }}
          />
          <Text style={[styles.footerText, { color: activeTab === 'localizacao' ? '#22C55E' : '#94A3B8' }]}>
            Mapa
          </Text>
        </View>

        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'perfil' ? 'person' : 'person-outline'}
            size={22}
            color={activeTab === 'perfil' ? '#22C55E' : '#94A3B8'}
            onPress={() => {
              setActiveTab('perfil');
              router.push('/perfil');
            }}
          />
          <Text style={[styles.footerText, { color: activeTab === 'perfil' ? '#22C55E' : '#94A3B8' }]}>
            Perfil
          </Text>
        </View>

        <View style={styles.footerItem}>
          <TouchableOpacity
            onPress={() => {
              router.replace('/login'); // ✅ CORRETO
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="#EF4444" />
          </TouchableOpacity>

          <Text style={[styles.footerText, { color: '#EF4444' }]}>
            Sair
          </Text>
        </View>
      </View>

    </View>
  );
}

// 🔥 SEU STYLE COMPLETO (NÃO ALTERADO)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  overlayTop: { position: 'absolute', top: 70, left: 15, right: 120 },
  greeting: { color: '#22C55E', fontSize: 25, fontWeight: '700' },

  subGreeting: {
    color: '#f8f9fa',
    fontSize: 25,
    marginTop: 12,
  },

  searchOverlay: { position: 'absolute', left: 15, right: 95, top: 220 },

  searchWrapper: {
    borderRadius: 30,
    shadowColor: '#22C55E',
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 25
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#22C55E',
  },

  icon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#FFFFFF' },

  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: -25,
  },

  filtroText: { fontSize: 14, fontWeight: '600' },

  bottomContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 10,
    paddingTop: 42,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 25,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 25,
    marginBottom: 15,
  },

  logoPlaceholder: {
    width: 75,
    height: 60,
    backgroundColor: '#0F172A',
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 19,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#22C55E',
  },

  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  nome: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
  endereco: { color: '#94A3B8', fontSize: 13 },

  distanciaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  distanciaText: {
    fontSize: 13,
    marginLeft: 6,
  },

  priceRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginLeft: -110,
  },

  gasolinaPrice: { color: '#FACC15' },
  etanolPrice: { color: '#22C55E' },
  dieselPrice: { color: '#e26b15' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111827',
    paddingVertical: 10,
  },

  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, marginTop: 4 },
});