import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductCard from "./Components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./Components/CartContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ProduitDetail: { produit: any };
};

const Cafe = [
  {
    id: 8,
    title: "Café Touba Nature",
    description: "Café Touba nature moulue 500g",
    prix: 4000,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958434/500g_nature2_xs5hmm.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 9,
    title: "Café Touba aromatisé",
    description: "Café Touba aromatisé au clou de girofle 500g",
    prix: 4000,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958434/500g_nature_vtvmxg.jpg",
    tailles: [],
    enStock: false,
  },
  {
    id: 10,
    title: "Café Touba Gold",
    description: "Café Touba Gold premium 500g",
    prix: 4500,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958434/500g_gold_gravep.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 11,
    title: "Café Touba capsulé nature",
    description: "Café Touba capsulé nature 10 capsules",
    prix: 4000,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958443/cafenature_mzadue.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 12,
    title: "Café Touba capsulé aromatisé",
    description: "Café Touba capsulé aromatisé 10 capsules",
    prix: 4000,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958443/cafenaturearomatiser_d07qld.jpg",
    tailles: [],
    enStock: true,
  },
  {
    id: 13,
    title: "Café Touba gold capsulé",
    description: "Café Touba capsulé gold 10 capsules",
    prix: 5000,
    image:
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/cafegold_tkhese.jpg",
    tailles: [],
    enStock: true,
  },
];

export default function CafeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    // ✅ Récupérer les produits depuis le backend
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.1.6:3000/product?category=cafe");
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
      <Text style={styles.title}>☕ Café Touba</Text>

      <FlatList
        data={Cafe}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          // 🟦 ProductCard affiche titre + prix + bouton "Voir"
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
});
