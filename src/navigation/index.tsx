import React from 'react';

// APIs
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
    NotFoundScreen,
    DetailScreen,
    HomeScreen,
    AgendaScreen,
} from '../screens';

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

/**
 * ROOT STACK
 */

const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{ title: 'Oops !', headerShown: false }}
            />
            <Stack.Group>
                <Stack.Screen
                    name="Agenda"
                    component={AgendaScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}
