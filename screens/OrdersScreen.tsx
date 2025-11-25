import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function OrdersScreen() {
    const navigation = useNavigation();
    const [selectedTab, setSelectedTab] = useState('Active');

    const tabs = ['Active', 'Completed', 'Cancelled'];

    const activeOrders = [
        { id: 1, orderNumber: '#FD12345', date: '2 hours ago', items: 3, total: 45.50, status: 'Processing', farmer: 'F. Aceret' },
        { id: 2, orderNumber: '#FD12344', date: '1 day ago', items: 2, total: 28.00, status: 'Shipped', farmer: 'John Farm' },
    ];

    const completedOrders = [
        { id: 3, orderNumber: '#FD12343', date: '3 days ago', items: 5, total: 67.20, status: 'Delivered', farmer: 'Berry Fields' },
        { id: 4, orderNumber: '#FD12342', date: '1 week ago', items: 2, total: 32.50, status: 'Delivered', farmer: 'F. Aceret' },
    ];

    const cancelledOrders = [
        { id: 5, orderNumber: '#FD12341', date: '2 weeks ago', items: 1, total: 12.80, status: 'Cancelled', farmer: 'John Farm' },
    ];

    const getOrders = () => {
        if (selectedTab === 'Active') return activeOrders;
        if (selectedTab === 'Completed') return completedOrders;
        return cancelledOrders;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Processing': return '#FEF3C7';
            case 'Shipped': return '#DBEAFE';
            case 'Delivered': return '#DCFCE7';
            case 'Cancelled': return '#FEE2E2';
            default: return '#F3F4F6';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>My Orders</Text>
                <View style={styles.placeholder} />
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

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {getOrders().length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📦</Text>
                        <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} orders</Text>
                        <Text style={styles.emptySubtext}>Your {selectedTab.toLowerCase()} orders will appear here</Text>
                    </View>
                ) : (
                    <View style={styles.ordersSection}>
                        {getOrders().map((order) => (
                            <Pressable key={order.id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <View>
                                        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                                        <Text style={styles.orderDate}>{order.date}</Text>
                                    </View>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
                                        <Text style={styles.statusText}>{order.status}</Text>
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.orderDetails}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Farmer:</Text>
                                        <Text style={styles.detailValue}>{order.farmer}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Items:</Text>
                                        <Text style={styles.detailValue}>{order.items} items</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Total:</Text>
                                        <Text style={styles.totalValue}>₹{order.total.toFixed(2)}</Text>
                                    </View>
                                </View>
                                <View style={styles.orderActions}>
                                    <Pressable style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>View Details</Text>
                                    </Pressable>
                                    {selectedTab === 'Active' && (
                                        <Pressable style={styles.actionButtonSecondary}>
                                            <Text style={styles.actionButtonSecondaryText}>Track Order</Text>
                                        </Pressable>
                                    )}
                                    {selectedTab === 'Completed' && (
                                        <Pressable style={styles.actionButtonSecondary}>
                                            <Text style={styles.actionButtonSecondaryText}>Reorder</Text>
                                        </Pressable>
                                    )}
                                </View>
                            </Pressable>
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
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 16,
        gap: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#16A34A',
    },
    tabText: {
        fontSize: scaleFont(15),
        fontWeight: '600',
        color: '#6B7280',
    },
    tabTextActive: {
        color: '#16A34A',
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
    },
    ordersSection: {
        padding: 20,
    },
    orderCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderNumber: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: scaleFont(12),
        color: '#6B7280',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: scaleFont(12),
        fontWeight: '600',
        color: '#111827',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    orderDetails: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    detailValue: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
    },
    totalValue: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#16A34A',
    },
    orderActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#166534',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    actionButtonSecondary: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonSecondaryText: {
        fontSize: scaleFont(14),
        fontWeight: 'bold',
        color: '#111827',
    },
});
