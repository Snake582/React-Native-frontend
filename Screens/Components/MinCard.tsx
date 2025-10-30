import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface MinCardProps {
  title: string;
  onPress: () => void;
}

export default function MinCard({ title, onPress }: MinCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f4f4f4",
    width: 50, // ✅ petite taille pour tenir sur une ligne
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    color: "#135de7",
  },
});
