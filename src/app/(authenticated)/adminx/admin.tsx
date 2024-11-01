import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { CustomButton, CustomScreenWrapper } from "@/src/components";
import { Order } from "@/src/types/types";
import { getRealTime, updateOrderStatus } from "@/src/services/orderServices";
const admin = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleEvents = (payload: any) => {
    console.log(payload);
    const { eventType, new: newOrder } = payload;
    if (eventType === "INSERT") {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    } else if (eventType === "UPDATE") {
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === newOrder.id ? newOrder : order))
      );
    }
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        Alert.alert(
          "Error",
          "No se pudieron cargar las órdenes: " + error.message
        );
      } else {
        setOrders(data);
      }
    };
    fetchOrders();

    getRealTime({ handleEvents });
  }, []);

  const renderItem = ({ item }: { item: Order }) => {
    return (
      <View className="gap-2 p-2 border-2 rounded-3xl justify-center shadow-md shadow-black bg-white">
        <Text className="font-bold text-xl">{"Orden ID: " + item.id}</Text>
        <Text className="font-bold text-lg">
          {"Total: " + item.total.toFixed(2)}
        </Text>
        <Text className="font-bold text-lg">{"Estado: " + item.status}</Text>
        {item.status.toLocaleLowerCase() === "pedido recibido" && (
          <CustomButton
            title="Cambiar a Preparando"
            onPress={() => updateOrderStatus(item.id, "Preparando")}
          />
        )}
      </View>
    );
  };

  return (
    <CustomScreenWrapper>
      <Text className="text-2xl font-bold mb-4">Órdenes</Text>
      {orders.length === 0 ? (
        <Text>No hay órdenes disponibles.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-2"
        />
      )}
    </CustomScreenWrapper>
  );
};

export default admin;
