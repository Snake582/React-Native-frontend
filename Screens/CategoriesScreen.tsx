import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

// ✅ Définition du type de routes disponibles
type RootStackParamList = {
  Boubous: undefined;
  Chaussures: undefined;
  Accessoires: undefined;
  Livres: undefined;
  Café: undefined;
};

// ✅ Type pour le typage de la navigation
type CategoriesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

// ✅ Type pour une catégorie
type Category = {
  id: string;
  name: string;
  description: string;
};

export default function CategoriesScreen() {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const [search, setSearch] = useState("");

  // 🔹 Liste de catégories
  const categories: Category[] = [
    { id: "1", name: "Boubous", description: "Tenues traditionnelles élégantes" },
    { id: "2", name: "Chaussures", description: "Sandales, chaussures en cuir..." },
    { id: "3", name: "Accessoires", description: "Makhtoum, écharpe, sacs, chapeaux..." },
    { id: "4", name: "Livres", description: "Khassidas, Coran, Livre islamique..." },
    { id: "5", name: "Café", description: "Café Touba" },
  ];

  // 🔹 Filtrage par recherche
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 Navigation vers chaque écran
  const handleCategoryPress = (name: string) => {
    switch (name) {
      case "Boubous":
        navigation.navigate("Boubous");
        break;
      case "Chaussures":
        navigation.navigate("Chaussures");
        break;
      case "Accessoires":
        navigation.navigate("Accessoires");
        break;
      case "Livres":
        navigation.navigate("Livres");
        break;
      case "Café":
        navigation.navigate("Café");
        break;
      default:
        alert("Page non trouvée");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛍️ Catégories</Text>

      {/* 🔎 Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher une catégorie..."
        value={search}
        onChangeText={setSearch}
      />

      {/* 🔹 Liste */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item.name)}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
            <Text style={styles.categoryDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#135de7",
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: "#f4f6fb",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryName: { fontSize: 18, fontWeight: "bold", color: "#135de7" },
  categoryDescription: { color: "#555", fontSize: 14 },
});
