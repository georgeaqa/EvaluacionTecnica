import { View, Text, FlatList } from "react-native";
import { supabase } from "@/src/lib/supabase";
import { CustomButton, CustomScreenWrapper } from "@/src/components";
import React, { useEffect, useState } from "react";
import { useStore } from "../../../store/Zustand";
import { Product } from "@/src/types/types";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addProductToCart, removeProductFromCart, productsCart } = useStore();
  console.log(productsCart);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const isProductInCart = (productId: number) => {
    return productsCart.some((product) => product.id === productId);
  };
  const renderItem = ({ item }: { item: Product }) => {
    const inCart = isProductInCart(item.id);
    return (
      <View className="gap-2 p-2 border-2 rounded-3xl justify-center shadow-md shadow-black bg-white">
        <Text className="font-bold text-xl">{"Producto: " + item.name}</Text>
        <Text className="font-bold text-xl">{"Precio: " + item.price}</Text>
        <CustomButton
          title={inCart ? "Eliminar" : "Agregar"}
          onPress={() => {
            if (inCart) {
              removeProductFromCart(item.id);
            } else {
              addProductToCart(item);
            }
          }}
        />
      </View>
    );
  };

  return (
    <CustomScreenWrapper>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-2"
      />
    </CustomScreenWrapper>
  );
};

export default Products;
