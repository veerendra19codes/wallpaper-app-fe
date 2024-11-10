import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Appearance, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = useColorScheme() ?? 'light';


export default function Account() {
    const theme = useColorScheme() ?? 'light';

    return <ThemedSafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, flexDirection: "column", gap: 20 }}>
            <ThemedView style={{ paddingTop: 20 }}>
                <HeaderText text="Panel" />
                <SubHeaderText text="Sign in to save your data" />
            </ThemedView>
            <SigninButtons />
            <ThemedView style={{ width: "100%", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
                <HeaderText text="Settings" />
                <SubHeaderText text="theme" />
                <ThemedView style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 40 }}>
                    <ThemeButton label="Light" colorScheme="light" />
                    <ThemeButton label="Dark" colorScheme="dark" />
                    <ThemeButton label="System" colorScheme={null} />
                </ThemedView>
            </ThemedView>

            <About />
        </ThemedView>

    </ThemedSafeAreaView>
}

function About() {
    return <ThemedView
        style={{ flexDirection: "column", margin: "auto", justifyContent: "center", alignItems: "center" }}
    >
        <HeaderText text="About" />
        <ThemedView style={{ marginTop: 10 }} >
            <Pressable>
                <ThemedText style={{ margin: 10, fontSize: 18, alignSelf: "center" }}>Account</ThemedText>
            </Pressable>
            <Pressable>
                <ThemedText style={{ margin: 10, fontSize: 18, alignSelf: "center" }}>Privacy Policy</ThemedText>
            </Pressable><Pressable>
                <ThemedText style={{ margin: 10, fontSize: 18, alignSelf: "center" }}>Terms of Service</ThemedText>
            </Pressable><Pressable>
                <ThemedText style={{ margin: 10, fontSize: 18, alignSelf: "center" }}>Licenses</ThemedText>
            </Pressable>
        </ThemedView>
    </ThemedView>
}

function ThemeButton({ label, colorScheme }: {
    label: string,
    colorScheme: "light" | "dark" | null
}) {
    return <Pressable style={{ borderWidth: 1, borderColor: theme === "dark" ? Colors.light.icon : Colors.dark.icon, borderRadius: 10, padding: 10, width: "30%" }}
        onPress={() => Appearance.setColorScheme(colorScheme)}>
        <ThemedText style={{ textAlign: "center", width: "100%" }}>{label}</ThemedText>
    </Pressable>
}

function HeaderText({ text }: { text: string }) {
    return <ThemedText style={{ width: "100%", display: "flex", textAlign: "center", fontWeight: "500", fontSize: 30, height: 40, textAlignVertical: "center" }}>
        {text}
    </ThemedText>
}

function SubHeaderText({ text }: { text: string }) {
    return <ThemedText style={{ width: "100%", textAlign: "center", fontWeight: "400", fontSize: 20 }}>
        {text}
    </ThemedText>
}

function SigninButtons() {
    const theme = useColorScheme() ?? 'light';


    return <>
        <ThemedView style={{ flexDirection: "column", gap: 15 }} >
            <AuthButton label="sign in" icon={<Ionicons
                name={'logo-google'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingRight: 4 }}
            />} />
            <AuthButton label="sign in" icon={<Ionicons
                name={'logo-apple'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingRight: 4 }}
            />} />
        </ThemedView>
    </>
}

function AuthButton({ label, icon }: {
    label: string,
    icon: any
}) {

    return <Pressable style={{ width: "100%", alignItems: "center" }}>
        <ThemedText style={styles.downloadButton} >
            {icon}
            {label}
        </ThemedText>
    </Pressable>
}

const styles = StyleSheet.create({
    downloadButton: {
        width: "80%",
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        padding: 20,
        borderRadius: 15,
        fontWeight: 500,
        fontSize: 20,
        display: "flex",
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: theme === "light" ? "white" : "black",
    },

});
