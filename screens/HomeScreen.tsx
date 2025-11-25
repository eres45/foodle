import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import Sidebar from '../components/Sidebar';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function HomeScreen() {
    const navigation = useNavigation<any>();
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const categories = ['All', 'Veggies', 'Fruits', 'Dairy'];

    const recentProducts = [
        { id: 1, name: 'Fresh Local Vine Tomatoes (5kg)', price: 12.80, unit: '1kg', image: '🍅' },
        { id: 2, name: '2kg Fresh Yukon Gold Potatoes', price: 34.53, unit: '2kg', image: '🥔' },
        { id: 3, name: 'Organic Carrots Bundle', price: 8.50, unit: '1kg', image: '🥕' },
        { id: 4, name: 'Sweet Corn (Fresh Picked)', price: 5.00, unit: '4pcs', image: '🌽' },
        { id: 5, name: 'Fresh Strawberries', price: 15.00, unit: '500g', image: '🍓' },
        { id: 6, name: 'Crisp Green Apples', price: 10.00, unit: '1kg', image: '🍎' },
        { id: 7, name: 'Farm Fresh Eggs', price: 6.50, unit: '12pcs', image: '🥚' },
        { id: 8, name: 'Ripe Bananas', price: 3.50, unit: '1kg', image: '🍌' },
    ];

    const farmers = [
        { id: 1, name: 'D. Anasta', rating: 4.9, image: '👨‍🌾' },
        { id: 2, name: 'M. Orhard', rating: 4.7, image: '👩‍🌾' },
        { id: 3, name: 'S. Medow', rating: 4.3, image: '👨‍🌾' },
        { id: 4, name: 'F. Aceret', rating: 4.2, image: '👩‍🌾' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.headerLeft}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <View style={styles.profilePic}>
                            <Text style={styles.profileEmoji}>👤</Text>
                        </View>
                        <View>
                            <Text style={styles.userName}>Robert Martiz</Text>
                            <View style={styles.locationRow}>
                                <Text style={styles.locationIcon}>📍</Text>
                                <Text style={styles.locationText}>Los Angeles</Text>
                            </View>
                        </View>
                    </Pressable>
                    <View style={styles.headerRight}>
                        <Pressable style={styles.iconButton}>
                            <Text style={styles.icon}>🔍</Text>
                        </Pressable>
                        <Pressable
                            style={styles.iconButton}
                            onPress={() => setSidebarVisible(true)}
                        >
                            <Text style={styles.icon}>☰</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shop By Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                        {categories.map((category) => (
                            <Pressable
                                key={category}
                                onPress={() => setSelectedCategory(category)}
                                style={[
                                    styles.categoryPill,
                                    selectedCategory === category && styles.categoryPillSelected
                                ]}
                            >
                                <Text style={styles.categoryIcon}>
                                    {category === 'Veggies' ? '🥬' : category === 'Fruits' ? '🍎' : category === 'Dairy' ? '🥛' : '🍽️'}
                                </Text>
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category && styles.categoryTextSelected
                                    ]}
                                >
                                    {category}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                {/* Recently Listed */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recently Listed</Text>
                        <Text style={styles.viewAllText}>View all</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
                        {recentProducts.map((product) => (
                            <Pressable
                                key={product.id}
                                style={styles.productCard}
                                onPress={() => navigation.navigate('ProductDetail')}
                            >
                                <View style={styles.productImageContainer}>
                                    <Text style={styles.productImage}>{product.image}</Text>
                                </View>
                                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                                <View style={styles.productFooter}>
                                    <Text style={styles.productPrice}>₹{product.price.toFixed(2)}/{product.unit}</Text>
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
                    </ScrollView>
                </View>

                {/* Best Farmers */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Farmers</Text>
                        <Text style={styles.viewAllText}>View all</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.farmersScroll}>
                        {farmers.map((farmer) => (
                            <Pressable
                                key={farmer.id}
                                style={styles.farmerCard}
                                onPress={() => navigation.navigate('FarmerProfile', {
                                    farmerName: farmer.name,
                                    farmerImage: farmer.image,
                                    rating: farmer.rating
                                })}
                            >
                                <View style={styles.farmerImageContainer}>
                                    <Text style={styles.farmerImage}>{farmer.image}</Text>
                                </View>
                                <Text style={styles.farmerName}>{farmer.name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.star}>⭐</Text>
                                    <Text style={styles.rating}>{farmer.rating}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <Pressable style={styles.navItem}>
                    <Text style={styles.navIconActive}>🏠</Text>
                    <Text style={styles.navTextActive}>Home</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Explore')}
                >
                    <Text style={styles.navIcon}>🔍</Text>
                    <Text style={styles.navText}>Explore</Text>
                </Pressable>
                <Pressable style={styles.navAddButton}>
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

            {/* Sidebar */}
            <Sidebar visible={sidebarVisible} onClose={() => setSidebarVisible(false)} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileEmoji: {
        fontSize: scaleFont(24),
    },
    userName: {
        fontSize: scaleFont(16),
        fontWeight: '600',
        color: '#111827',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationIcon: {
        fontSize: scaleFont(12),
    },
    locationText: {
        fontSize: scaleFont(13),
        color: '#6B7280',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: scaleFont(20),
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewAllText: {
        fontSize: scaleFont(14),
        color: '#16A34A',
        fontWeight: '600',
    },
    categoriesScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        marginRight: 12,
        gap: 8,
    },
    categoryPillSelected: {
        backgroundColor: '#166534',
    },
    categoryIcon: {
        fontSize: scaleFont(18),
    },
    categoryText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#374151',
    },
    categoryTextSelected: {
        color: '#FFFFFF',
    },
    productsScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    productCard: {
        width: 160,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        marginRight: 16,
    },
    productImageContainer: {
        width: '100%',
        height: 120,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    productImage: {
        fontSize: scaleFont(48),
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
        alignItems: 'center',
    },
    productPrice: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#111827',
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
    farmersScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    farmerCard: {
        width: 80,
        alignItems: 'center',
        marginRight: 16,
    },
    farmerImageContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    farmerImage: {
        fontSize: scaleFont(32),
    },
    farmerName: {
        fontSize: scaleFont(13),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    star: {
        fontSize: scaleFont(12),
    },
    rating: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#111827',
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
