import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function OrderConfirmationScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Success Animation */}
                <View style={styles.successCircle}>
                    <Text style={styles.checkmark}>✓</Text>
                </View>

                {/* Success Message */}
                <Text style={styles.title}>Order Placed Successfully!</Text>
                <Text style={styles.subtitle}>Your order has been confirmed and will be delivered soon</Text>

                {/* Order Details */}
                <View style={styles.orderCard}>
                    <View style={styles.orderRow}>
                        <Text style={styles.orderLabel}>Order Number</Text>
                        <Text style={styles.orderValue}>#FD12345</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.orderRow}>
                        <Text style={styles.orderLabel}>Estimated Delivery</Text>
                        <Text style={styles.orderValue}>30-45 minutes</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.orderRow}>
                        <Text style={styles.orderLabel}>Total Amount</Text>
                        <Text style={styles.orderValueGreen}>₹50.50</Text>
                    </View>
                </View>

                {/* Delivery Status */}
                <View style={styles.statusCard}>
                    <Text style={styles.statusTitle}>What's Next?</Text>
                    <View style={styles.statusStep}>
                        <View style={styles.statusIconActive}>
                            <Text style={styles.statusIconText}>✓</Text>
                        </View>
                        <View style={styles.statusInfo}>
                            <Text style={styles.statusStepTitle}>Order Confirmed</Text>
                            <Text style={styles.statusStepSubtitle}>Your order has been received</Text>
                        </View>
                    </View>
                    <View style={styles.statusStep}>
                        <View style={styles.statusIcon}>
                            <Text style={styles.statusIconText}>📦</Text>
                        </View>
                        <View style={styles.statusInfo}>
                            <Text style={styles.statusStepTitle}>Preparing</Text>
                            <Text style={styles.statusStepSubtitle}>Farmer is preparing your order</Text>
                        </View>
                    </View>
                    <View style={styles.statusStep}>
                        <View style={styles.statusIcon}>
                            <Text style={styles.statusIconText}>🚚</Text>
                        </View>
                        <View style={styles.statusInfo}>
                            <Text style={styles.statusStepTitle}>On the Way</Text>
                            <Text style={styles.statusStepSubtitle}>Your order will be delivered</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Actions */}
            <View style={styles.bottomSection}>
                <Pressable
                    style={styles.trackButton}
                    onPress={() => navigation.navigate('Orders' as never)}
                >
                    <Text style={styles.trackButtonText}>Track Order</Text>
                </Pressable>
                <Pressable
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('Home' as never)}
                >
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    checkmark: {
        fontSize: scaleFont(60),
        color: '#166534',
        fontWeight: 'bold',
    },
    title: {
        fontSize: scaleFont(26),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: scaleFont(15),
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    orderCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderLabel: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    orderValue: {
        fontSize: scaleFont(15),
        fontWeight: 'bold',
        color: '#111827',
    },
    orderValueGreen: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    statusCard: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
    },
    statusTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 20,
    },
    statusStep: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    statusIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIconActive: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIconText: {
        fontSize: scaleFont(20),
    },
    statusInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    statusStepTitle: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    statusStepSubtitle: {
        fontSize: scaleFont(13),
        color: '#6B7280',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        gap: 12,
    },
    trackButton: {
        backgroundColor: '#166534',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    trackButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    homeButton: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    homeButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
    },
});
