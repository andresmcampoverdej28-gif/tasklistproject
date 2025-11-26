import { Stack } from "expo-router";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}