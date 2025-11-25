import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function CheckoutScreen() {
    const navigation = useNavigation();
    const [selectedPayment, setSelectedPayment] = useState('card');

    const cartTotal = 45.50;
    const deliveryFee = 5.00;
    const total = cartTotal + deliveryFee;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Delivery Address */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Delivery Address</Text>
                        <Pressable>
                            <Text style={styles.changeText}>Change</Text>
                        </Pressable>
                    </View>
                    <View style={styles.addressCard}>
                        <Text style={styles.addressIcon}>📍</Text>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressName}>Home</Text>
                            <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
                            <Text style={styles.addressText}>New York, NY 10001</Text>
                        </View>
                    </View>
                </View>

                {/* Delivery Time */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Time</Text>
                    <View style={styles.timeOptions}>
                        <Pressable style={[styles.timeOption, styles.timeOptionActive]}>
                            <Text style={styles.timeOptionIcon}>⚡</Text>
                            <Text style={styles.timeOptionTitle}>Express</Text>
                            <Text style={styles.timeOptionSubtitle}>30-45 min</Text>
                        </Pressable>
                        <Pressable style={styles.timeOption}>
                            <Text style={styles.timeOptionIcon}>📅</Text>
                            <Text style={styles.timeOptionTitle}>Scheduled</Text>
                            <Text style={styles.timeOptionSubtitle}>Choose time</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <Pressable
                        style={[styles.paymentOption, selectedPayment === 'card' && styles.paymentOptionActive]}
                        onPress={() => setSelectedPayment('card')}
                    >
                        <Text style={styles.paymentIcon}>💳</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentTitle}>Credit/Debit Card</Text>
                            <Text style={styles.paymentSubtitle}>**** **** **** 4242</Text>
                        </View>
                        <View style={[styles.radio, selectedPayment === 'card' && styles.radioActive]} />
                    </Pressable>
                    <Pressable
                        style={[styles.paymentOption, selectedPayment === 'cash' && styles.paymentOptionActive]}
                        onPress={() => setSelectedPayment('cash')}
                    >
                        <Text style={styles.paymentIcon}>💵</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentTitle}>Cash on Delivery</Text>
                            <Text style={styles.paymentSubtitle}>Pay when you receive</Text>
                        </View>
                        <View style={[styles.radio, selectedPayment === 'cash' && styles.radioActive]} />
                    </Pressable>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal (3 items)</Text>
                            <Text style={styles.summaryValue}>₹{cartTotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Notes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Delivery Notes (Optional)</Text>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Add any special instructions..."
                        placeholderTextColor="#9CA3AF"
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <View style={styles.totalRow}>
                    <Text style={styles.bottomTotalLabel}>Total</Text>
                    <Text style={styles.bottomTotalValue}>₹{total.toFixed(2)}</Text>
                </View>
                <Pressable
                    style={styles.placeOrderButton}
                    onPress={() => navigation.navigate('OrderConfirmation' as never)}
                >
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: scaleFont(24),
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    changeText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#16A34A',
    },
    addressCard: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    addressIcon: {
        fontSize: scaleFont(24),
    },
    addressInfo: {
        flex: 1,
    },
    addressName: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    addressText: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: 2,
    },
    timeOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    timeOption: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    timeOptionActive: {
        backgroundColor: '#DCFCE7',
        borderColor: '#16A34A',
    },
    timeOptionIcon: {
        fontSize: scaleFont(32),
        marginBottom: 8,
    },
    timeOptionTitle: {
        fontSize: scaleFont(15),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    timeOptionSubtitle: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    paymentOptionActive: {
        backgroundColor: '#DCFCE7',
        borderColor: '#16A34A',
    },
    paymentIcon: {
        fontSize: scaleFont(28),
        marginRight: 12,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    paymentSubtitle: {
        fontSize: scaleFont(13),
        color: '#6B7280',
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    radioActive: {
        borderColor: '#16A34A',
        backgroundColor: '#16A34A',
    },
    summaryCard: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
    },
    totalValue: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    notesInput: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: scaleFont(14),
        color: '#111827',
        height: 80,
        textAlignVertical: 'top',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    bottomTotalLabel: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
    },
    bottomTotalValue: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    placeOrderButton: {
        backgroundColor: '#166534',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
