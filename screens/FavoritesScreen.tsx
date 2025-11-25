import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function FavoritesScreen() {
    const navigation = useNavigation<any>();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [favorites, setFavorites] = useState([
        { id: 1, name: 'Fresh Local Vine Tomatoes', price: 12.80, unit: '1kg', image: '🍅', farmer: 'F. Aceret' },
        { id: 2, name: 'Organic Carrots', price: 8.50, unit: '1kg', image: '🥕', farmer: 'John Farm' },
        { id: 3, name: 'Fresh Strawberries', price: 15.00, unit: '500g', image: '🍓', farmer: 'Berry Fields' },
        { id: 4, name: 'Sweet Corn', price: 5.00, unit: '4pcs', image: '🌽', farmer: 'F. Aceret' },
        { id: 5, name: 'Crisp Green Apples', price: 10.00, unit: '1kg', image: '🍎', farmer: 'Orchard Co.' },
        { id: 6, name: 'Farm Fresh Eggs', price: 6.50, unit: '12pcs', image: '🥚', farmer: 'Happy Hens' },
        { id: 7, name: 'Fresh Broccoli', price: 7.20, unit: '500g', image: '🥦', farmer: 'Green Valley' },
        { id: 8, name: 'Ripe Bananas', price: 3.50, unit: '1kg', image: '🍌', farmer: 'Tropical Farm' },
    ]);

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(item => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>My Favorites</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {favorites.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>⭐</Text>
                        <Text style={styles.emptyText}>No favorites yet</Text>
                        <Text style={styles.emptySubtext}>Start adding products you love!</Text>
                        <Pressable
                            style={styles.exploreButton}
                            onPress={() => navigation.navigate('Explore')}
                        >
                            <Text style={styles.exploreButtonText}>Explore Products</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View style={styles.favoritesGrid}>
                        {favorites.map((item) => (
                            <View key={item.id} style={styles.favoriteCard}>
                                <Pressable
                                    style={styles.removeButton}
                                    onPress={() => removeFavorite(item.id)}
                                >
                                    <Text style={styles.removeIcon}>❤️</Text>
                                </Pressable>
                                <Pressable
                                    style={styles.cardContent}
                                    onPress={() => navigation.navigate('ProductDetail')}
                                >
                                    <View style={styles.imageContainer}>
                                        <Text style={styles.productImage}>{item.image}</Text>
                                    </View>
                                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                                    <Text style={styles.farmerName}>by {item.farmer}</Text>
                                    <View style={styles.priceRow}>
                                        <Text style={styles.productPrice}>₹{item.price.toFixed(2)}</Text>
                                        <Pressable
                                            style={styles.addButton}
                                            onPress={() => {
                                                addToCart(item);
                                                showToast('Added to cart!', 'success');
                                            }}
                                        >
                                            <Text style={styles.addButtonText}>+</Text>
                                        </Pressable>
                                    </View>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                )}
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
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyIcon: {
        fontSize: scaleFont(80),
        marginBottom: 20,
    },
    emptyText: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: 24,
    },
    exploreButton: {
        backgroundColor: '#166534',
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    exploreButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    favoritesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 12,
    },
    favoriteCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        position: 'relative',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    removeIcon: {
        fontSize: scaleFont(18),
    },
    cardContent: {
        width: '100%',
    },
    imageContainer: {
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
        marginBottom: 4,
        height: 40,
    },
    farmerName: {
        fontSize: scaleFont(11),
        color: '#6B7280',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#16A34A',
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
