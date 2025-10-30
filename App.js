import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./navigation/AppNavigator"; // Tabs
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import CategoriesScreen from "./Screens/CategoriesScreen";
import BoubouScreen from "./Screens/BoubouScreen";
import ChaussuresScreen from "./Screens/ChaussuresScreen";
import LivresScreen from "./Screens/LivresScreen";
import AccessoiresScreen from "./Screens/AccessoiresScreen";
import CafeScreen from "./Screens/CafeScreen";
import PanierScreen from "./Screens/PanierScreen";
import { CartProvider } from "./Screens/Components/CartContext";
import HomeScreen from "./Screens/HomeScreen";
import ContactScreen from "./Screens/ContactScreen";
import AboutScreen from "./Screens/AboutScreen";
import ProduitDetailScreen from "./Screens/ProduitDetailScreen";
import MesCommandesScreen from "./Screens/MesCommandesScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#0b73e9ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />

        {/* Tabs */}
        <Stack.Screen
          name="AppNavigator"
          component={AppNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        <Stack.Screen name="Boubous" component={BoubouScreen} />
        <Stack.Screen name="Chaussures" component={ChaussuresScreen} />
        <Stack.Screen name="Livres" component={LivresScreen} />
        <Stack.Screen name="Accessoires" component={AccessoiresScreen} />
        <Stack.Screen name="Café" component={CafeScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Apropos" component={AboutScreen} />
        <Stack.Screen name="Panier" component={PanierScreen} />
        <Stack.Screen name="ProduitDetail" component={ProduitDetailScreen} />
        <Stack.Screen name="MesCommandes" component={MesCommandesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
