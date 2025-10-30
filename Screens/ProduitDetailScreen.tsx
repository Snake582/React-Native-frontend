import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useCart } from "./Components/CartContext";

export default function ProduitDetailScreen({ route }) {
  const { produit } = route.params;
  const { addToCart } = useCart();

  const [selectedTaille, setSelectedTaille] = useState(
    produit.tailles && produit.tailles.length > 0 ? produit.tailles[0] : null
  );

  const handleAddToCart = () => {
    addToCart({ ...produit, taille: selectedTaille });
    alert(`${produit.title} (${selectedTaille || "Unique"}) ajouté au panier ✅`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: produit.image }} style={styles.image} />

      <Text style={styles.title}>{produit.title}</Text>
      <Text style={styles.price}>{produit.prix} FCFA</Text>
      <Text style={styles.desc}>{produit.description}</Text>

      {produit.tailles && produit.tailles.length > 0 && (
        <View style={styles.tailleContainer}>
          <Text style={styles.tailleLabel}>Choisir la taille:</Text>
          <View style={styles.tailleRow}>
            {produit.tailles.map((t) => (
              <TouchableOpacity
                key={t}
                style={[
                  styles.tailleBtn,
                  selectedTaille === t && styles.tailleSelected,
                ]}
                onPress={() => setSelectedTaille(t)}
              >
                <Text
                  style={[
                    styles.tailleText,
                    selectedTaille === t && { color: "#fff" },
                  ]}
                >
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.addButton,
          !produit.enStock && { backgroundColor: "#ccc" },
        ]}
        onPress={handleAddToCart}
        disabled={!produit.enStock}
      >
        <Text style={styles.addButtonText}>
          {produit.enStock ? "Ajouter au panier" : "Indisponible"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#135de7",
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  tailleContainer: {
    marginBottom: 20,
  },
  tailleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  tailleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tailleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#135de7",
    marginRight: 10,
    marginBottom: 10,
  },
  tailleSelected: {
    backgroundColor: "#135de7",
  },
  tailleText: {
    color: "#135de7",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#135de7",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});