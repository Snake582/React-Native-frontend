import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MesCommandesScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Charger les commandes depuis le backend
  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Erreur", "Vous devez être connecté pour voir vos commandes");
        return;
      }

      const response = await fetch("http://192.168.1.6:3000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erreur commandes:", data);
        throw new Error(data.message || "Impossible de récupérer les commandes");
      }

      setOrders(data);
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Mes Commandes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#135de7" style={{ marginTop: 50 }} />
      ) : orders.length === 0 ? (
        <Text style={styles.empty}>Aucune commande trouvée 😔</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.header}>
                <Text style={styles.orderId}>Commande #{item.id}</Text>
                <Text
                  style={[
                    styles.status,
                    {
                      color:
                        item.status === "livré"
                          ? "green"
                          : item.status === "en cours"
                          ? "#e67e22"
                          : "gray",
                    },
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <Text style={styles.date}>
                📅 {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.total}>💰 Total : {item.total} FCFA</Text>
            </View>
          )}
        />
      )}
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
    marginBottom: 15,
  },
  empty: { textAlign: "center", color: "#888", marginTop: 100, fontSize: 16 },
  orderCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { flexDirection: "row", justifyContent: "space-between" },
  orderId: { fontWeight: "bold", color: "#135de7", fontSize: 16 },
  status: { fontWeight: "600", textTransform: "capitalize" },
  date: { marginTop: 5, color: "#666" },
  total: { marginTop: 8, fontWeight: "bold", color: "#222" },
});
