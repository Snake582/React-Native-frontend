/* import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./CartContext";

export default function CartIcon() {
  const navigation = useNavigation<any>();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, p) => sum + (p.quantity || 1), 0);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Panier")}
    >
      <Text style={styles.icon}>🛒</Text>
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { marginRight: 15 },
  icon: { fontSize: 28 },
  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  badgeText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
});
 */