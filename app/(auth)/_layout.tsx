import { Button } from '@react-navigation/elements'
import { router, Slot } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function AuthLayout() {
  return (
    <SafeAreaView>
        <Text>Auth Layout</Text>
       
      <Slot />
    </SafeAreaView>
  )
}