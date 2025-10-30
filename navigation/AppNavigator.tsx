import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import CategoriesScreen from "../Screens/CategoriesScreen";
import ContactScreen from "../Screens/ContactScreen";
import PanierScreen from "../Screens/PanierScreen";
import { useCart } from "../Screens/Components/CartContext";
import ProfileScreen from "../Screens/ProfileScreen";

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Categories: undefined;
  Contact: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Categories") iconName = "list";
          else if (route.name === "Contact") iconName = "call";
          else if (route.name === "Cart") iconName = "cart";
          else if (route.name === "Profile") iconName = "person";

          // ✅ Icône du panier avec badge rouge dynamique
          if (route.name === "Cart") {
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                {totalItems > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalItems}</Text>
                  </View>
                )}
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#135def",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 5, height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />
      <Tab.Screen
        name="Cart"
        component={PanierScreen}
        options={{ title: "Panier" }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -8,
    top: -4,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
});
