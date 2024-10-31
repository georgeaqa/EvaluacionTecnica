import {
  CustomButton,
  CustomIcon,
  CustomScreenWrapper,
  CustomTextInput,
} from "@/src/components";
import { supabase } from "../../lib/supabase";
import { Keyboard, Pressable, ScrollView, Text, View } from "react-native";
import { useStore } from "../../store/Zustand";
import React, { useState } from "react";

export default function SignInScreen() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [watchPassword, setWatchPassword] = useState(false);

  const { setUsuario } = useStore();
  const handleLogin = async () => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("name", user.toLocaleLowerCase())
      .eq("password", password)
      .single();

    setUsuario(data);
  };

  return (
    <CustomScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="grow"
      >
        <Pressable
          className="flex-1 gap-10 justify-center"
          onPress={Keyboard.dismiss}
        >
          <View className="gap-2">
            <Text className="text-7xl font-bold text-center">Bienvenidos</Text>
          </View>
          <View className="gap-5">
            <CustomTextInput
              className="shadow-md shadow-black bg-white"
              iconLeft={<CustomIcon name="Mail" />}
              placeholder="Usuario"
              value={user}
              onChangeText={setUser}
            />

            <CustomTextInput
              className="shadow-md shadow-black bg-white"
              iconLeft={<CustomIcon name="LockKeyhole" />}
              iconRight={
                <Pressable onPress={() => setWatchPassword(!watchPassword)}>
                  {watchPassword ? (
                    <CustomIcon name="Eye" />
                  ) : (
                    <CustomIcon name="EyeOff" />
                  )}
                </Pressable>
              }
              placeholder="Contraseña"
              secureTextEntry={!watchPassword}
              value={password}
              onChangeText={setPassword}
            />
            <CustomButton
              className=""
              iconLeft={<CustomIcon name="LogIn" />}
              title="Iniciar Sesión"
              onPress={() => handleLogin()}
            />
          </View>
        </Pressable>
      </ScrollView>
    </CustomScreenWrapper>
  );
}
