import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';
import Sidebar from '../components/Sidebar';

export default function FarmerHomeScreen() {
    const navigation = useNavigation();
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const myProducts = [
        { id: 1, name: 'Fresh Tomatoes', stock: 45, price: 12.80, unit: '1kg', image: '🍅', sales: 23 },
        { id: 2, name: 'Organic Carrots', stock: 32, price: 8.50, unit: '1kg', image: '🥕', sales: 18 },
        { id: 3, name: 'Sweet Corn', stock: 28, price: 5.00, unit: '4pcs', image: '🌽', sales: 15 },
    ];

    const recentOrders = [
        { id: 1, customer: 'John D.', items: 3, total: 45.50, status: 'Pending', time: '10 min ago' },
        { id: 2, customer: 'Sarah M.', items: 2, total: 28.00, status: 'Confirmed', time: '1 hour ago' },
        { id: 3, customer: 'Mike R.', items: 5, total: 67.20, status: 'Delivered', time: '3 hours ago' },
    ];

    const stats = [
        { label: 'Today Sales', value: '₹245', icon: '💰', color: '#DCFCE7' },
        { label: 'Orders', value: '12', icon: '📦', color: '#DBEAFE' },
        { label: 'Products', value: '24', icon: '🥬', color: '#FEF3C7' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        style={styles.headerLeft}
                        onPress={() => navigation.navigate('Profile' as never)}
                    >
                        <View style={styles.profilePic}>
                            <Text style={styles.profileEmoji}>👨‍🌾</Text>
                        </View>
                        <View>
                            <Text style={styles.greeting}>Welcome back!</Text>
                            <Text style={styles.userName}>F. Aceret</Text>
                        </View>
                    </Pressable>
                    <Pressable
                        style={styles.notificationButton}
                        onPress={() => setSidebarVisible(true)}
                    >
                        <Text style={styles.notificationIcon}>☰</Text>
                    </Pressable>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsSection}>
                    {stats.map((stat, index) => (
                        <View key={index} style={[styles.statCard, { backgroundColor: stat.color }]}>
                            <Text style={styles.statIcon}>{stat.icon}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        <Pressable style={styles.actionCard}>
                            <Text style={styles.actionIcon}>➕</Text>
                            <Text style={styles.actionText}>Add Product</Text>
                        </Pressable>
                        <Pressable style={styles.actionCard}>
                            <Text style={styles.actionIcon}>📊</Text>
                            <Text style={styles.actionText}>Analytics</Text>
                        </Pressable>
                        <Pressable style={styles.actionCard}>
                            <Text style={styles.actionIcon}>💬</Text>
                            <Text style={styles.actionText}>Messages</Text>
                        </Pressable>
                        <Pressable style={styles.actionCard}>
                            <Text style={styles.actionIcon}>⚙️</Text>
                            <Text style={styles.actionText}>Settings</Text>
                        </Pressable>
                    </View>
                </View>

                {/* My Products */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>My Products</Text>
                        <Text style={styles.viewAllText}>View all</Text>
                    </View>
                    {myProducts.map((product) => (
                        <View key={product.id} style={styles.productRow}>
                            <View style={styles.productImageSmall}>
                                <Text style={styles.productImageText}>{product.image}</Text>
                            </View>
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productDetails}>Stock: {product.stock} • ₹{product.price}/{product.unit}</Text>
                            </View>
                            <View style={styles.productStats}>
                                <Text style={styles.salesCount}>{product.sales} sold</Text>
                                <Pressable style={styles.editButton}>
                                    <Text style={styles.editButtonText}>Edit</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Recent Orders */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Orders</Text>
                        <Text style={styles.viewAllText}>View all</Text>
                    </View>
                    {recentOrders.map((order) => (
                        <View key={order.id} style={styles.orderRow}>
                            <View style={styles.orderInfo}>
                                <Text style={styles.customerName}>{order.customer}</Text>
                                <Text style={styles.orderDetails}>{order.items} items • ₹{order.total.toFixed(2)}</Text>
                                <Text style={styles.orderTime}>{order.time}</Text>
                            </View>
                            <View style={[
                                styles.statusBadge,
                                order.status === 'Pending' && styles.statusPending,
                                order.status === 'Confirmed' && styles.statusConfirmed,
                                order.status === 'Delivered' && styles.statusDelivered,
                            ]}>
                                <Text style={styles.statusText}>{order.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Navigation - Farmer */}
            <View style={styles.bottomNav}>
                <Pressable style={styles.navItem}>
                    <Text style={styles.navIconActive}>🏠</Text>
                    <Text style={styles.navTextActive}>Home</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Explore' as never)}
                >
                    <Text style={styles.navIcon}>🔍</Text>
                    <Text style={styles.navText}>Explore</Text>
                </Pressable>
                <Pressable
                    style={styles.navAddButton}
                    onPress={() => navigation.navigate('AddProduct' as never)}
                >
                    <Text style={styles.navAddIcon}>+</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('FarmerOrders' as never)}
                >
                    <Text style={styles.navIcon}>📦</Text>
                    <Text style={styles.navText}>Orders</Text>
                </Pressable>
                <Pressable
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Cart' as never)}
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
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileEmoji: {
        fontSize: scaleFont(24),
    },
    greeting: {
        fontSize: scaleFont(13),
        color: '#6B7280',
    },
    userName: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
    },
    notificationButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationIcon: {
        fontSize: scaleFont(24),
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#EF4444',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        fontSize: scaleFont(10),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    statsSection: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 12,
    },
    statCard: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    statIcon: {
        fontSize: scaleFont(28),
        marginBottom: 8,
    },
    statValue: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: scaleFont(11),
        color: '#6B7280',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 24,
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
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    actionCard: {
        width: '23%',
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
    },
    actionIcon: {
        fontSize: scaleFont(28),
        marginBottom: 8,
    },
    actionText: {
        fontSize: scaleFont(11),
        fontWeight: '600',
        color: '#111827',
        textAlign: 'center',
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        gap: 12,
    },
    productImageSmall: {
        width: 60,
        height: 60,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productImageText: {
        fontSize: scaleFont(32),
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    productDetails: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    productStats: {
        alignItems: 'flex-end',
    },
    salesCount: {
        fontSize: scaleFont(12),
        color: '#16A34A',
        fontWeight: '600',
        marginBottom: 6,
    },
    editButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#F3F4F6',
        borderRadius: 6,
    },
    editButtonText: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#111827',
    },
    orderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    orderInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    orderDetails: {
        fontSize: scaleFont(13),
        color: '#6B7280',
        marginBottom: 4,
    },
    orderTime: {
        fontSize: scaleFont(11),
        color: '#9CA3AF',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusPending: {
        backgroundColor: '#FEF3C7',
    },
    statusConfirmed: {
        backgroundColor: '#DBEAFE',
    },
    statusDelivered: {
        backgroundColor: '#DCFCE7',
    },
    statusText: {
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
