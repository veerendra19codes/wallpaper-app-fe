import { TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';

const theme = useColorScheme() ?? 'light';

export default function Signup() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    }

    const handleSignup = async () => {
        console.log("email, password", email, password);

        if (!validateEmail) {
            setError("Invalid email format")
        }
        else if (password.length < 6) {
            setError("Password must contain 6 characters")
        }
        if (validateEmail(email) && email && password.length >= 6) {
            try {
                const usercreated = await createUserWithEmailAndPassword(auth, email, password);
                console.log("usercreated:", usercreated);

                router.push("/(tabs)")
            } catch (error: any) {
                console.log("error:", error.message);
            }
        }
    }
    return (
        <ThemedView style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 20, }}>
            <ThemedText style={styles.header}>Sign Up</ThemedText>
            <TextInput placeholder='email/email' value={email} placeholderTextColor={theme === "light" ? "gray" : "white"} onChangeText={(value) => {
                setError("");
                setEmail(value)
            }} style={styles.input} />
            <TextInput placeholder='password' value={password} onChangeText={(value) => {
                setError("");
                setPassword(value)
            }} style={styles.input} placeholderTextColor={theme === "light" ? "gray" : "white"} />

            {error && <ThemedText style={{ color: "red" }}>{error}</ThemedText>}

            <Pressable style={styles.submit}>
                <ThemedText onPress={handleSignup}>Sign Up</ThemedText>
            </Pressable>

            <ThemedText>Already have an account? <Link href="/signin" style={{ color: "#24A0ED" }}>Signin</Link></ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 15,
        color: "white",
        height: 48,
        paddingHorizontal: 16,
        paddingVertical: 2,
    },
    submit: {
        borderRadius: 16,
        backgroundColor: "#24A0ED", // blue
        borderWidth: 1,
        paddingHorizontal: 28,
        paddingVertical: 12,
    }
})