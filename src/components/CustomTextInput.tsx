import { TextInput, TextInputProps, View } from "react-native";

type CustomTextInputProps = TextInputProps & {
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export default function CustomTextInput({
  className,
  iconLeft,
  iconRight,
  ...props
}: CustomTextInputProps) {
  return (
    <View
      className={`flex-row gap-2 px-2 h-14 items-center border-2 rounded-3xl ${className}`}
    >
      {iconLeft && iconLeft}
      <TextInput className="flex-1 font-bold" {...props} />
      {iconRight && iconRight}
    </View>
  );
}
