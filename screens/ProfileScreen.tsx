import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { scaleFont } from '../utils/responsive';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const { userType } = useUser();

    const menuItems = [
        { id: 1, icon: '👤', title: 'Edit Profile', subtitle: 'Update your information' },
        { id: 2, icon: '📍', title: 'Addresses', subtitle: 'Manage delivery addresses' },
        { id: 3, icon: '💳', title: 'Payment Methods', subtitle: 'Manage payment options' },
        { id: 4, icon: '📦', title: 'Order History', subtitle: 'View past orders' },
        { id: 5, icon: '⭐', title: 'Favorites', subtitle: 'Your saved items' },
        { id: 6, icon: '🔔', title: 'Notifications', subtitle: 'Manage notifications' },
        { id: 7, icon: '❓', title: 'Help & Support', subtitle: 'Get help' },
        { id: 8, icon: '⚙️', title: 'Settings', subtitle: 'App preferences' },
    ];

    const farmerMenuItems = [
        { id: 1, icon: '👤', title: 'Edit Profile', subtitle: 'Update your information' },
        { id: 2, icon: '🏪', title: 'My Shop', subtitle: 'Manage your products' },
        { id: 3, icon: '📊', title: 'Analytics', subtitle: 'View sales data' },
        { id: 4, icon: '💰', title: 'Earnings', subtitle: 'Track your income' },
        { id: 5, icon: '📦', title: 'Orders', subtitle: 'Manage customer orders' },
        { id: 6, icon: '🔔', title: 'Notifications', subtitle: 'Manage notifications' },
        { id: 7, icon: '❓', title: 'Help & Support', subtitle: 'Get help' },
        { id: 8, icon: '⚙️', title: 'Settings', subtitle: 'App preferences' },
    ];

    const displayMenuItems = userType === 'farmer' ? farmerMenuItems : menuItems;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatar}>{userType === 'farmer' ? '👨‍🌾' : '👤'}</Text>
                    </View>
                    <Text style={styles.userName}>{userType === 'farmer' ? 'F. Aceret' : 'Robert Martiz'}</Text>
                    <Text style={styles.userEmail}>user@foodle.com</Text>
                    {userType === 'farmer' && (
                        <View style={styles.badgeContainer}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>✓ Verified Farmer</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Stats (for Farmer) */}
                {userType === 'farmer' && (
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>24</Text>
                            <Text style={styles.statLabel}>Products</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>142</Text>
                            <Text style={styles.statLabel}>Orders</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>
                )}

                {/* Menu Items */}
                <View style={styles.menuSection}>
                    {displayMenuItems.map((item) => (
                        <Pressable key={item.id} style={styles.menuItem}>
                            <View style={styles.menuIconContainer}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Logout Button */}
                <View style={styles.logoutSection}>
                    <Pressable style={styles.logoutButton}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </Pressable>
                </View>

                <View style={{ height: 40 }} />
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
    profileCard: {
        backgroundColor: '#FFFFFF',
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        fontSize: scaleFont(50),
    },
    userName: {
        fontSize: scaleFont(24),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: scaleFont(14),
        color: '#6B7280',
        marginBottom: 12,
    },
    badgeContainer: {
        marginTop: 8,
    },
    badge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#166534',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 12,
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: scaleFont(22),
        fontWeight: 'bold',
        color: '#16A34A',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
    },
    menuSection: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    menuIcon: {
        fontSize: scaleFont(20),
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    menuArrow: {
        fontSize: scaleFont(24),
        color: '#9CA3AF',
    },
    logoutSection: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#FEE2E2',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    logoutText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#DC2626',
    },
});
