import { supabase } from "@/src/lib/supabase";
import { Alert } from "react-native";
import { useStore } from "@/src/store/Zustand";
import { Order } from "@/src/types/types";

export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    Alert.alert("Error", "No se pudo actualizar el estatus: " + error.message);
  }
};

export const getRealTime = ({ handleEvents }: { handleEvents: any }) => {
  let orderChannel = supabase
    .channel("orders")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
      },
      handleEvents
    )
    .subscribe();
  return () => {
    orderChannel.unsubscribe();
  };
};
