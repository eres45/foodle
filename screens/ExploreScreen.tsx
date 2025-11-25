import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ExploreScreen() {
    const navigation = useNavigation<any>();
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const recommendedItems = [
        { id: 1, name: 'Organic Carrots', price: 8.50, unit: '1kg', image: '🥕', category: 'Veggies' },
        { id: 2, name: 'Fresh Strawberries', price: 15.00, unit: '500g', image: '🍓', category: 'Fruits' },
        { id: 3, name: 'Farm Eggs', price: 6.50, unit: '12pcs', image: '🥚', category: 'Dairy' },
        { id: 4, name: 'Sweet Corn', price: 5.00, unit: '4pcs', image: '🌽', category: 'Veggies' },
        { id: 5, name: 'Fresh Tomatoes', price: 12.80, unit: '1kg', image: '🍅', category: 'Veggies' },
        { id: 6, name: 'Apples', price: 10.00, unit: '1kg', image: '🍎', category: 'Fruits' },
        { id: 7, name: 'Fresh Milk', price: 4.50, unit: '1L', image: '🥛', category: 'Dairy' },
        { id: 8, name: 'Bananas', price: 3.50, unit: '1kg', image: '🍌', category: 'Fruits' },
    ];

    // Filter products based on search query
    const filteredProducts = searchQuery.trim()
        ? recommendedItems.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : recommendedItems;

    const categories = [
        { id: 1, name: 'Vegetables', icon: '🥬', color: '#DCFCE7', count: 45 },
        { id: 2, name: 'Fruits', icon: '🍎', color: '#FEE2E2', count: 38 },
        { id: 3, name: 'Dairy', icon: '🥛', color: '#DBEAFE', count: 22 },
        { id: 4, name: 'Grains', icon: '🌾', color: '#FEF3C7', count: 18 },
        { id: 5, name: 'Herbs', icon: '🌿', color: '#D1FAE5', count: 15 },
        { id: 6, name: 'Meat', icon: '🥩', color: '#FCE7F3', count: 12 },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Explore</Text>
                    <Text style={styles.headerSubtitle}>Discover fresh products from local farms</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for products, farmers..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <Pressable onPress={() => setSearchQuery('')}>
                                <Text style={styles.clearIcon}>✕</Text>
                            </Pressable>
                        )}
                    </View>
                    <Pressable style={styles.filterButton}>
                        <Text style={styles.filterIcon}>⚙️</Text>
                    </Pressable>
                </View>

                {/* Recommended Items / Search Results */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {searchQuery.trim() ? `Search Results (${filteredProducts.length})` : 'Recommended for You'}
                        </Text>
                        {!searchQuery.trim() && <Text style={styles.viewAllText}>View all</Text>}
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.recommendedScroll}
                    >
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.recommendedCard}
                                    onPress={() => navigation.navigate('ProductDetail')}
                                >
                                    <View style={styles.recommendedImageContainer}>
                                        <Text style={styles.recommendedImage}>{item.image}</Text>
                                    </View>
                                    <View style={styles.recommendedInfo}>
                                        <Text style={styles.recommendedName}>{item.name}</Text>
                                        <Text style={styles.recommendedPrice}>₹{item.price.toFixed(2)}/{item.unit}</Text>
                                    </View>
                                    <Pressable
                                        style={styles.addButtonSmall}
                                        onPress={(e) => {
                                            e.stopPropagation();
                                            addToCart(item);
                                            showToast('Added to cart!', 'success');
                                        }}
                                    >
                                        <Text style={styles.addButtonText}>+</Text>
                                    </Pressable>
                                </Pressable>
                            ))
                        ) : (
                            <View style={styles.noResults}>
                                <Text style={styles.noResultsIcon}>🔍</Text>
                                <Text style={styles.noResultsText}>No products found</Text>
                                <Text style={styles.noResultsSubtext}>Try searching for something else</Text>
                            </View>
                        )}
                    </ScrollView>
                </View>

                {/* Categories Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shop by Category</Text>
                    <View style={styles.categoryGrid}>
                        {categories.map((category) => (
                            <Pressable
                                key={category.id}
                                style={[styles.categoryCard, { backgroundColor: category.color }]}
                                onPress={() => navigation.navigate('CategoryListing', {
                                    categoryName: category.name,
                                    categoryIcon: category.icon
                                })}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={styles.categoryName}>{category.name}</Text>
                                <Text style={styles.categoryCount}>{category.count} items</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.navIcon}>🏠</Text>
                    <Text style={styles.navText}>Home</Text>
                </Pressable>
                <Pressable style={styles.navItem}>
                    <Text style={styles.navIconActive}>🔍</Text>
                    <Text style={styles.navTextActive}>Explore</Text>
                </Pressable>
                <Pressable
                    style={styles.navAddButton}
                    onPress={() => navigation.navigate('Favorites')}
                >
                    <Text style={styles.navAddIcon}>❤️</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Favorites')}
                >
                    <Text style={styles.navIcon}>⭐</Text>
                    <Text style={styles.navText}>Favorites</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Text style={styles.navIcon}>🛒</Text>
                    <Text style={styles.navText}>Cart</Text>
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
    scrollView: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: scaleFont(28),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    searchSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 12,
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    searchIcon: {
        fontSize: scaleFont(18),
    },
    searchInput: {
        flex: 1,
        fontSize: scaleFont(15),
        color: '#111827',
    },
    clearIcon: {
        fontSize: scaleFont(16),
        color: '#9CA3AF',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#166534',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: scaleFont(20),
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    viewAllText: {
        fontSize: scaleFont(14),
        color: '#16A34A',
        fontWeight: '600',
    },
    recommendedScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    recommendedCard: {
        width: 280,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginRight: 16,
        alignItems: 'center',
        gap: 12,
    },
    recommendedImageContainer: {
        width: 70,
        height: 70,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recommendedImage: {
        fontSize: scaleFont(36),
    },
    recommendedInfo: {
        flex: 1,
    },
    recommendedName: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    recommendedPrice: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    addButtonSmall: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#166534',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: scaleFont(20),
        fontWeight: 'bold',
    },
    noResults: {
        width: 280,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noResultsIcon: {
        fontSize: scaleFont(60),
        marginBottom: 16,
    },
    noResultsText: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    noResultsSubtext: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        textAlign: 'center',
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    categoryCard: {
        width: '48%',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
    },
    categoryIcon: {
        fontSize: scaleFont(48),
        marginBottom: 12,
    },
    categoryName: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    categoryCount: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navIcon: {
        fontSize: scaleFont(22),
    },
    navIconActive: {
        fontSize: scaleFont(22),
    },
    navText: {
        fontSize: scaleFont(11),
        color: '#6B7280',
    },
    navTextActive: {
        fontSize: scaleFont(11),
        color: '#16A34A',
        fontWeight: '600',
    },
    navAddButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#16A34A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -20,
    },
    navAddIcon: {
        fontSize: scaleFont(28),
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
