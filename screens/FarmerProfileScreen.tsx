import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function FarmerProfileScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { farmerName = 'F. Aceret', farmerImage = '👨‍🌾', rating = 4.2 } = route.params || {};
    const { addToCart } = useCart();
    const { showToast } = useToast();

    const [selectedTab, setSelectedTab] = useState('Products');

    const tabs = ['Products', 'About', 'Gallery'];

    const products = [
        { id: 1, name: 'Fresh Tomatoes', price: 12.80, unit: '1kg', image: '🍅' },
        { id: 2, name: 'Organic Carrots', price: 8.50, unit: '1kg', image: '🥕' },
        { id: 3, name: 'Sweet Corn', price: 5.00, unit: '4pcs', image: '🌽' },
        { id: 4, name: 'Fresh Lettuce', price: 4.50, unit: '1pc', image: '🥬' },
        { id: 5, name: 'Bell Peppers', price: 10.50, unit: '500g', image: '🫑' },
        { id: 6, name: 'Fresh Broccoli', price: 7.20, unit: '500g', image: '🥦' },
        { id: 7, name: 'Cherry Tomatoes', price: 9.50, unit: '500g', image: '🍅' },
        { id: 8, name: 'Fresh Cucumbers', price: 4.00, unit: '500g', image: '🥒' },
    ];

    const galleryItems = ['🌾', '🚜', '🌱', '🥕', '🍅', '🌽'];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Farmer Profile</Text>
                <Pressable style={styles.shareButton}>
                    <Text style={styles.shareIcon}>↗️</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Farmer Info Card */}
                <View style={styles.farmerCard}>
                    <View style={styles.farmerHeader}>
                        <View style={styles.farmerAvatar}>
                            <Text style={styles.farmerAvatarText}>{farmerImage}</Text>
                        </View>
                        <View style={styles.farmerInfo}>
                            <Text style={styles.farmerName}>{farmerName}</Text>
                            <View style={styles.ratingRow}>
                                <Text style={styles.star}>⭐</Text>
                                <Text style={styles.rating}>{rating}</Text>
                                <Text style={styles.ratingCount}>(142 reviews)</Text>
                            </View>
                            <View style={styles.statsRow}>
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>24</Text>
                                    <Text style={styles.statLabel}>Products</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>5+</Text>
                                    <Text style={styles.statLabel}>Years</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.stat}>
                                    <Text style={styles.statValue}>850+</Text>
                                    <Text style={styles.statLabel}>Customers</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.actionButtons}>
                        <Pressable style={styles.followButton}>
                            <Text style={styles.followButtonText}>Follow</Text>
                        </Pressable>
                        <Pressable style={styles.messageButton}>
                            <Text style={styles.messageButtonText}>Message</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {tabs.map((tab) => (
                        <Pressable
                            key={tab}
                            onPress={() => setSelectedTab(tab)}
                            style={[
                                styles.tab,
                                selectedTab === tab && styles.tabActive
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    selectedTab === tab && styles.tabTextActive
                                ]}
                            >
                                {tab}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Tab Content */}
                <View style={styles.tabContent}>
                    {selectedTab === 'Products' && (
                        <View style={styles.productsGrid}>
                            {products.map((product) => (
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
                        </View>
                    )}

                    {selectedTab === 'About' && (
                        <View style={styles.aboutSection}>
                            <Text style={styles.aboutTitle}>About the Farm</Text>
                            <Text style={styles.aboutText}>
                                Welcome to our family-owned farm! For over 5 years, we've been dedicated to growing the freshest, highest-quality produce using sustainable and organic farming practices.
                                {'\n\n'}
                                Our farm is located in the heart of the countryside, where we cultivate a wide variety of vegetables and fruits. We believe in working with nature, not against it, to bring you the best produce possible.
                                {'\n\n'}
                                Every product is hand-picked at peak ripeness to ensure maximum flavor and nutritional value. We take pride in our work and are committed to providing our community with healthy, delicious food.
                            </Text>

                            <Text style={styles.aboutTitle}>Certifications</Text>
                            <View style={styles.certificationsRow}>
                                <View style={styles.certBadge}>
                                    <Text style={styles.certEmoji}>🌿</Text>
                                    <Text style={styles.certText}>Organic</Text>
                                </View>
                                <View style={styles.certBadge}>
                                    <Text style={styles.certEmoji}>🏆</Text>
                                    <Text style={styles.certText}>Quality</Text>
                                </View>
                                <View style={styles.certBadge}>
                                    <Text style={styles.certEmoji}>✅</Text>
                                    <Text style={styles.certText}>Verified</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    {selectedTab === 'Gallery' && (
                        <View style={styles.galleryGrid}>
                            {galleryItems.map((item, index) => (
                                <View key={index} style={styles.galleryItem}>
                                    <Text style={styles.galleryEmoji}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    )}
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
    headerTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
    },
    shareButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareIcon: {
        fontSize: scaleFont(20),
    },
    scrollView: {
        flex: 1,
    },
    farmerCard: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    farmerHeader: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 20,
    },
    farmerAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    farmerAvatarText: {
        fontSize: scaleFont(40),
    },
    farmerInfo: {
        flex: 1,
    },
    farmerName: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 12,
    },
    star: {
        fontSize: scaleFont(14),
    },
    rating: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#111827',
    },
    ratingCount: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
    },
    statLabel: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    statDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#E5E7EB',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    followButton: {
        flex: 1,
        backgroundColor: '#166534',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    followButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: scaleFont(16),
    },
    messageButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    messageButtonText: {
        color: '#111827',
        fontWeight: 'bold',
        fontSize: scaleFont(16),
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 12,
        marginRight: 24,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#166534',
    },
    tabText: {
        fontSize: scaleFont(16),
        color: '#6B7280',
        fontWeight: '600',
    },
    tabTextActive: {
        color: '#166534',
    },
    tabContent: {
        paddingHorizontal: 20,
    },
    productsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        alignItems: 'flex-end',
    },
    productPrice: {
        fontSize: scaleFont(14),
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
    aboutSection: {
        paddingVertical: 8,
    },
    aboutTitle: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
        marginTop: 12,
    },
    aboutText: {
        fontSize: scaleFont(14),
        color: '#4B5563',
        lineHeight: 24,
    },
    certificationsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    certBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    certEmoji: {
        fontSize: scaleFont(16),
    },
    certText: {
        fontSize: scaleFont(12),
        color: '#166534',
        fontWeight: '600',
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    galleryItem: {
        width: '31%',
        aspectRatio: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    galleryEmoji: {
        fontSize: scaleFont(40),
    },
});
