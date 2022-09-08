import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootBottomTabParamList, RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Home', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
}

export default function Header({ navigation }: IProps) {
    return (
        <View
            style={{
                alignContent: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginLeft: -30,
                marginRight: -30,
                marginBottom: 25,
            }}
        >
            <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color="transparent"
            />

            <Text
                style={{
                    textTransform: 'uppercase',
                    fontFamily: 'Inter_700Bold',
                    fontSize: 20,
                }}
            >
                Sold Out
            </Text>

            <Pressable onPress={() => navigation.push('Agenda')}>
                <AntDesign
                    style={{ justifyContent: 'flex-end' }}
                    name="calendar"
                    size={24}
                    color="black"
                />
            </Pressable>
        </View>
    );
}
