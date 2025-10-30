import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductCard from "./Components/ProductCard";
import { useCart } from "./Components/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ProduitDetail: { produit: any };
};

const Chaussures = [
  {
    id: 2,
    title: "Chaussure Marakkis",
    description: "Marakkis marocain pure cuir de top qualité fabriquer par des experts",
    prix: 10000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958445/homme-350-noir_orxlzy.avif",
    tailles:["40", "41", "42", "43"],
    enStock: true,
  },
  {
    id: 24,
    title: "Chaussure Marakkis",
    description: "Marakkis marocain semi cuir fabriquer par des experts",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958448/maarakis_m71sov.jpg",
    tailles:["40", "41", "42", "43", "44"],
    enStock: true,
  },
  {
    id: 25,
    title: "Chaussure Jabador",
    description: "Jabador marocain en cuir véritable",
    prix: 10000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958446/jabador_shl25l.webp",
    tailles:["40", "41", "42", "43", "44"],
    enStock: false,
  },
  {
    id: 26,
    title: "Chassette en Cuir",
    description: "Chaussette en cuir véritable couleur gris",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958443/chaussette_cuir_gqepqr.jpg",
    tailles:["40", "41", "42", "43", "44"],
    enStock: true,
  },
  {
    id: 27,
    title: "Chaussette en cuir",
    description: "Chaussette en cuir de haute qualité couleur marron foncé",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958444/chaussette_cuir2_twn5hq.jpg",
    tailles:["40", "41", "42", "43", "44"],
    enStock: true,
  },
  {
    id: 28,
    title: "Chaussette en cuir",
    description: "Chaussette en cuir de haute qualité couleur marron tabac",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958444/chaussette_cuir3_toppqr.jpg",
    tailles:["40", "41", "42", "43", "44"],
    enStock: true,
  },
];

export default function ChaussuresScreen() {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    // ✅ Récupérer les produits depuis le backend
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.1.6:3000/product?category=chaussures");
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
    // 👉 Ouvre la page de détails du produit
    const handleViewDetails = (product: any) => {
      navigation.navigate("ProduitDetail", { produit: product });
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Chaussure</Text>

      <FlatList
        data={Chaussures}
        keyExtractor={(item, index) => index.toString()}
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
