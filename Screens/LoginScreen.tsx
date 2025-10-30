import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("⚠️", "Veuillez entrer votre email et votre mot de passe.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.6:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erreur de connexion:", data);
        Alert.alert("❌ Erreur", data.message || "Identifiants invalides");
        setLoading(false);
        return;
      }

      // ✅ Stocker le token dans AsyncStorage
      if (data.access_token) {
        await AsyncStorage.setItem("userToken", data.access_token);
        console.log("Token enregistré:", data.access_token);
      }

      Alert.alert("✅ Connexion réussie !");
      navigation.replace("AppNavigator"); // ou "Panier" si tu veux aller directement au panier
    } catch (error) {
      console.error("Erreur réseau:", error);
      Alert.alert("🚫", "Impossible de se connecter au serveur !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Connexion..." : "Se connecter"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.comp}>Pas de compte ?</Text>
        <Text style={styles.link}>Inscrivez-vous</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#135",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#0be9a6ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  link: {
    marginTop: 15,
    color: "#fff",
    textAlign: "center",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#0be9a6ff",
    fontWeight: "bold",
  },
  comp: { marginTop: 15, color: "#000000ff", textAlign: "center" },
});
