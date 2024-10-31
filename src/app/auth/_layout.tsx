import { Redirect, Slot } from "expo-router";
import { useStore } from "../../store/Zustand";

export default function AuthLayout() {
  const { user } = useStore();
  console.log(user);
  if (user?.type === "usuario") {
    return <Redirect href="/(authenticated)/usuario" />;
  } else if (user?.type === "admin") {
    return <Redirect href="/(authenticated)/adminx" />;
  } else if (user?.type === "delivery") {
    return <Redirect href="/(authenticated)/deliveryx" />;
  }
  return <Slot />;
}
