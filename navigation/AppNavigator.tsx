import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import UserTypeScreen from '../screens/UserTypeScreen';
import HomeRouter from '../screens/HomeRouter';
import ExploreScreen from '../screens/ExploreScreen';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import FarmerProfileScreen from '../screens/FarmerProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import FarmerOrdersScreen from '../screens/FarmerOrdersScreen';
import AddProductScreen from '../screens/AddProductScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="UserType" component={UserTypeScreen} />
                <Stack.Screen name="Home" component={HomeRouter} />
                <Stack.Screen name="Explore" component={ExploreScreen} />
                <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
                <Stack.Screen name="FarmerProfile" component={FarmerProfileScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Orders" component={OrdersScreen} />
                <Stack.Screen name="FarmerOrders" component={FarmerOrdersScreen} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} />
                <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
