import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function CartScreen() {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Fresh Local Vine Tomatoes', price: 12.80, quantity: 2, unit: '1kg', image: '🍅' },
        { id: 2, name: 'Organic Carrots', price: 8.50, quantity: 1, unit: '1kg', image: '🥕' },
        { id: 3, name: 'Sweet Corn', price: 5.00, quantity: 3, unit: '4pcs', image: '🌽' },
    ]);

    const updateQuantity = (id: number, change: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5.00;
    const total = subtotal + deliveryFee;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>My Cart</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {cartItems.length === 0 ? (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartIcon}>🛒</Text>
                        <Text style={styles.emptyCartText}>Your cart is empty</Text>
                        <Text style={styles.emptyCartSubtext}>Add some fresh products to get started!</Text>
                        <Pressable
                            style={styles.shopButton}
                            onPress={() => navigation.navigate('Explore' as never)}
                        >
                            <Text style={styles.shopButtonText}>Start Shopping</Text>
                        </Pressable>
                    </View>
                ) : (
                    <>
                        {/* Cart Items */}
                        <View style={styles.itemsSection}>
                            {cartItems.map((item) => (
                                <View key={item.id} style={styles.cartItem}>
                                    <View style={styles.itemImage}>
                                        <Text style={styles.itemEmoji}>{item.image}</Text>
                                    </View>
                                    <View style={styles.itemDetails}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}/{item.unit}</Text>
                                    </View>
                                    <View style={styles.itemActions}>
                                        <View style={styles.quantityControl}>
                                            <Pressable
                                                onPress={() => updateQuantity(item.id, -1)}
                                                style={styles.quantityButton}
                                            >
                                                <Text style={styles.quantityButtonText}>−</Text>
                                            </Pressable>
                                            <Text style={styles.quantityText}>{item.quantity}</Text>
                                            <Pressable
                                                onPress={() => updateQuantity(item.id, 1)}
                                                style={styles.quantityButton}
                                            >
                                                <Text style={styles.quantityButtonText}>+</Text>
                                            </Pressable>
                                        </View>
                                        <Pressable
                                            onPress={() => removeItem(item.id)}
                                            style={styles.removeButton}
                                        >
                                            <Text style={styles.removeButtonText}>🗑️</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Summary */}
                        <View style={styles.summarySection}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
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

                        <View style={{ height: 120 }} />
                    </>
                )}
            </ScrollView>

            {/* Checkout Button */}
            {cartItems.length > 0 && (
                <View style={styles.bottomSection}>
                    <Pressable
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('Checkout' as never)}
                    >
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                        <Text style={styles.checkoutButtonPrice}>₹{total.toFixed(2)}</Text>
                    </Pressable>
                </View>
            )}
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
    emptyCart: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyCartIcon: {
        fontSize: scaleFont(80),
        marginBottom: 20,
    },
    emptyCartText: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    emptyCartSubtext: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: 24,
    },
    shopButton: {
        backgroundColor: '#166534',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    shopButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    itemsSection: {
        padding: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        gap: 12,
    },
    itemImage: {
        width: 70,
        height: 70,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemEmoji: {
        fontSize: scaleFont(36),
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: scaleFont(14),
        color: '#16A34A',
        fontWeight: 'bold',
    },
    itemActions: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        padding: 4,
        gap: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
    },
    quantityButtonText: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
    },
    quantityText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        padding: 4,
    },
    removeButtonText: {
        fontSize: scaleFont(20),
    },
    summarySection: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 12,
        padding: 20,
    },
    summaryTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
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
        marginVertical: 12,
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
    bottomSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    checkoutButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#166534',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    checkoutButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    checkoutButtonPrice: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
