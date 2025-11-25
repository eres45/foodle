import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import QuoteRequestModal from '../components/QuoteRequestModal';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductDetailScreen() {
    const navigation = useNavigation();
    const [selectedQuantity, setSelectedQuantity] = useState('1kg');
    const [quoteModalVisible, setQuoteModalVisible] = useState(false);
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const quantities = ['500g', '1kg', '1.5kg', '2kg', '2.5kg', '3.5kg'];

    const product = {
        id: 1,
        name: '5kg Lately Harvested Local Vine Tomatoes',
        price: 12.80,
        unit: '1kg',
        image: '🍅',
        farmer: 'F. Aceret'
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.headerButton}>
                    <Text style={styles.headerIcon}>←</Text>
                </Pressable>
                <Pressable style={styles.headerButton}>
                    <Text style={styles.headerIcon}>🔖</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.imageSection}>
                    <View style={styles.imageContainer}>
                        <Text style={styles.productEmoji}>🍅</Text>
                    </View>
                    {/* Image Indicators */}
                    <View style={styles.imageIndicators}>
                        <View style={[styles.indicator, styles.indicatorActive]} />
                        <View style={styles.indicator} />
                        <View style={styles.indicator} />
                    </View>
                </View>

                {/* Product Info */}
                <View style={styles.contentSection}>
                    <Text style={styles.productTitle}>{product.name}</Text>

                    {/* Farmer Info */}
                    <View style={styles.farmerInfo}>
                        <View style={styles.farmerLeft}>
                            <View style={styles.farmerAvatar}>
                                <Text style={styles.farmerEmoji}>👨‍🌾</Text>
                            </View>
                            <View>
                                <Text style={styles.farmerName}>{product.farmer}</Text>
                                <View style={styles.ratingRow}>
                                    <Text style={styles.star}>⭐</Text>
                                    <Text style={styles.rating}>4.2</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.price}>₹{product.price.toFixed(2)}/{product.unit}</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.description}>
                            Grown with care by our dedicated farmers, these tomatoes are plucked at their prime for unrivaled freshness and flavor...{' '}
                            <Text style={styles.readMore}>Read more</Text>
                        </Text>
                    </View>

                    {/* Quantity Selector */}
                    <View style={styles.quantitySection}>
                        <View style={styles.quantityHeader}>
                            <Text style={styles.quantityTitle}>Select Quantity</Text>
                            <Text style={styles.customizeText}>Customize</Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.quantityScroll}
                        >
                            {quantities.map((qty) => (
                                <Pressable
                                    key={qty}
                                    onPress={() => setSelectedQuantity(qty)}
                                    style={[
                                        styles.quantityButton,
                                        selectedQuantity === qty && styles.quantityButtonSelected
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.quantityText,
                                            selectedQuantity === qty && styles.quantityTextSelected
                                        ]}
                                    >
                                        {qty}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomSection}>
                <Pressable
                    style={styles.quoteButton}
                    onPress={() => setQuoteModalVisible(true)}
                >
                    <Text style={styles.quoteButtonText}>💬 Request Quote</Text>
                </Pressable>
                <Pressable
                    style={styles.addToCartButton}
                    onPress={() => {
                        addToCart({ ...product, quantity: 1 });
                        showToast('Added to cart!', 'success');
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.addToCartText}>Add to cart</Text>
                    <View style={styles.divider} />
                    <Text style={styles.addToCartPrice}>₹{product.price.toFixed(2)}</Text>
                </Pressable>
            </View>

            {/* Quote Request Modal */}
            <QuoteRequestModal
                visible={quoteModalVisible}
                onClose={() => setQuoteModalVisible(false)}
                productName={product.name}
                currentPrice={product.price}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        fontSize: 24,
    },
    imageSection: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    imageContainer: {
        width: 280,
        height: 280,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    productEmoji: {
        fontSize: 120,
    },
    imageIndicators: {
        flexDirection: 'row',
        gap: 8,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D1D5DB',
    },
    indicatorActive: {
        backgroundColor: '#16A34A',
        width: 24,
    },
    contentSection: {
        paddingHorizontal: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
        lineHeight: 32,
    },
    farmerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    farmerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    farmerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    farmerEmoji: {
        fontSize: 24,
    },
    farmerName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    star: {
        fontSize: 12,
    },
    rating: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111827',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    descriptionSection: {
        marginBottom: 24,
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 22,
    },
    readMore: {
        color: '#16A34A',
        fontWeight: '600',
    },
    quantitySection: {
        marginBottom: 20,
    },
    quantityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    quantityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    customizeText: {
        fontSize: 14,
        color: '#16A34A',
        fontWeight: '600',
    },
    quantityScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    quantityButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 12,
    },
    quantityButtonSelected: {
        backgroundColor: '#111827',
    },
    quantityText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6B7280',
    },
    quantityTextSelected: {
        color: '#FFFFFF',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        gap: 12,
    },
    quoteButton: {
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#166534',
    },
    quoteButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#166534',
    },
    addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#166534',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 12,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    divider: {
        width: 1,
        height: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    addToCartPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
