import { View, Text } from 'react-native'
import { Button } from '@react-navigation/elements'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
  return (
    <SafeAreaView>
        <Button title="" onPressIn={()=>router.push("/(auth)/sign-in")}></Button>
    </SafeAreaView>
  )
}