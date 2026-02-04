import { Platform } from "react-native";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    Platform:"com.jsm.foodordering",
    databaseId: "69829c2c002c0977cbcb",
    userCollectionId: "6982a0060036f2b93ea0"
    
}