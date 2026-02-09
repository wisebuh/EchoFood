import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "tapping" | "side" | "size" | "crust" | "bread" | "spice" | "base" | "sauce";
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

const data = dummyData as DummyData;

async function clearAll(collectionId: string): Promise<void> {
    const list = await databases.listDocuments(
        appwriteConfig.databaseId,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwriteConfig.bucketId);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.bucketId, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
    try {
        console.log(`📥 Fetching image: ${imageUrl.substring(0, 60)}...`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000); // 45s timeout
        
        const response = await fetch(imageUrl, {
            signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();
        console.log(`📦 Blob size: ${(blob.size / 1024 / 1024).toFixed(2)}MB`);

        const fileObj = {
            name: `menu-${Date.now()}.png`,
            type: blob.type || 'image/png',
            size: blob.size,
            uri: imageUrl,
        };

        console.log(`⬆️ Uploading to Appwrite...`);
        const file = await storage.createFile(
            appwriteConfig.bucketId,
            ID.unique(),
            fileObj
        );

        const fileUrl = storage.getFileView(appwriteConfig.bucketId, file.$id).toString();
        console.log(`✅ Uploaded successfully`);
        
        return fileUrl;
    } catch (error: any) {
        console.error(`❌ Upload failed:`, error.message);
        console.log(`⚠️ Using original URL as fallback`);
        return imageUrl; // Fallback to original URL
    }
}

async function seed(): Promise<void> {
    try {
        console.log("🌱 Starting seed...");
        
        // 1. Clear all
        console.log("🧹 Clearing collections...");
        await clearAll(appwriteConfig.categoriesCollectionId);
        await clearAll(appwriteConfig.customizationsCollectionId);
        await clearAll(appwriteConfig.menuCollectionId);
        await clearAll(appwriteConfig.menuCustomizationCollectionId);

        // 2. Create Categories
        console.log("📁 Creating categories...");
        const categoryMap: Record<string, string> = {};
        for (const cat of data.categories) {
            console.log(`📁 Attempting to create category:`, cat);
            try {
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.categoriesCollectionId,
                    ID.unique(),
                    {
                        name: cat.name,
                        Description: cat.description,
                    }
                );
                categoryMap[cat.name] = doc.$id;
                console.log(`✅ Created category: ${cat.name}`);
            } catch (error: any) {
                console.error(`❌ FAILED AT CATEGORIES:`, error.message);
                throw error;
            }
        }

        // 3. Create Customizations
        console.log("🎨 Creating customizations...");
        const customizationMap: Record<string, string> = {};
        for (const cus of data.customizations) {
            console.log(`🎨 Attempting to create customization:`, cus);
            try {
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.customizationsCollectionId,
                    ID.unique(),
                    {
                        name: cus.name,
                        price: cus.price,
                        type: cus.type,
                    }
                );
                customizationMap[cus.name] = doc.$id;
                console.log(`✅ Created customization: ${cus.name}`);
            } catch (error: any) {
                console.error(`❌ FAILED AT CUSTOMIZATIONS:`, error.message);
                throw error;
            }
        }

        // 4. Create Menu Items
        console.log("🍕 Creating menu items...");
        const menuMap: Record<string, string> = {};
        for (const item of data.menu) {
            console.log(`🍕 Attempting to create menu item:`, item.name);
            const uploadedImage = item.image_url;

            try {
                const doc = await databases.createDocument(
                    appwriteConfig.databaseId,
                    appwriteConfig.menuCollectionId,
                    ID.unique(),
                    {
                        name: item.name,
                        description: item.description,
                        image_url: uploadedImage,
                        price: item.price,
                        rating: item.rating,
                        calories: item.calories,
                        protein: item.protein,
                        category: categoryMap[item.category_name],
                    }
                );

                menuMap[item.name] = doc.$id;
                console.log(`✅ Created menu item: ${item.name}`);

                // 5. Create menu_customizations
                console.log(`🔗 Creating customizations for: ${item.name}`);
                for (const cusName of item.customizations) {
                    console.log(`🔗 Linking ${item.name} with ${cusName}`);
                    try {
                        await databases.createDocument(
                            appwriteConfig.databaseId,
                            appwriteConfig.menuCustomizationCollectionId,
                            ID.unique(),
                            {
                                menu: doc.$id,
                                customizations: customizationMap[cusName],
                            }
                        );
                    } catch (error: any) {
                        console.error(`❌ FAILED AT MENU_CUSTOMIZATIONS:`, error.message);
                        console.log(`Menu ID: ${doc.$id}, Customization ID: ${customizationMap[cusName]}`);
                        throw error;
                    }
                }
            } catch (error: any) {
                console.error(`❌ FAILED AT MENU ITEM:`, error.message);
                throw error;
            }
        }

        console.log("✅ Seeding complete!");
    } catch (error) {
        console.error("❌ Seed failed:", error);
        throw error;
    }
}


export default seed;