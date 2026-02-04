import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function SignIn() {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text className="body-regular text-primary font-quicksand-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
}