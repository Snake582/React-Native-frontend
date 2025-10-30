import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.footerContainer}>
      {/* Ligne supérieure avec bouton */}
      <View style={styles.topRow}>
        <Text style={styles.brand}>MouridHouse</Text>

        <TouchableOpacity
          style={styles.aboutButton}
          onPress={() => navigation.navigate("Apropos")} // ✅ Assure-toi d’avoir une route "Apropos"
        >
          <Text style={styles.aboutText}>À propos</Text>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      {/* Réseaux sociaux */}
      <View style={styles.socialRow}>
        <TouchableOpacity onPress={() => Linking.openURL("https://facebook.com")}>
          <FontAwesome name="facebook" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://instagram.com")}>
          <FontAwesome name="instagram" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com")}>
          <FontAwesome name="twitter" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://t.me")}>
          <FontAwesome name="telegram" size={24} color="#fff" style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Texte copyright */}
      <Text style={styles.footerText}>© 2025 MouridHouse. Tous droits réservés.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#135de7",
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  aboutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0be9a6",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  aboutText: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 5,
  },
  arrow: {
    color: "#fff",
    fontSize: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.8,
    textAlign: "center",
  },
});
