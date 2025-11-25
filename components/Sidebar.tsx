import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import { scaleFont } from '../utils/responsive';

interface SidebarProps {
    visible: boolean;
    onClose: () => void;
}

export default function Sidebar({ visible, onClose }: SidebarProps) {
    const navigation = useNavigation();
    const { userType } = useUser();

    const foodieMenuItems = [
        { id: 1, icon: '🏠', title: 'Home', route: 'Home' },
        { id: 2, icon: '🔍', title: 'Explore', route: 'Explore' },
        { id: 3, icon: '⭐', title: 'Favorites', route: 'Favorites' },
        { id: 4, icon: '🛒', title: 'Cart', route: 'Cart' },
        { id: 5, icon: '👤', title: 'Profile', route: 'Profile' },
        { id: 6, icon: '📦', title: 'My Orders', route: 'Orders' },
        { id: 7, icon: '❓', title: 'Help & Support', route: null },
        { id: 8, icon: '⚙️', title: 'Settings', route: null },
    ];

    const farmerMenuItems = [
        { id: 1, icon: '🏠', title: 'Home', route: 'Home' },
        { id: 2, icon: '🔍', title: 'Explore', route: 'Explore' },
        { id: 3, icon: '🏪', title: 'My Shop', route: null },
        { id: 4, icon: '📦', title: 'Orders', route: 'FarmerOrders' },
        { id: 5, icon: '📊', title: 'Analytics', route: null },
        { id: 6, icon: '💰', title: 'Earnings', route: null },
        { id: 7, icon: '🛒', title: 'Cart', route: 'Cart' },
        { id: 8, icon: '👤', title: 'Profile', route: 'Profile' },
        { id: 9, icon: '❓', title: 'Help & Support', route: null },
        { id: 10, icon: '⚙️', title: 'Settings', route: null },
    ];

    const menuItems = userType === 'farmer' ? farmerMenuItems : foodieMenuItems;

    const handleNavigate = (route: string | null) => {
        if (route) {
            navigation.navigate(route as never);
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.sidebar} onPress={(e) => e.stopPropagation()}>
                    <SafeAreaView style={styles.safeArea}>
                        {/* Header */}
                        <View style={styles.header}>
                            <View style={styles.profileSection}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>
                                        {userType === 'farmer' ? '👨‍🌾' : '👤'}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.userName}>
                                        {userType === 'farmer' ? 'F. Aceret' : 'Robert Martiz'}
                                    </Text>
                                    <Text style={styles.userType}>
                                        {userType === 'farmer' ? 'Farmer' : 'Foodie'}
                                    </Text>
                                </View>
                            </View>
                            <Pressable onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeIcon}>✕</Text>
                            </Pressable>
                        </View>

                        {/* Menu Items */}
                        <View style={styles.menuSection}>
                            {menuItems.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.menuItem}
                                    onPress={() => handleNavigate(item.route)}
                                >
                                    <Text style={styles.menuIcon}>{item.icon}</Text>
                                    <Text style={styles.menuTitle}>{item.title}</Text>
                                </Pressable>
                            ))}
                        </View>

                        {/* Logout */}
                        <View style={styles.footer}>
                            <Pressable style={styles.logoutButton}>
                                <Text style={styles.logoutIcon}>🚪</Text>
                                <Text style={styles.logoutText}>Logout</Text>
                            </Pressable>
                        </View>
                    </SafeAreaView>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
    },
    sidebar: {
        width: '80%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#DCFCE7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: scaleFont(24),
    },
    userName: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
    },
    userType: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    closeButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        fontSize: scaleFont(20),
        color: '#6B7280',
    },
    menuSection: {
        flex: 1,
        paddingTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 16,
    },
    menuIcon: {
        fontSize: scaleFont(22),
    },
    menuTitle: {
        fontSize: scaleFont(16),
        color: '#111827',
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    logoutIcon: {
        fontSize: scaleFont(18),
    },
    logoutText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#DC2626',
    },
});
