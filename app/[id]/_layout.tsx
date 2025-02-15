import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
    <StatusBar style="light" />
    <Stack>
      <Stack.Screen name="movie" options={{title:"Movie details"}} />
      <Stack.Screen name="player" options={{title:"Player"}} />
    </Stack>

    </>
     ) 
}
