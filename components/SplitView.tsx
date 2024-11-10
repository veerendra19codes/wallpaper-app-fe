import { FlatList, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { Wallpaper } from "@/hooks/useWallpapers";
import ImageCard from "./ImageCard";
import { useState } from "react";
import { DownloadPicture } from "./BottomSheet";

export default function SplitView({ wallpapers, onScroll }: {
    wallpapers: Wallpaper[],
    onScroll?: (yOffset: number) => void,
}) {

    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null);

    return <>
        <FlatList onScroll={(e) => {
            let yOffset = e.nativeEvent.contentOffset.y / 1;
            onScroll?.(yOffset);
            // console.log("yOffset in splitviews flatlist: ", yOffset);
        }} data={wallpapers.filter((_, index) => index % 2 === 0).map((_, index) => [wallpapers[index], wallpapers[index + 1]])}
            renderItem={({ item: [first, second] }) =>
                <ThemedView style={styles.container}>
                    <ThemedView style={styles.innerContainer}>
                        <View style={styles.imageContainer}>
                            <ImageCard wallpaper={first}
                                onPress={() => setSelectedWallpaper(first)} />
                        </View>
                    </ThemedView>
                    <ThemedView style={styles.innerContainer}>
                        {second && <View style={styles.imageContainer}>
                            <ImageCard wallpaper={second}
                                onPress={() => setSelectedWallpaper(second)} />
                        </View>}
                    </ThemedView>
                </ThemedView>
            }
            keyExtractor={item => item[0].name}
        />
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)} />}
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "row"
    },
    innerContainer: {
        flex: 1,
        padding: 10
    },
    imageContainer: {
        paddingVertical: 10
    }
})