import React from 'react';
import { View, Text, Pressable } from 'react-native';

// APIs
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Types
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
    navigation: NativeStackNavigationProp<
        RootStackParamList,
        'Detail',
        undefined
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
            <Pressable onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            </Pressable>

            <Text
                style={{
                    textTransform: 'uppercase',
                    fontFamily: 'Inter_700Bold',
                    fontSize: 20,
                }}
            >
                Detail
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
