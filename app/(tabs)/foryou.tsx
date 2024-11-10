import SplitView from '@/components/SplitView';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import useWallpapers, { useLibraryWallpapers, useLikedWallpapers, useSuggestedWallpapers } from '@/hooks/useWallpapers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView, StyleSheet, Text, View, useColorScheme } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function Foryou() {
    const theme = useColorScheme() ?? "light";

    return (
        <ThemedSafeAreaView style={styles.container}>
            <Tab.Navigator style={{
                flex: 1
            }} screenOptions={{
                tabBarActiveTintColor: Colors[theme].tint,
                tabBarStyle: {
                    backgroundColor: Colors[theme].background
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors[theme].indicator,
                    height: 5
                }
            }} >
                <Tab.Screen name="suggested" component={SuggestedScreen} />
                <Tab.Screen name="liked" component={LikedScreen} />
                <Tab.Screen name="library" component={LibraryScreen} />
            </Tab.Navigator>
        </ThemedSafeAreaView>
    );
}

function SuggestedScreen() {
    const wallpapers = useSuggestedWallpapers();
    return <ThemedView style={styles.container}>
        <SplitView wallpapers={wallpapers} />
    </ThemedView>
}

function LikedScreen() {
    const wallpapers = useLikedWallpapers();
    return <ThemedView style={styles.container}>
        <SplitView wallpapers={wallpapers} />
    </ThemedView>
}

function LibraryScreen() {
    const wallpapers = useLibraryWallpapers();
    return <ThemedView style={styles.container}>
        <SplitView wallpapers={wallpapers} />
    </ThemedView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})