import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { auth } from "@/config/firebase";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme.web";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { signOut, User } from "firebase/auth";
import React from "react";
import { Appearance, Pressable, StyleSheet } from "react-native";

const theme = useColorScheme() ?? 'light';

export default function Account() {
    const theme = useColorScheme() ?? 'light';
    const { user } = useAuth();

    return <ThemedSafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, flexDirection: "column", gap: 20 }}>
            <ThemedView style={{ paddingTop: 20 }}>
                <HeaderText text="Panel" />
                <SubHeaderText text="Sign in to save your data" />
            </ThemedView>

            <SigninButtons user={user} />

            <ThemedView style={{ width: "100%", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center" }}>
                <HeaderText text="Settings" />
                <SubHeaderText text="theme" />
                <ThemedView style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", paddingHorizontal: 40 }}>
                    <ThemeButton label="Light" colorScheme="light" />
                    <ThemeButton label="Dark" colorScheme="dark" />
                    <ThemeButton label="System" colorScheme={null} />
                </ThemedView>
            </ThemedView>

            {/* <About /> */}
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

interface UserProps {
    user: User | null,
}

function SigninButtons({ user }: UserProps) {

    const theme = useColorScheme() ?? 'light';

    const handleLogout = async () => {
        await signOut(auth);
    }

    // const handleGoogleSignUp = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         console.log("User Info:", userInfo);

    //         const { idToken } = await GoogleSignin.getTokens();

    //         const response = await axios.post(`${API_URL}/signup`, {
    //             googleId: userInfo.user.id,
    //             name: userInfo.user.name,
    //         });

    //         alert(response.data.message);
    //     } catch (error: any) {
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             alert('User cancelled the login.');
    //         } else {
    //             console.error(error);
    //         }
    //     }
    // };

    // const handleGoogleSignIn = async () => {
    //     try {
    //         const userInfo = await GoogleSignin.signIn();
    //         const { idToken } = await GoogleSignin.getTokens();

    //         const response = await axios.post(`${API_URL}/signin`, {
    //             googleId: userInfo.user.id,
    //             name: userInfo.user.name,
    //         });

    //         await AsyncStorage.setItem('token', response.data.token);
    //         alert('Login successful!');
    //     } catch (error) {
    //         console.error(error);
    //         alert('Login failed!');
    //     }
    // };

    return (
        <ThemedView style={{ flexDirection: "column", gap: 15, width: "100%", alignItems: "center" }} >

            {/* <Pressable onPress={handleGoogleSignIn}>
                <AuthButton label="Sign In" icon={<Ionicons
                name={'logo-google'}
                size={24}
                    color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                    style={{ paddingRight: 4 }}
                />} />
            </Pressable>
            
            <Pressable onPress={handleGoogleSignUp}>
                <AuthButton label="Sign Up" icon={<Ionicons
                name={'logo-google'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingRight: 4 }}
                />} />
                </Pressable> */}


            {/* <AuthButton label="sign in" icon={<Ionicons
                name={'logo-apple'}
                size={24}
                color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
                style={{ paddingRight: 4 }}
                />} /> */}

            {user ? (
                <>
                    <ThemedText>{user?.email}</ThemedText>

                    <Pressable style={styles.logout} onPress={handleLogout}>
                        <ThemedText style={{ textAlign: "center" }}>Logout</ThemedText>
                    </Pressable>
                </>
            ) :

                <Link href="/(auth)/signin" style={styles.link}>
                    <ThemedText style={{ fontWeight: "bold", fontSize: 24, flex: 1, paddingVertical: "auto" }}>
                        Signin
                    </ThemedText>
                </Link>
            }
        </ThemedView>
    )
}

function AuthButton({ label }: {
    label: string,
}) {

    return <Pressable style={{ width: "100%", alignItems: "center" }}>
        <ThemedText style={styles.downloadButton}>
            {/* {icon} */}
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
    link: {
        color: "white",
        width: "50%",
        textAlign: "center",
        fontSize: 24,
        borderWidth: 1,
        padding: 12,
        borderColor: "blue",
        borderRadius: 15
    },
    logout: {
        color: "white",
        width: "50%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        fontSize: 24,
        borderWidth: 1,
        padding: 12,
        backgroundColor: "red",
        borderRadius: 15
    }
});
