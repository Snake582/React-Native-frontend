import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Récupérer le profil utilisateur depuis le backend
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        navigation.replace("Login");
        return;
      }

      const response = await fetch("http://192.168.1.6:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Erreur lors du chargement du profil");

      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Erreur profil:", err);
      Alert.alert("Erreur", "Impossible de charger votre profil");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // 🚪 Déconnexion
  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Voulez-vous vraiment vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        onPress: async () => {
          await AsyncStorage.removeItem("userToken");
          navigation.replace("Login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#135de7" />
        <Text>Chargement du profil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon Profil</Text>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.name}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.info}>📧 {user.email}</Text>
          <Text style={styles.info}>📱 {user.number || "Non renseigné"}</Text>
          <Text style={styles.info}>
            🕒 Membre depuis :{" "}
            {new Date(user.createdAt).toLocaleDateString("fr-FR")}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>Impossible de récupérer les données</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MesCommandes")}
      >
        <Text style={styles.buttonText}>📦 Voir mes commandes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#0be9a6ff" }]}
        onPress={() => Alert.alert("Fonction à venir", "Édition de profil bientôt disponible")}
      >
        <Text style={styles.buttonText}>✏️ Modifier mes infos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪 Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#135de7",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f7fa",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  name: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 10 },
  info: { fontSize: 16, color: "#555", marginBottom: 5 },
  errorText: { textAlign: "center", color: "red" },
  button: {
    backgroundColor: "#135de7",
    padding: 14,
    borderRadius: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    padding: 14,
    borderRadius: 10,
    marginTop: 15,
  },
  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
