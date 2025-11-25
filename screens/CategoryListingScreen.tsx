import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function CategoryListingScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { categoryName = 'Vegetables', categoryIcon = '🥬' } = route.params || {};
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [selectedFilter, setSelectedFilter] = useState('All');

    const filters = ['All', 'Organic', 'Local', 'Fresh'];

    const products = [
        { id: 1, name: 'Fresh Local Vine Tomatoes', price: 12.80, unit: '1kg', image: '🍅', organic: true },
        { id: 2, name: 'Organic Carrots', price: 8.50, unit: '1kg', image: '🥕', organic: true },
        { id: 3, name: 'Sweet Corn', price: 5.00, unit: '4pcs', image: '🌽', organic: false },
        { id: 4, name: 'Fresh Broccoli', price: 7.20, unit: '500g', image: '🥦', organic: true },
        { id: 5, name: 'Bell Peppers Mix', price: 10.50, unit: '500g', image: '🫑', organic: false },
        { id: 6, name: 'Fresh Lettuce', price: 4.50, unit: '1pc', image: '🥬', organic: true },
        { id: 7, name: 'Organic Spinach', price: 6.00, unit: '500g', image: '🥬', organic: true },
        { id: 8, name: 'Cherry Tomatoes', price: 9.50, unit: '500g', image: '🍅', organic: false },
        { id: 9, name: 'Fresh Cucumbers', price: 4.00, unit: '500g', image: '🥒', organic: false },
        { id: 10, name: 'Red Onions', price: 3.50, unit: '1kg', image: '🧅', organic: false },
        { id: 11, name: 'Fresh Mushrooms', price: 12.00, unit: '500g', image: '🍄', organic: true },
        { id: 12, name: 'Green Beans', price: 7.50, unit: '500g', image: '🫘', organic: true },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <View style={styles.headerCenter}>
                    <Text style={styles.categoryIcon}>{categoryIcon}</Text>
                    <Text style={styles.headerTitle}>{categoryName}</Text>
                </View>
                <Pressable style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
                    <Text style={styles.cartIcon}>🛒</Text>
                </Pressable>
            </View>

            {/* Filters */}
            <View style={styles.filtersSection}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
                    {filters.map((filter) => (
                        <Pressable
                            key={filter}
                            onPress={() => setSelectedFilter(filter)}
                            style={[
                                styles.filterPill,
                                selectedFilter === filter && styles.filterPillSelected
                            ]}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    selectedFilter === filter && styles.filterTextSelected
                                ]}
                            >
                                {filter}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
                <Text style={styles.resultCount}>{products.length} items</Text>
            </View>

            {/* Products Grid */}
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.productsGrid}>
                    {products.map((product) => (
                        <Pressable
                            key={product.id}
                            style={styles.productCard}
                            onPress={() => navigation.navigate('ProductDetail')}
                        >
                            <View style={styles.productImageContainer}>
                                <Text style={styles.productImage}>{product.image}</Text>
                                {product.organic && (
                                    <View style={styles.organicBadge}>
                                        <Text style={styles.organicText}>🌿</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                            <View style={styles.productFooter}>
                                <View>
                                    <Text style={styles.productPrice}>₹{product.price.toFixed(2)}</Text>
                                    <Text style={styles.productUnit}>per {product.unit}</Text>
                                </View>
                                <Pressable
                                    style={styles.addButton}
                                    onPress={() => {
                                        addToCart(product);
                                        showToast('Added to cart!', 'success');
                                    }}
                                >
                                    <Text style={styles.addButtonText}>+</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </View>
                <View style={{ height: 20 }} />
            </ScrollView>
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
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    categoryIcon: {
        fontSize: scaleFont(24),
    },
    headerTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
    },
    cartButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartIcon: {
        fontSize: scaleFont(24),
    },
    filtersSection: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    filtersScroll: {
        marginBottom: 12,
    },
    filterPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
    },
    filterPillSelected: {
        backgroundColor: '#166534',
    },
    filterText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#6B7280',
    },
    filterTextSelected: {
        color: '#FFFFFF',
    },
    resultCount: {
        fontSize: scaleFont(13),
        color: '#6B7280',
    },
    scrollView: {
        flex: 1,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 12,
    },
    productCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
    },
    productImageContainer: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        position: 'relative',
    },
    productImage: {
        fontSize: scaleFont(48),
    },
    organicBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 4,
    },
    organicText: {
        fontSize: scaleFont(14),
    },
    productName: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
        height: 40,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    productPrice: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    productUnit: {
        fontSize: scaleFont(11),
        color: '#9CA3AF',
    },
    addButton: {
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: '#166534',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: scaleFont(20),
        fontWeight: 'bold',
    },
});
