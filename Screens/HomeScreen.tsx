import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import MinCard from "./Components/MinCard";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./Components/CartContext";

const { width } = Dimensions.get("window");

const produitsPhares = [
  {
    id: 1,
    title: "Bay Souhaibu noir",
    prix: 60000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958438/Baay-souhaibu_xqncr6.jpg",
    description: "Bay souhaibu, tissus Getzner en couleur noir prêt à porter",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 2,
    title: "Chaussure Marakkis",
    prix: 10000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958445/homme-350-noir_orxlzy.avif",
    description:
      "Marakkis marocain pure cuir de top qualité fabriquer par des experts",
    tailles: ["40", "41", "42", "43"],
    enStock: true,
  },
  {
    id: 3,
    title: "Chapelet en olive",
    prix: 20000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958448/Krouss3_nhllnw.jpg",
    description: "Krouss(chapelet) faite avec du bois d'olivier",
    tailles: [],
    enStock: false,
  },
  {
    id: 4,
    title: "Buso Bali",
    prix: 7000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/Buso_bali_pij7hy.jpg",
    description:
      "Buso Bali est un livre qui décrit la vie d'une brave dame qu'est Maam Diarra Bousso mère du Cheikh.",
    tailles: [],
    enStock: true,
  },
  {
    id: 5,
    title: "Mawahibu Naafi",
    prix: 1000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958450/Mawahibu_naffi_sch0qw.jpg",
    description: "Xassida Mawahibu Naffi",
    tailles: [],
    enStock: true,
  },
  {
    id: 6,
    title: "Le Noble Coran",
    prix: 13000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958452/Qu_ran_uwa7am.jpg",
    description: "Coran complet traduit en français",
    tailles: [],
    enStock: false,
  },
  {
    id: 7,
    title: "Maxtum cuir",
    prix: 8000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958451/Maxtum_nhws5r.jpg",
    description:
      "Le Makhtoum, un accessoire qui confirme l'identité mouride",
    tailles: ["S", "M", "L", "XL", "XXL"],
    enStock: true,
  },
  {
    id: 8,
    title: "Café Touba Nature",
    prix: 4000,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958434/500g_nature2_xs5hmm.jpg",
    description: "Café Touba nature moulue 500g",
    tailles: [],
    enStock: true,
  },
];

