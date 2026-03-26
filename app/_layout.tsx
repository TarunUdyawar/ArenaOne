import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import BackButton from "@/src/components/ui/BackButton";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inTabsGroup = segments[0] === '(tabs)';
    const isAuthRoute = segments[0] === '(auth)' || segments[0] === 'landing' || !segments[0];

    if (!user && inTabsGroup) {
      router.replace('/landing');
    } else if (user && isAuthRoute) {
      router.replace('/(tabs)/Home');
    }
  }, [user, loading, segments]);

  if (loading) return null;

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthGuard>
          <Stack 
            screenOptions={{ 
              headerShown: true, 
              headerTransparent: true, 
              headerTitle: "", 
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => <BackButton />
            }} 
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="landing" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </AuthGuard>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
