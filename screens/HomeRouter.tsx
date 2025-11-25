import React from 'react';
import { useUser } from '../context/UserContext';
import HomeScreen from './HomeScreen';
import FarmerHomeScreen from './FarmerHomeScreen';

export default function HomeRouter() {
    const { userType } = useUser();

    if (userType === 'farmer') {
        return <FarmerHomeScreen />;
    }

    // Default to foodie home screen
    return <HomeScreen />;
}
