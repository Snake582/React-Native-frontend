import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

export default function ContactScreen({ navigation }: any) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleContact = () => {
        alert(`Message envoyé\nNom: ${name}\nEmail: ${email}\nMessage: ${message}`);
    }

return (
    <View style={styles.container}> 
        <Text style={styles.title}>Contactez-nous</Text>
        <TextInput
            style={styles.input}
            placeholder="Votre nom"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Votre email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
        />
        <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Votre message"
            value={message}
            onChangeText={setMessage}
            multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleContact}>
            <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>

        <View style={styles.sectiona}>
            <Text  style={styles.texte}>En savoir plus sur Nous:</Text>
            <TouchableOpacity style={styles.buttona} onPress={() => navigation.navigate('Apropos')}>
                <Text style={styles.text}>À propos de nous</Text>
            </TouchableOpacity>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
  container: { flex: 1,
  justifyContent: "center",
    padding: 20,
},
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#135",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
    button: {
    backgroundColor: "#135de7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    texte: { fontSize: 16, color: "#333" },
    text: { color: "#fff", fontWeight: "bold" },
    sectiona: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        borderRadius: 10,
        padding: 15,
    },
    buttona: {
        marginTop: 10,
        backgroundColor: "#135de7",
        padding: 10,
    },
});