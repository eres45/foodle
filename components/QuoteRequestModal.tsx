import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { scaleFont } from '../utils/responsive';

interface QuoteRequestModalProps {
    visible: boolean;
    onClose: () => void;
    productName: string;
    currentPrice: number;
}

export default function QuoteRequestModal({ visible, onClose, productName, currentPrice }: QuoteRequestModalProps) {
    const [quantity, setQuantity] = useState('');
    const [proposedPrice, setProposedPrice] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        // In real app, this would send to backend
        alert(`Quote request sent to farmer!\nProduct: ${productName}\nQuantity: ${quantity}\nProposed Price: $${proposedPrice}`);
        onClose();
        // Reset form
        setQuantity('');
        setProposedPrice('');
        setMessage('');
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Request Quote</Text>
                        <Pressable onPress={onClose}>
                            <Text style={styles.closeButton}>✕</Text>
                        </Pressable>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.productName}>{productName}</Text>
                        <Text style={styles.currentPrice}>Current Price: ${currentPrice.toFixed(2)}/unit</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Quantity *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 10"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="number-pad"
                                value={quantity}
                                onChangeText={setQuantity}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Your Proposed Price (per unit) *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., 10.50"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="decimal-pad"
                                value={proposedPrice}
                                onChangeText={setProposedPrice}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Message to Farmer (Optional)</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Add any special requirements..."
                                placeholderTextColor="#9CA3AF"
                                multiline
                                numberOfLines={3}
                                value={message}
                                onChangeText={setMessage}
                            />
                        </View>

                        <View style={styles.infoBox}>
                            <Text style={styles.infoIcon}>💡</Text>
                            <Text style={styles.infoText}>
                                The farmer will review your quote and respond within 24 hours
                            </Text>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Pressable style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.submitButton, (!quantity || !proposedPrice) && styles.submitButtonDisabled]}
                            onPress={handleSubmit}
                            disabled={!quantity || !proposedPrice}
                        >
                            <Text style={styles.submitButtonText}>Send Quote Request</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: '#111827',
    },
    closeButton: {
        fontSize: scaleFont(24),
        color: '#6B7280',
    },
    content: {
        padding: 20,
    },
    productName: {
        fontSize: scaleFont(18),
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
    },
    currentPrice: {
        fontSize: scaleFont(14),
        color: '#16A34A',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: scaleFont(14),
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: scaleFont(15),
        color: '#111827',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: '#DBEAFE',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        gap: 8,
    },
    infoIcon: {
        fontSize: scaleFont(16),
    },
    infoText: {
        flex: 1,
        fontSize: scaleFont(12),
        color: '#1E40AF',
    },
    footer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: scaleFont(15),
        fontWeight: 'bold',
        color: '#111827',
    },
    submitButton: {
        flex: 2,
        paddingVertical: 14,
        borderRadius: 10,
        backgroundColor: '#166534',
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    submitButtonText: {
        fontSize: scaleFont(15),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
