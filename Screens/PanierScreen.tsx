import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useCart } from "./Components/CartContext";

export default function PanierScreen() {
  const { cart, setCart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [modalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("2000"); // fixe ou dynamique
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.prix * (item.quantity || 1), 0);

  const handleOrder = async () => {
    if (!number || !address) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://192.168.1.6:3000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1, // remplacer par l'id du user connecté
          address,
          number,
          deliveryFee: Number(deliveryFee),
          total: total + Number(deliveryFee),
          products: cart.map((p) => ({
            productId: p.id,
            quantity: p.quantity || 1,
          })),
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de la commande");

      setModalVisible(false);
      clearCart();
      Alert.alert("✅ Commande confirmée", "Votre commande sera payée à la livraison");
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Impossible d'envoyer la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Mon Panier</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Votre panier est vide 😔</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString() + (item.taille || "")}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.title}</Text>
                  {item.taille && <Text style={styles.text}>Taille: {item.taille}</Text>}
                  <Text style={styles.price}>{item.prix} FCFA</Text>
                </View>

                <View style={styles.quantityBox}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, -1, item.taille)}
                  >
                    <Text style={styles.qtyText}>➖</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyNumber}>{item.quantity || 1}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => updateQuantity(item.id, 1, item.taille)}
                  >
                    <Text style={styles.qtyText}>➕</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeFromCart(item.id, item.taille)}
                  >
                    <Text style={styles.removeText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <Text style={styles.total}>
            💰 Total : {total + Number(deliveryFee)} FCFA
          </Text>

          <TouchableOpacity
            style={styles.orderButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.orderText}>Commander</Text>
          </TouchableOpacity>
        </>
      )}

      {/* MODAL DE LIVRAISON */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Informations de livraison</Text>

            <TextInput
              style={styles.input}
              placeholder="Numéro de téléphone"
              keyboardType="phone-pad"
              value={number}
              onChangeText={setNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse de livraison"
              value={address}
              onChangeText={setAddress}
            />
            <TextInput
              style={styles.input}
              placeholder="Frais de livraison"
              value={deliveryFee}
              onChangeText={setDeliveryFee}
              keyboardType="numeric"
            />

            <Text style={{ marginVertical: 8 }}>
              💵 Paiement à la livraison — Total : {total + Number(deliveryFee)} FCFA
            </Text>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleOrder}
              disabled={loading}
            >
              <Text style={styles.confirmText}>
                {loading ? "Envoi..." : "Confirmer la commande"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#135de7", textAlign: "center" },
  empty: { textAlign: "center", color: "#888", fontSize: 16, marginTop: 50 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  text: { fontSize: 16, fontWeight: "600", color: "#333" },
  price: { color: "#135de7", fontWeight: "bold", marginTop: 4 },
  quantityBox: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  qtyBtn: { backgroundColor: "#f0f0f0", padding: 6, borderRadius: 6 },
  qtyText: { fontSize: 18, fontWeight: "bold" },
  qtyNumber: { marginHorizontal: 10, fontSize: 16, fontWeight: "600" },
  removeBtn: { padding: 5 },
  removeText: { fontSize: 18, color: "red" },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 15, textAlign: "right", color: "#135de7" },
  orderButton: {
    backgroundColor: "#0be9a6ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  orderText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#0be9a6ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: { color: "#fff", fontWeight: "bold" },
  cancelText: { color: "red", marginTop: 10, textAlign: "center" },
});
