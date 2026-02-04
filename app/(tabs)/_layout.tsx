import { Redirect, Slot, Tabs } from "expo-router";
// import { Image } from "react-native";
// import { images } from "@/constants";



export default function TabLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/sign-in" />
  return <Slot />
  // return ( 
  //   <Tabs 
  //     screenOptions={{
  //       tabBarActiveTintColor: "blue",
  //       tabBarInactiveTintColor: "green",
  //       tabBarStyle: {
  //         backgroundColor: "#fff",
  //         height: 90,
  //         paddingTop: 30,
  //         paddingBottom: 10,
  //         borderTopColor: "blue",
  //         borderTopWidth: 1,
  //       },
  //       tabBarLabelStyle: {
  //         fontSize: 20,
  //         fontFamily: "Arial",
  //         fontWeight: "600",
  //       },
  //       headerShown: false,
  //     }}
  //   >
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: "Home",
  //         tabBarIcon: ({ focused }) => (
  //           <Image 
  //             source={images.home}
  //             className="size-10"
  //             resizeMode="contain"
  //             tintColor={focused ? "blue" : "green"}
  //           />
  //         ),
  //       }}
  //     />
  //   </Tabs>
  // );
}