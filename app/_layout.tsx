import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';

export default function Layout() {

    return <NavigationContainer>

        <GestureHandlerRootView>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="(nobottombar)/accountinfo" options={{ headerShown: true, headerTitle: "Account info", headerBackTitle: "Go back" }} />
            </Stack>
        </GestureHandlerRootView>
    </NavigationContainer>
}