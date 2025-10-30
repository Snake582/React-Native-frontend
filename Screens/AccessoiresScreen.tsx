import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductCard from "./Components/ProductCard";
import { useCart } from "./Components/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ProduitDetail: { produit: any };
};

const Accessoires = [
  {
    id: 3,
   title: "Chapelet en olive",
   description: "Krouss(chapelet) faite avec du bois d'olivier",
   prix: 20000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958448/Krouss3_nhllnw.jpg",
    tailles: [],
    enStock: false,
  },
  {
    id: 7,
   title: "Maxtum cuir",
   description: "Le Makhtoum, un accessoire qui confirme l'identité mouride",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958451/Maxtum_nhws5r.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  { 
    id: 14,
    title: "Chapelet perles bois d'ébène",
    description: "Chapelet (Krouss) fabriqué avec des perles en bois d'ébène de haute qualité.",
    prix: 12000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958447/Krouss_ywba8j.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 15,
    title: "Chapelet turc",
    description: "Chapelet (Krouss) de style turc avec des perles en pierre naturelle.",
    prix: 12000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958447/Krouss2_tredbe.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 16,
    title: "Tapis de prière",
    description: "Tapis de prière en tissu doux et confortable, idéal pour les moments de dévotion.",
    prix: 5000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958454/Tapis-bleu_g1skaw.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 17,
    title: "Tapis de prière",
    description: "Tapis de prière avec motifs traditionnels, offrant confort et spiritualité.",
    prix: 3000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958455/Tapis_de_priere_f9xaql.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 18,
    title: "Tapis de prière",
    description: "Tapis de prière avec motifs traditionnels, offrant confort et spiritualité.",
    prix: 3000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958456/Tapis3_nvetku.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 19,
    title: "Tapis de prière",
    description: "Tapis de prière avec motifs traditionnels, offrant confort et spiritualité.",
    prix: 3000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958455/Tapis2_lz970e.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 20,
    title: "Kaala + Bakhana",
    description: "Ensemble Kaala getzner 4m et Bakhana traditionnel.",
    prix: 12000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958446/kaala_bakhana_cv3hm9.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 21,
    title: "Kaala + Bakhana",
    description: "Ensemble Kaala maylus 4m et Bakhana traditionnel.",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958446/kaala_bakhana2_fzf5e7.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 22,
    title: "Bakhana",
    description: "Bakhana Baay Bara traditionnel.",
    prix: 6000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1761073416/mouridhouse/prcjjfy6aocgkolge29z.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 23,
    title: "Smart ring",
    description: "Bague intelligente avec fonctionnalités avancées.",
    prix: 15000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958453/Smart_ring_zx2p0i.jpg",
    tailles: [],
    enStock: true,
  },
];

export default function AccessoiresScreen() {
   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Récupérer les produits depuis le backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.1.6:3000/product?category=accessoires");
      if (!response.ok) throw new Error("Erreur lors du chargement des produits");
      const data = await response.json();
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Erreur", err.message || "Impossible de charger les produits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewDetails = (product: any) => {
    navigation.navigate("ProduitDetail", { produit: product });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Accessoires</Text>

      <FlatList
        data={Accessoires}
        keyExtractor={(item, ) => item.id.toString()}
        numColumns={2} // ✅ Deux colonnes
        columnWrapperStyle={{ justifyContent: "space-between" }} // ✅ espace égal entre les cards
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
            <ProductCard product={item} onView={() => handleViewDetails(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#135de7",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f5f6fb",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { fontSize: 16, color: "#333" },
});
