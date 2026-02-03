import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 import { offers } from "@/constants"
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center  bg-green-100">
      <FlatList 
      data={offers}
      renderItem={({item, index})=>{
        return(
        <View className="scroll-my-0">
          <Pressable className="bg-amber-600 my-3 h-48 rounded-xl w-full">
            <Text>{item.title.toUpperCase()}</Text>
          </Pressable>
          
        </View>
      )}}
      />
    </SafeAreaView>

  );
}