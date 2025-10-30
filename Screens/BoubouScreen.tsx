import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductCard from "./Components/ProductCard";
import { useCart } from "./Components/CartContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  ProduitDetail: { produit: any };
};

const boubous = [
  {
    id: 1,
    title: "Bay Souhaibu noir",
    description: "Bay Souhaibu en tissu Getzner de couleur noir pret à porter",
    prix: 60000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958438/Baay-souhaibu_xqncr6.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 50,
    title: "Turki Diarem 3 pièces",
    description: "Turki Diarem (thiaya, djiteul et boubou) de haute qualité, getzner",
    prix: 60000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958458/turki-diarem_hjktwz.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
 },
  {
    id: 51,
    title: "Turki Diarem 3 pièces",
    description: "Turki Diarem (thiaya, djiteul et boubou) de haute qualité, super cent",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958457/turki-diarem-4_afphfj.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 52,
    title: "Turki Diarem 3 pièces",
    description: "Turki Diarem (thiaya, djiteul et boubou) de haute qualité, super cent",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958457/turki-diarem-3_p34b9v.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
    {
    id: 53,
    title: "Baye Lahad",
    description: "Baye Lahad en tissu super cent composer de thiaya, djiteul, kaala et boubou",
    prix: 40000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958440/Baye_lahad-4_vuq7bd.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
 },
  {
    id: 54,
    title: "Turki Diarem 3 pièces",
    description: "Turki Diarem (thiaya, djiteul et boubou) de haute qualité, super cent",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958457/turki-diarem-2_pfcvia.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 55,
    title: "Lots de 6 Baye Lahad",
    description: "Baye Lahad en tissu super cent de haute qualité pret à porter",
    prix: 100000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/Baye_lahad_vippw4.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
    {
    id: 56,
    title: "Bay Souhaibu + Kaala",
    description: "Bay Souhaibu en tissu Getzner avec kaala assortie pret à porter",
    prix: 40000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958439/Bay_suhaibu_kala_cw3pxg.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
 },
  {
    id: 57,
    title: "Turki Diarem 3 pièces",
    description: "Turki Diarem (thiaya, djiteul et boubou) de haute qualité, super cent",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958457/turki-diarem-5_heajxn.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 58,
    title: "Bay Souhaibu Getzner",
    description: "Bay Souhaibu en tissu Getzner de haute qualité pret à porter",
    prix: 60000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958439/Bay_SouhaibuGetzner2_knnw27.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
    {
    id: 59,
    title: "Bay Souhaibu Getzner",
    description: "Bay Souhaibu en tissu Getzner de haute qualité pret à porter",
    prix: 60000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958439/Bay_SouhaibuGetzner_azyavc.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
 },
  {
    id: 60,
    title: "Baye Lahad 3 pièces + Kaala",
    description: "Baye Lahad en tissu super cent composer de thiaya, djiteul, kaala et boubou",
    prix: 45000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958435/3pcs_baye_lahad_oxnz7d.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 61,
    title: "Bay Souhaibu 3 pièces",
    description: "Bay Souhaibu bleu baxa en tissu super cent de haute qualité pret à porter",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958437/Baay-souhaibu-3PCS_mdygbw.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 62,
    title: "Bay Souhaibu brocard",
    description: "Bay Souhaibu en tissu brocard de haute qualité pret à porter",
    prix: 18000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958437/Baay-souhaibu-brocard_rfmkvx.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 63,
    title: "Bay Souhaibu 3 pièces gris",
    description: "Bay Souhaibu en tissu super cent de couleur gris pret à porter",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958437/Baay-souhaibu-3PCSGRIS_l3boon.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 64,
    title: "Bay Souhaibu bleu",
    description: "Bay Souhaibu en tissu Getzner de couleur bleu pret à porter",
    prix: 35000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958437/Baay-souhaibu-bleu_hdhboi.jpg",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
];

export default function BoubouScreen() {
const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    // ✅ Récupérer les produits depuis le backend
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.1.6:3000/product?category=boubou");
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
      <Text style={styles.title}>👑 Boubous</Text>

      <FlatList
        data={boubous}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <ProductCard product={item} onView={() => handleViewDetails(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 12 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#135de7",
    marginBottom: 15,
    textAlign: "center",
  },
});