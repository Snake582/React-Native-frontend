import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function SignupScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignup = async () => {
    if (password !== confirm) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.6:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          name,
          number,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Erreur: " + (error.message || "Une erreur est survenue"));
        return;
      }

      alert("Inscription réussie !");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Impossible de se connecter au serveur !");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Nom d'utilisateur" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nom" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Numéro de téléphone" value={number} onChangeText={setNumber} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmez le mot de passe" secureTextEntry value={confirm} onChangeText={setConfirm} />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Déjà un compte ? Connectez-vous</Text>
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
  link: { marginTop: 15, color: "#135de7", textAlign: "center" },
});
