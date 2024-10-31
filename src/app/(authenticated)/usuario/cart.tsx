import { View, Text, FlatList, Alert } from "react-native";
import React from "react";
import { useStore } from "../../../store/Zustand";
import { Product } from "@/src/types/types";
import { CustomScreenWrapper, CustomButton } from "@/src/components";
import { supabase } from "@/src/lib/supabase";
import { Tabs } from "expo-router";

const Cart = () => {
  const { productsCart, clearCart } = useStore();

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View className="gap-2 p-2 border-2 rounded-3xl justify-center shadow-md shadow-black bg-white">
        <Text className="font-bold text-xl">{"Producto: " + item.name}</Text>
        <Text className="font-bold text-xl">
          {"Precio: $" + item.price.toFixed(2)}
        </Text>
      </View>
    );
  };
  const handleCheckout = async () => {
    if (productsCart.length === 0) {
      Alert.alert("El carrito está vacío", "Agrega productos para continuar.");
      return;
    }
    try {
      const { error } = await supabase.from("orders").insert({
        order_detail: productsCart,
        total: productsCart.reduce((sum, item) => sum + item.price, 0),
        status: "pedido recibido",
      });
      if (error) {
        throw error;
      }
      clearCart();
      Alert.alert("Compra procesada", "Gracias por su compra!");
    } catch (error: any) {
      Alert.alert(
        "Error",
        "Hubo un problema procesando su compra: " + error.message
      );
    }
  };
  return (
    <CustomScreenWrapper>
      <Tabs.Screen options={{ tabBarBadge: productsCart.length }} />
      <Text className="text-2xl font-bold mb-4">Carrito</Text>
      {productsCart.length === 0 ? (
        <Text>No hay productos en el carrito.</Text>
      ) : (
        <FlatList
          data={productsCart}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-2"
        />
      )}
      <CustomButton
        title="Procesar Compra"
        onPress={handleCheckout}
        className="mt-4"
      />
    </CustomScreenWrapper>
  );
};

export default Cart;
