import { Tabs } from "expo-router";
import { CustomIcon } from "@/src/components";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarIcon: ({ color }) => <CustomIcon name="List" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="ShoppingCart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Ordenes",
          tabBarIcon: ({ color }) => (
            <CustomIcon name="ListOrdered" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
