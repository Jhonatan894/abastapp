import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../../context/UserContext';
import { useState } from 'react';

const postos = [
  {
    id: '1',
    nome: 'Posto Petrobras',
    endereco: 'Av. Rondon Pacheco 2184, Uberlândia',
    gasolina: 'R$6,20',
    etanol: 'R$4,35',
  },
  {
    id: '2',
    nome: 'Posto Petrobras',
    endereco: 'Av. Rondon Pacheco 2184, Uberlândia',
    gasolina: 'R$6,20',
    etanol: 'R$4,35',
  },
  {
    id: '3',
    nome: 'Posto Petrobras',
    endereco: 'Av. Rondon Pacheco 2184, Uberlândia',
    gasolina: 'R$6,20',
    etanol: 'R$4,35',
  },
];

export default function Home() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('home');

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
              <Ionicons
                name="search"
                size={22}
                color="#22C55E"
                style={styles.icon}
              />
              <TextInput
                placeholder="Digite o bairro"
                placeholderTextColor="#94A3B8"
                style={styles.searchInput}
              />
            </View>
          </View>
        </View>
      </View>

      {/* LISTA */}
      <View style={styles.bottomContainer}>
        <FlatList
          data={postos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 90 }}
          renderItem={({ item }) => (
            <View style={styles.card}>

              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>BR</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.endereco}>{item.endereco}</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.gasolinaPrice}>
                    Gasolina {item.gasolina}
                  </Text>

                  <Text style={styles.etanolPrice}>
                    Etanol {item.etanol}
                  </Text>
                </View>
              </View>

            </View>
          )}
        />
      </View>

      {/* RODAPÉ DINÂMICO */}
      <View style={styles.footer}>

        {/* HOME */}
        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={22}
            color={activeTab === 'home' ? '#22C55E' : '#94A3B8'}
            onPress={() => setActiveTab('home')}
          />
          <Text
            style={[
              styles.footerText,
              { color: activeTab === 'home' ? '#22C55E' : '#94A3B8' }
            ]}
          >
            Home
          </Text>
        </View>

        {/* POSTOS */}
        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'favoritos' ? 'star' : 'star-outline'}
            size={22}
            color={activeTab === 'favoritos' ? '#22C55E' : '#94A3B8'}
            onPress={() => setActiveTab('favoritos')}
          />
          <Text
            style={[
              styles.footerText,
              { color: activeTab === 'favoritos' ? '#22C55E' : '#94A3B8' }
            ]}
          >
            Postos
          </Text>
        </View>

        {/* LOCALIZAÇÃO */}
        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'localizacao' ? 'location' : 'location-outline'}
            size={22}
            color={activeTab === 'localizacao' ? '#22C55E' : '#94A3B8'}
            onPress={() => setActiveTab('localizacao')}
          />
          <Text
            style={[
              styles.footerText,
              { color: activeTab === 'localizacao' ? '#22C55E' : '#94A3B8' }
            ]}
          >
            Mapa
          </Text>
        </View>

        {/* PERFIL */}
        <View style={styles.footerItem}>
          <Ionicons
            name={activeTab === 'perfil' ? 'person' : 'person-outline'}
            size={22}
            color={activeTab === 'perfil' ? '#22C55E' : '#94A3B8'}
            onPress={() => setActiveTab('perfil')}
          />
          <Text
            style={[
              styles.footerText,
              { color: activeTab === 'perfil' ? '#22C55E' : '#94A3B8' }
            ]}
          >
            Perfil
          </Text>
        </View>

        {/* SAIR */}
        <View style={styles.footerItem}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#EF4444"
            onPress={() => setActiveTab('logout')}
          />
          <Text style={[styles.footerText, { color: '#EF4444' }]}>
            Sair
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  heroContainer: {
    height: 320,
    position: 'relative',
  },

  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlayTop: {
    position: 'absolute',
    top: 70,
    left: 15,
    right: 140,
  },

  greeting: {
    color: '#22C55E',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },

  subGreeting: {
    color: '#f8f9fa',
    fontSize: 25,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  searchOverlay: {
    position: 'absolute',
    left: 15,
    right: 95,
    top: 220,
  },

  searchWrapper: {
    borderRadius: 30,
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 25,
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

  icon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },

  bottomContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 16,
    paddingTop: 40,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  logoPlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#22C55E',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },

  nome: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },

  endereco: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 8,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  gasolinaPrice: {
    color: '#FACC15',
    fontWeight: '700',
  },

  etanolPrice: {
    color: '#22C55E',
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111827',
    paddingVertical: 10,
    borderTopWidth: 0,
    borderTopColor: '#1F2937',
  },

  footerItem: {
    alignItems: 'center',
  },

  footerText: {
    fontSize: 12,
    marginTop: 4,
  },

});
