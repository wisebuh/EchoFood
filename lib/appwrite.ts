import { CreateUserPrams, SignInParams, User } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    Platform:"com.jsm.foodordering",
    databaseId: "69829c2c002c0977cbcb",
    bucketId: "6988cafb0003e205456f",
    userCollectionId: "6982a0060036f2b93ea0",
    categoriesCollectionId: "6988b837001235f054f5",
    menuCollectionId: "6989c37a00296b781c4e",
    customizationsCollectionId:"6988c6ba002d052c3fde",
    menuCustomizationCollectionId: "6988c93e0000dafe9cfb"

}

export const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint!)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.Platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage  = new Storage(client);
export const avatars = new Avatars(client);
 

export const createUser = async({email, password, name}:CreateUserPrams)=>{
    try{
        const newAccount = await account.create(ID.unique(), email, password)

        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name,accountId:newAccount.$id, avatar: avatarUrl }
        )

    } catch(e){
        throw new Error(e as string)
    }
}

export const signIn = async ({email, password}:SignInParams)=>{
try{
    const session = await account.createEmailPasswordSession(email, password)
}catch(e){
    throw new Error(e as string)
}
}

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error('No account found');

        const currentUser = await databases.listDocuments<User>(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );
        
        if (!currentUser || currentUser.documents.length === 0) {
            return null;
        }

        return currentUser.documents[0];
    } catch (e) {
        console.error('getCurrentUser error:', e);
        return null;
    }
}



// xport const getCurrentUser = async (): Promise<User | null> => {
//     try {
//         const currentAccount = await account.get();

//         if (!currentAccount) throw new Error('No account found');

//         const currentUser = await databases.listDocuments(
//             appwriteConfig.databaseId,
//             appwriteConfig.userCollectionId,
//             [Query.equal('accountId', currentAccount.$id)]
//         );
        
//         if (!currentUser || currentUser.documents.length === 0) {
//             return null;
//         }

//         return currentUser.documents[0] as User;
//     } catch (e) {
//         console.error('getCurrentUser error:', e);
//         return null; // Return null instead of throwing
//     }
// }