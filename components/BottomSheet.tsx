import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpapers';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Colors } from '@/constants/Colors';
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const theme = useColorScheme() ?? 'light';

export const DownloadPicture = ({ onClose, wallpaper }: {
    onClose: any;
    wallpaper: Wallpaper;
}) => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const theme = useColorScheme() ?? 'light';

    // renders
    return (
        // <View style={styles.container}>
        <BottomSheet
            snapPoints={["95%"]}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            onClose={onClose}
            handleIndicatorStyle={{ height: 0 }}
            handleStyle={{
                display: "none",
            }}
        >
            <BottomSheetView style={styles.contentContainer}>
                <ThemedView style={{ flex: 1 }}>
                    <Image source={{ uri: wallpaper.url }} style={styles.image} />

                    <View style={styles.topbar}>
                        <Ionicons
                            onPress={onClose}
                            name={'close'}
                            size={24}
                            color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
                        />
                        <View style={styles.topbarInner}>
                            <Ionicons
                                name={'heart'}
                                size={24}
                                color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
                            />
                            <Ionicons
                                name={'share'}
                                size={24}
                                color={theme === 'light' ? Colors.light.icon : Colors.dark.text}
                                style={{ paddingLeft: 4 }}
                            />
                        </View>
                    </View>

                    <ThemedView style={styles.textContainer}>
                        <ThemedText style={styles.text}>{wallpaper.name}</ThemedText>
                    </ThemedView>

                    {/* <ThemedView style={styles.downloadButtonContainer}> */}
                    <DownloadButton url={wallpaper.url} />
                </ThemedView>
            </BottomSheetView>

        </BottomSheet>
        // </View>
    );
};

function DownloadButton({ url }: { url: string }) {
    const theme = useColorScheme() ?? 'light';

    return <Pressable onPress={async () => {
        let date = new Date().getTime();
        let fileUri = FileSystem.documentDirectory + `${date}.jpg`;

        try {
            await FileSystem.downloadAsync(url, fileUri)
            const response = await MediaLibrary.requestPermissionsAsync(true);
            if (response.granted) {
                MediaLibrary.createAssetAsync(fileUri)
                alert("Photo Downloaded successfully")
            }
            else {
                console.error("permission not granted")
            }
        }
        catch (err) {
            console.log("FS err: ", err);
        }
    }}>
        <ThemedView style={styles.downloadButton} >
            <Ionicons
                name={'download'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingRight: 4 }}
            />
            <Text style={{
                color: "white",
                fontSize: 20,
                fontWeight: "600",
            }}>Download</Text>
        </ThemedView>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
    },
    image: {
        height: 450,
        borderRadius: 15
    },
    textContainer: {
        width: "100%",
    },
    text: {
        padding: 10,
        marginTop: 45,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "600",
    },

    downloadButton: {
        backgroundColor: "black",
        padding: 20,
        marginHorizontal: 40,
        marginVertical: 20,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme === 'light' ? Colors.light.icon : Colors.dark.icon,
    },
    topbar: {
        position: "absolute",
        padding: 10,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%"
    },
    topbarInner: {
        display: "flex",
        flexDirection: "row",
    },
});
