import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont, scale } from '../utils/responsive';
import { useUser } from '../context/UserContext';

type UserType = 'farmer' | 'foodie' | null;

export default function UserTypeScreen() {
    const [selectedType, setSelectedType] = useState<UserType>(null);
    const navigation = useNavigation<any>();
    const { setUserType } = useUser();

    const handleContinue = () => {
        if (selectedType) {
            setUserType(selectedType);
            navigation.navigate('Home');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <View />
                </View>

                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>
                        Let's Get Started On{'\n'}Your Journey
                    </Text>
                    <Text style={styles.subtitle}>
                        Tell us who you are, so we can tailor your Farmers Market experience.
                    </Text>
                </View>

                {/* Cards */}
                <View style={styles.cardsContainer}>
                    {/* Farmer Card */}
                    <Pressable
                        onPress={() => setSelectedType('farmer')}
                        style={[
                            styles.card,
                            selectedType === 'farmer' && styles.cardSelected
                        ]}
                    >
                        <View style={styles.iconCircleOrange}>
                            <Text style={styles.emoji}>👨‍🌾</Text>
                        </View>
                        <Text style={styles.cardTitle}>I'm A Farmer</Text>
                        <Text style={styles.cardSubtitle}>For those who grow the goodness.</Text>
                    </Pressable>

                    {/* Foodie Card */}
                    <Pressable
                        onPress={() => setSelectedType('foodie')}
                        style={[
                            styles.card,
                            selectedType === 'foodie' && styles.cardSelected
                        ]}
                    >
                        <View style={styles.iconCircleYellow}>
                            <Text style={styles.emoji}>👨‍🍳</Text>
                        </View>
                        <Text style={styles.cardTitle}>I'm A Foodie</Text>
                        <Text style={styles.cardSubtitle}>For those who savor the goodness.</Text>
                    </Pressable>
                </View>
            </View>

            {/* Continue Button */}
            <View style={styles.bottomSection}>
                <Pressable
                    onPress={handleContinue}
                    disabled={!selectedType}
                    style={[
                        styles.continueButton,
                        !selectedType && styles.continueButtonDisabled
                    ]}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </Pressable>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressActive} />
                    <View style={styles.progressActive} />
                    <View style={styles.progressInactive} />
                    <View style={styles.progressInactive} />
                    <View style={styles.progressInactive} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        paddingVertical: 40,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    titleSection: {
        marginBottom: 40,
    },
    title: {
        fontSize: scaleFont(30),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
        marginBottom: 16,
        lineHeight: scaleFont(38),
    },
    subtitle: {
        fontSize: scaleFont(16),
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: 16,
        lineHeight: scaleFont(24),
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    cardSelected: {
        borderColor: '#16A34A',
        backgroundColor: '#F0FDF4',
    },
    iconCircleOrange: {
        backgroundColor: '#FED7AA',
        borderRadius: 48,
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircleYellow: {
        backgroundColor: '#FEF3C7',
        borderRadius: 48,
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    emoji: {
        fontSize: scaleFont(40),
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: scaleFont(18),
        marginBottom: 4,
        color: '#000000',
    },
    cardSubtitle: {
        fontSize: scaleFont(12),
        color: '#6B7280',
        textAlign: 'center',
    },
    bottomSection: {
        marginTop: 20,
    },
    continueButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: '#166534',
    },
    continueButtonDisabled: {
        backgroundColor: '#D1D5DB',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: scaleFont(18),
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        gap: 8,
    },
    progressActive: {
        height: 4,
        width: 32,
        backgroundColor: '#166534',
        borderRadius: 2,
    },
    progressInactive: {
        height: 4,
        width: 32,
        backgroundColor: '#BBF7D0',
        borderRadius: 2,
    },
});
