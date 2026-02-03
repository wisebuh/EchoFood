import { FlatList, Pressable, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
 import { offers } from "@/constants"
import { Fragment } from "react";
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center  bg-white-100">
      <FlatList 
      data={offers}
      renderItem={({item, index})=>{
        return (
          <View>
            <Pressable className="offer-card" style={{backgroundColor:item.color}}>
              <Fragment>
                <View className="h-full w-96">
                <Image 
                source={item.image}
                className={'size-full'}
                resizeMode="center"
                />
              </View>
              <View className="offer-card_info">
                <Text>{item.title}</Text>
              </View>
              </Fragment>
            </Pressable>
          </View>
        )
      }}
      />
    </SafeAreaView>

  );
}