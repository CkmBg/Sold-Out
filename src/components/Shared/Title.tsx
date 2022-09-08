import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

// APIs
import { Text } from 'native-base';

interface IProps {
    text: string;
    style?: StyleProp<TextStyle>;
}

export default function Title({ text, style }: IProps) {
    return style ? (
        <Text fontSize="3xl" {...style}>
            {text}
        </Text>
    ) : (
        <Text fontSize="3xl">{text}</Text>
    );
}
