import React, { createContext, useState, useContext, ReactNode } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { scaleFont } from '../utils/responsive';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('info');
    const [fadeAnim] = useState(new Animated.Value(0));

    const showToast = (msg: string, t: ToastType = 'info') => {
        setMessage(msg);
        setType(t);
        setVisible(true);

        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setVisible(false);
        });
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#16A34A';
            case 'error': return '#DC2626';
            case 'info': return '#2563EB';
            default: return '#16A34A';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {visible && (
                <Animated.View style={[
                    styles.toastContainer,
                    { opacity: fadeAnim, backgroundColor: getBackgroundColor() }
                ]}>
                    <Text style={styles.toastText}>{message}</Text>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 8,
        zIndex: 9999,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
    },
    toastText: {
        color: '#FFFFFF',
        fontSize: scaleFont(16),
        fontWeight: '600',
        textAlign: 'center',
    },
});
