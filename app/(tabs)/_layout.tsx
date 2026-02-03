import { Tabs } from "expo-router"
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor:"blue",
        tabBarInactiveTintColor:"green",
        tabBarStyle:{
            backgroundColor:"#fff",
            height:90,
            paddingTop:30,
            paddingBottom:10,
            borderTopColor:"blue",
            borderTopWidth:1
        },
        tabBarLabelStyle:{
            fontSize:20,
            fontFamily:"Arial",
            fontWeight:"600"
        },
        headerShown:false
        }}>
        <Tabs.Screen
        name="index"
        options={{title:"Home",
          // tabBarIcon:()=>{
          //   null
          // }
        }}/>
    </Tabs>
  )
}