// ✅ Section Xeweul
const xeweulProduits = [
  {
    id: 65,
    title: "Box Xeweul 1",
    prix: 34500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958440/Box-1_ox92cm.jpg",
    description: "Tapis de prière, sagesses sublimes, Ne sois pas triste, Smart ring et Parfum Oud",
    enStock: true,
  },
  {
    id: 66,
    title: "Box Xeweul 2",
    prix: 34500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958441/Box-2_qc4zyo.jpg",
    description: "Tapis de prière, La vie du prophète, Maxmuhatoun(8 Xassidas), Chapelet et Parfum Oud",
    enStock: true,
  },
  {
    id: 67,
    title: "Box Xeweul 3",
    prix: 34500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/Box-3_uvcfif.jpg",
    description: "Tapis de prière, La vie du prophète, Coran, parfum Mushk Amber",
    enStock: true,
  },
  {
    id: 68,
    title: "Box Xeweul 4",
    prix: 34500,
    image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1760958442/Box-4_bsi3am.jpg",
    description: "Tapis de prière, Masalikul Jinan, Wakana Haqqan, Matlabul Fawzeyni",
    enStock: true,
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const categories = [
    { name: "Boubous", icon: "👕" },
    { name: "Chaussures", icon: "👞" },
    { name: "Café", icon: "☕" },
    { name: "Accessoires", icon: "💍" },
    { name: "Livres", icon: "📚" },
  ];

  // ✅ Slider automatique pour Xeweul
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % xeweulProduits.length;
      setIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [index]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleProductPress = (produit: any) => {
    navigation.navigate("ProduitDetail", { produit });
  };

  return (
    <FlatList
      data={produitsPhares}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 15 }}
      contentContainerStyle={{ padding: 15 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {/* ✅ Header + Barre de recherche */}
          <View style={styles.headerSection}>
            <Text style={styles.logo}>🏠 MouridHouse</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une catégorie..."
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {/* ✅ Résultats recherche */}
          {search.length > 0 && (
            <View style={styles.resultsContainer}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, i) => (
                  <Text key={i} style={styles.resultItem}>
                    {cat.icon} {cat.name}
                  </Text>
                ))
              ) : (
                <Text style={styles.noResult}>Aucune catégorie trouvée</Text>
              )}
            </View>
          )}

          {/* ✅ Catégories */}
          <View style={styles.sectiona}>
            <Text style={styles.sectionTitle}>🛍️ Nos Catégories</Text>
          </View>
          <View style={styles.categoriesRow}>
            {categories.map((cat, index) => (
              <MinCard
                key={index}
                title={`${cat.icon} ${cat.name}`}
                onPress={() => navigation.navigate(cat.name)}
              />
            ))}
          </View>

          {/* ✅ Produits phares */}
          <Text style={[styles.sectionTitle, { marginBottom: 10 }]}>
            ⭐ Produits phares
          </Text>
        </>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleProductPress(item)}
          style={styles.promoCard}
        >
          <View
            style={[
              styles.stockBadge,
              { backgroundColor: item.enStock ? "#27ae60" : "#e74c3c" },
            ]}
          >
            <Text style={styles.stockText}>
              {item.enStock ? "En stock" : "Rupture"}
            </Text>
          </View>

          <View style={styles.promoImageWrapper}>
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          </View>
          <Text style={styles.promoTitle}>{item.title}</Text>
          <Text style={styles.promoPrice}>{item.prix} FCFA</Text>

          <TouchableOpacity
            style={[
              styles.promoButton,
              { backgroundColor: item.enStock ? "#135de7" : "#ccc" },
            ]}
            disabled={!item.enStock}
            onPress={() => handleProductPress(item)}
          >
            <Text style={styles.promoButtonText}>
              {item.enStock ? "Voir" : "Indisponible"}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        <>
          {/* ✅ Section Xeweul */}
          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
            🎁 Xeweul (Bonus)
          </Text>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            style={styles.sliderContainer}
          >
            {xeweulProduits.map((item) => (
              <View key={item.id} style={[styles.slide, { width }]}>
                <View
                  style={[
                    styles.stockBadge,
                    {
                      backgroundColor: item.enStock ? "#27ae60" : "#e74c3c",
                      top: 15,
                      left: 20,
                    },
                  ]}
                >
                  <Text style={styles.stockText}>
                    {item.enStock ? "En stock" : "Rupture"}
                  </Text>
                </View>

                <Image source={{ uri: item.image }} style={styles.xeweulImage} />
                <Text style={styles.xeweulTitle}>{item.title}</Text>
                <Text style={styles.xeweulPrice}>{item.prix} FCFA</Text>
                <TouchableOpacity
                  style={[
                    styles.xeweulButton,
                    { backgroundColor: item.enStock ? "#135de7" : "#ccc" },
                  ]}
                  disabled={!item.enStock}
                  onPress={() => handleProductPress(item)}
                >
                  <Text style={styles.xeweulButtonText}>
                    {item.enStock ? "Voir" : "Indisponible"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  logo: { fontSize: 18, fontWeight: "bold", color: "#135de7", marginRight: 10 },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    elevation: 1,
  },
  resultItem: { paddingVertical: 5, fontSize: 16, color: "#333" },
  noResult: { fontSize: 16, color: "#999", textAlign: "center" },
  sectiona: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    backgroundColor: "#0be9a6",
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#135de7",
  },
  categoriesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  promoCard: {
    backgroundColor: "#fff",
    width: 160,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    position: "relative",
  },
  promoImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  promoTitle: {
    fontWeight: "bold",
    color: "#135de7",
    textAlign: "center",
    marginBottom: 5,
  },
  promoPrice: { fontWeight: "bold", color: "#2a8a2a", marginBottom: 10 },
  promoButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  promoButtonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 8,
    zIndex: 2,
  },
  stockText: { color: "#fff", fontWeight: "bold", fontSize: 12 },

  // ✅ Xeweul styles
  sliderContainer: {
    marginTop: 10,
    borderRadius: 12,
  },
  slide: {
    alignItems: "center",
    paddingVertical: 20,
  },
  xeweulImage: {
    width: width * 0.7,
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
  },
  xeweulTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#135de7",
  },
  xeweulPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a8a2a",
    marginVertical: 5,
  },
  xeweulButton: {
    backgroundColor: "#135de7",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  xeweulButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
