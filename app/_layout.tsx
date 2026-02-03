import { Stack } from "expo-router";
import {useFonts} from "expo-font"
import { useEffect } from "react";
import "./global.css"

export default function RootLayout() {
  /*
  const [] = useFonts(map:{
  "QuickSand-Bold": require(id: "../assets/fonts/Quick-Bold.ttf"),
  "QuickSand-Medium": require(id: "../assets/fonts/Quick-Medium.ttf"),
  "QuickSand-Regular": require(id: "../assets/fonts/Quick-Regular.ttf"),
  "QuickSand-SemiBold": require(id: "../assets/fonts/Quick-SemiBold.ttf"),
  "QuickSand-Light": require(id: "../assets/fonts/Quick-Light.ttf")
  })

  useEffect(effect ()=>{
  if (error) throw error;

  if(fontsLoaded) SplashScreen.hideAsync();
  }, deps[fontsLoaded, error])
  */
  return (
  <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen
    name="(tabs)"/>
    
  </Stack>
);
}
