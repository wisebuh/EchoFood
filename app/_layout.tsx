import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "./global.css";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://183d7fe67a15ff7b8582cc96e2d5e5b9@o4510848804388864.ingest.us.sentry.io/4510848806551552',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

function RootLayout() {
  // ALL HOOKS MUST BE AT THE TOP - BEFORE ANY RETURNS
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "Quicksand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "Quicksand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "Quicksand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
    "Quicksand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
  });

  // First useEffect - handle errors and hide splash
  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Second useEffect - fetch auth user
  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  // NOW you can do conditional returns - AFTER all hooks
  if (!fontsLoaded || isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default Sentry.wrap(RootLayout);