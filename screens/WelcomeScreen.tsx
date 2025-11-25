import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    // Animation values
    const logoScale = useRef(new Animated.Value(0)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sequence of animations
        Animated.sequence([
            // Logo scale and fade in
            Animated.parallel([
                Animated.timing(logoScale, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.elastic(1.2),
                    useNativeDriver: true,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            // App name fade in
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 500,
                delay: 200,
                useNativeDriver: true,
            }),
            // Tagline fade in
            Animated.timing(taglineOpacity, {
                toValue: 1,
                duration: 500,
                delay: 100,
                useNativeDriver: true,
            }),
        ]).start();

        // Navigate to UserType screen after 3 seconds
        const timer = setTimeout(() => {
            navigation.navigate('UserType' as never);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }],
                        },
                    ]}
                >
                    <Image
                        source={require('../logohack.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* App Name */}
                <Animated.View style={{ opacity: textOpacity }}>
                    <Text style={styles.appName}>Foodle</Text>
                </Animated.View>

                {/* Tagline */}
                <Animated.View style={{ opacity: taglineOpacity }}>
                    <Text style={styles.tagline}>Fresh from Farm to Your Table</Text>
                </Animated.View>

                {/* Decorative elements */}
                <View style={styles.decorativeContainer}>
                    <Text style={styles.decorativeEmoji}>🌾</Text>
                    <Text style={styles.decorativeEmoji}>🥬</Text>
                    <Text style={styles.decorativeEmoji}>🍅</Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Connecting Farmers & Food Lovers</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logo: {
        width: 150,
        height: 150,
    },
    appName: {
        fontSize: scaleFont(48),
        fontWeight: 'bold',
        color: '#166534',
        marginBottom: 12,
        letterSpacing: 1,
    },
    tagline: {
        fontSize: scaleFont(16),
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 40,
    },
    decorativeContainer: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 20,
    },
    decorativeEmoji: {
        fontSize: scaleFont(32),
    },
    footer: {
        paddingBottom: 30,
        alignItems: 'center',
    },
    footerText: {
        fontSize: scaleFont(12),
        color: '#9CA3AF',
        fontWeight: '500',
    },
});
