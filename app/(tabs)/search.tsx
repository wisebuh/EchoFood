import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import seed from '@/lib/seed'

export default function search() {
  return (
    <SafeAreaView>
      <Text>Search</Text>
      <Button title="seed" onPress={()=>seed().catch((error)=>console.log("Failed to seed the database!", error))}/>
    </SafeAreaView>
  )
}