import { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DownloadPicture } from "../../components/BottomSheet";
import useWallpapers, { Wallpaper } from "@/hooks/useWallpapers";
import SplitView from "@/components/SplitView";
import Carousel from 'react-native-reanimated-carousel';
import { useCarousel } from "@/hooks/useCarousel";
import { LinearGradient } from "expo-linear-gradient"
import { ThemedText } from "@/components/ThemedText";
import { AnimatedView } from "react-native-reanimated/lib/typescript/reanimated2/component/View";
import Animated from "react-native-reanimated";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

const TOPBAR_HEIGHT = 250;

export default function Explore() {
    const [pictureOpen, setPictureOpen] = useState(false);
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null);
    const wallpapers = useWallpapers();
    const width = Dimensions.get('window').width;
    const [yOffset, setScrollY] = useState(0);
    const carouselItems = useCarousel();

    return <ThemedSafeAreaView style={{ flex: 1 }}>
        <Animated.View style={{ height: TOPBAR_HEIGHT - yOffset }}>
            <Carousel
                loop
                width={width}
                // height={300 - yOffset}
                // autoPlay={true}
                data={carouselItems}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <>
                        <View
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <Image source={{ uri: carouselItems[index].image }} style={{ height: TOPBAR_HEIGHT }} />
                        </View>
                        <LinearGradient colors={["transparent", "black"]} style={{ flex: 1, position: "absolute", height: TOPBAR_HEIGHT / 2, zIndex: 10, width: "100%", bottom: 0 }}>
                            <Text style={{ color: "white", textAlign: "center", fontWeight: "500", fontSize: 30, paddingTop: TOPBAR_HEIGHT / 3 }}>{carouselItems[index].title}</Text>
                        </LinearGradient>
                    </>
                )}
            />
        </Animated.View>

        <SplitView onScroll={(yOffset) => {
            setScrollY(yOffset)
        }} wallpapers={wallpapers} />

        {selectedWallpaper && <DownloadPicture onClose={() => setSelectedWallpaper(null)} wallpaper={selectedWallpaper} />}

    </ThemedSafeAreaView>
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