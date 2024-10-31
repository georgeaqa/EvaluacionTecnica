import { supabase } from "@/src/lib/supabase";
import { Alert } from "react-native";

export const updateOrderStatus = async (orderId: number, newStatus: string) => {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    Alert.alert("Error", "No se pudo actualizar el estatus: " + error.message);
  }
};
