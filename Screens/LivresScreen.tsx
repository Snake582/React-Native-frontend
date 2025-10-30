import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import ProductCard from "./Components/ProductCard";
import { useCart } from "./Components/CartContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  ProduitDetail: { produit: any };
};

const Livre = [
  {
    id: 4,
    title: "Buso Bali",
    description: "Buso Bali est un livre qui décrit la vie d'une brave dame qu'est Maam Diarra Bousso mère du Cheikh.",
    prix: 7000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/Buso_bali_pij7hy.jpg",
    enStock: true,
  },
  {
    id: 5,
    title: "Mawahibu Naafi",
    description: "Xassida Mawahibu Naffi",
    prix: 1000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958450/Mawahibu_naffi_sch0qw.jpg",
    enStock: true,
  },
  {
    id: 6,
    title: "Le Noble Coran",
    description: "Coran complet traduit en français",
    prix: 13000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958452/Qu_ran_uwa7am.jpg",
    enStock: false,
  },
  {
    id: 29,
    title: "La Bataille de Badr",
    description: "Livre sur la célèbre bataille islamique de Badr",
    prix: 10000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958438/Badr_uh5nla.jpg",
    enStock: true,
  },
  {
    id: 30,
    title: "Xassida Assiru",
    description: "Xassida Assiru du Cheikh Ahmadou Bamba",
    prix: 200,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958436/Assiru_zouehd.jpg",
    enStock: true,
  },
  {
    id: 31,
    title: "As Salih",
    description: "As Salih est une biographie sur Serigne Saliou Mbacké dernier fils de Cheikh Ahmadou Bamba à avoir dirigé le mouridisme.",
    prix: 5000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958435/As-Salih_obg2ds.jpg",
    enStock: true,
  },
  {
    id: 32,
    title: "Les Secrets de l'Amour Divin",
    description: "Voyage spirituel vers l'amour divin",
    prix: 8500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958435/Amour_divin_k7sfrq.jpg",
    enStock: false,
  },
  {
    id: 33,
    title: "Cheikh Mountakha Mbacké",
    description: "Le leadership d'un soufi accompli",
    prix: 7000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958435/Al_mountakha_urvsm8.jpg",
    enStock: true,
  },
  {
    id: 34,
    title: "Qoran Warsh",
    description: "Qoran Warsh réparti sur 7 volumes",
    prix: 12000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958444/Coran_warsh_v3jftl.jpg",
    enStock: true,
  },
   {
    id: 35,
    title: "Matlabul Fawzeyni",
    description: "Xassida Matlabul Fawzeyni",
    prix: 1500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958445/Fawzeyni_wy2xzl.jpg",
    enStock: true,
  },
   {
    id: 36,
    title: "L'histoire des 4 Califes",
    description: "Les vies des quatre premiers califes de l'Islam",
    prix: 7000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958443/Calife_xyzyiq.jpg",
    enStock: true,
  },
   {
    id: 37,
    title: "Ila Khayrina",
    description: "Xassida Ila Khayrina plastifiée",
    prix: 1500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958445/Ila_khayrina_rofxht.jpg",
    enStock: true,
  },
   {
    id: 38,
    title: "Jalibatul Maraxib",
    description: "Xassida Jalibatul Maraxib",
    prix: 2000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958445/Jaalibatu_lnulum.jpg",
    enStock: true,
  },
   {
    id: 39,
    title: "Jalibatul Maraxib (2)",
    description: "Xassida Jalibatul Maraxib version 2",
    prix: 2000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958446/Jaalibatul_Marakhib_zenkhu.jpg",
    enStock: true,
  },
   {
    id: 40,
    title: "L'Infatiguable",
    description: "Le livre L'Infatiguable retrace la vie de Mame Thierno Birahim Mbacké frére de Cheikh Ahmadou Bamba.",
    prix: 4000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958448/L_infatiguable_wbboz1.jpg",
    enStock: true,
  },
   {
    id: 41,
    title: "Mafatihul Bishri",
    description: "Xassida Mafatihul Bishri",
    prix: 2000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958449/Mafatihul_b_fo1wd2.jpg",
    enStock: true,
  },
   {
    id: 42,
    title: "Comprendre le Magal",
    description: "le Magal de Touba expliqué",
    prix: 6000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958449/Magal_lv65tq.jpg",
    enStock: false,
  },
   {
    id: 43,
    title: "Mafatihul Bishri(2)",
    description: "Xassida Mafatihul Bishri version 2",
    prix: 2000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958449/Mafatihul_Bishri_cdlwtj.jpg",
    enStock: true,
  },
   {
    id: 44,
    title: "Touhfatu",
    description: "Xassida Touhfatu Moutadarin",
    prix: 1000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958456/Touhfatu_lo0mwu.jpg",
    enStock: true,
  },
   {
    id: 45,
    title: "Sinddi",
    description: "Xassida Sinddi",
    prix: 1000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958454/Sindidi_g17xhg.jpg",
    enStock: true,
  },
   {
    id: 46,
    title: "Raditu",
    description: "Xassida Raditu plastifiée",
    prix: 1500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958453/Raditu_bm2bs8.jpg",
    enStock: true,
  },
   {
    id: 47,
    title: "Nuuru Darayni",
    description: "Xassida Nuuru Darayni",
    prix: 5000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958451/Nurru_dareyni_ezajyy.jpg",
    enStock: true,
  },
  {
    id: 48,
    title: "Mawahibu Naafi (2)",
    description: "Xassida Mawahibu Naffi version 2",
    prix: 1000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958451/Mawahibu_sw9ikj.jpg",
    enStock: true,
  },
  {
    id: 49,
    title: "Nuuru Darayni (2)",
    description: "Xassida Nuuru Darayni version 2",
    prix: 4500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958452/Nuru-Dareyni_xjvsqf.jpg",
    enStock: true,
  },
];

export default function LivresScreen() {
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
  
    // ✅ Récupérer les produits depuis le backend
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://192.168.1.6:3000/product?category=livres");
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
      <Text style={styles.title}> Livres</Text>

      <FlatList
        data={Livre}
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
