import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { scaleFont } from '../utils/responsive';

export default function AddProductScreen() {
    const navigation = useNavigation();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [unit, setUnit] = useState('kg');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Vegetables');

    const categories = ['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Herbs', 'Meat'];
    const units = ['kg', 'g', 'pcs', 'bunch', 'dozen'];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Add New Product</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.formSection}>
                    {/* Product Image */}
                    <View style={styles.imageUploadSection}>
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderIcon}>📷</Text>
                            <Text style={styles.imagePlaceholderText}>Add Product Photo</Text>
                        </View>
                    </View>

                    {/* Product Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Product Name *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Fresh Organic Tomatoes"
                            placeholderTextColor="#9CA3AF"
                            value={productName}
                            onChangeText={setProductName}
                        />
                    </View>

                    {/* Category */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Category *</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
                            {categories.map((cat) => (
                                <Pressable
                                    key={cat}
                                    onPress={() => setCategory(cat)}
                                    style={[
                                        styles.categoryPill,
                                        category === cat && styles.categoryPillActive
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryPillText,
                                            category === cat && styles.categoryPillTextActive
                                        ]}
                                    >
                                        {cat}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Price and Unit */}
                    <View style={styles.rowInputs}>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Price *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0.00"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="decimal-pad"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                        <View style={[styles.inputGroup, { flex: 1 }]}>
                            <Text style={styles.label}>Unit *</Text>
                            <View style={styles.unitSelector}>
                                {units.map((u) => (
                                    <Pressable
                                        key={u}
                                        onPress={() => setUnit(u)}
                                        style={[
                                            styles.unitOption,
                                            unit === u && styles.unitOptionActive
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.unitOptionText,
                                                unit === u && styles.unitOptionTextActive
                                            ]}
                                        >
                                            {u}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* Stock */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Stock Quantity *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 50"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="number-pad"
                            value={stock}
                            onChangeText={setStock}
                        />
                    </View>

                    {/* Description */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Tell customers about your product..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    {/* Additional Options */}
                    <View style={styles.optionsSection}>
                        <Pressable
                            style={styles.optionRow}
                            onPress={() => alert('Organic option toggled')}
                        >
                            <Text style={styles.optionIcon}>🌿</Text>
                            <Text style={styles.optionText}>Mark as Organic</Text>
                            <View style={styles.checkbox} />
                        </Pressable>
                        <Pressable
                            style={styles.optionRow}
                            onPress={() => alert('Featured option toggled')}
                        >
                            <Text style={styles.optionIcon}>⭐</Text>
                            <Text style={styles.optionText}>Featured Product</Text>
                            <View style={styles.checkbox} />
                        </Pressable>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Actions */}
            <View style={styles.bottomSection}>
                <Pressable
                    style={styles.saveButton}
                    onPress={() => {
                        alert('Product added successfully!');
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.saveButtonText}>Add Product</Text>
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
    formSection: {
        padding: 20,
    },
    imageUploadSection: {
        marginBottom: 24,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderIcon: {
        fontSize: scaleFont(48),
        marginBottom: 8,
    },
    imagePlaceholderText: {
        fontSize: scaleFont(14),
        color: '#6B7280',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: scaleFont(15),
        color: '#111827',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    categoryScroll: {
        marginHorizontal: -20,
        paddingHorizontal: 20,
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        marginRight: 8,
    },
    categoryPillActive: {
        backgroundColor: '#166534',
    },
    categoryPillText: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#6B7280',
    },
    categoryPillTextActive: {
        color: '#FFFFFF',
    },
    rowInputs: {
        flexDirection: 'row',
        gap: 12,
    },
    unitSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    unitOption: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    unitOptionActive: {
        backgroundColor: '#DCFCE7',
        borderColor: '#16A34A',
    },
    unitOptionText: {
        fontSize: scaleFont(13),
        fontWeight: '600',
        color: '#6B7280',
    },
    unitOptionTextActive: {
        color: '#166534',
    },
    optionsSection: {
        marginTop: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    optionIcon: {
        fontSize: scaleFont(20),
        marginRight: 12,
    },
    optionText: {
        flex: 1,
        fontSize: scaleFont(15),
        fontWeight: '500',
        color: '#111827',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D1D5DB',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    saveButton: {
        backgroundColor: '#166534',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveButtonText: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
