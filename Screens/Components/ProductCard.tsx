import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ProductCard({ product, onView }: any) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {/* ✅ Badge de stock */}
        <View
          style={[
            styles.badge,
            { backgroundColor: product.enStock ? "#4CAF50" : "#E53935" },
          ]}
        >
          <Text style={styles.badgeText}>
            {product.enStock ? "En stock" : "Rupture"}
          </Text>
        </View>
      </View>

      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>
      <Text style={styles.price}>{product.prix} FCFA</Text>

      <TouchableOpacity
        style={[styles.btn, !product.enStock && styles.disabledBtn]}
        onPress={onView}
        disabled={!product.enStock}
      >
        <Text style={styles.btnText}>
          {product.enStock ? "Voir" : "Indisponible"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    marginHorizontal: 8,
  },
  price: {
    color: "#135de7",
    fontWeight: "bold",
    marginHorizontal: 8,
    marginTop: 4,
  },
  btn: {
    backgroundColor: "#135de7",
    margin: 8,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledBtn: {
    backgroundColor: "#ccc",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
