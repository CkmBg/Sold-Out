import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

// APIs
import { Text, VStack, Divider } from 'native-base';

// Utils
import { MAX_HEIGHT, MAX_WIDTH } from '../../utils/constants';

interface IProps {
    id: string;
    shoe: string;
    gender: string;
    description: string;
}

export default function BottomSheet({ id, shoe, gender, description }: IProps) {
    const cleanDescription = description.replace(/(<br(\/|\s\/)?>)/g, '');
    const [readMore, setReadMore] = useState(false);

    return (
        <VStack
            bg="rgba(0,0,0,0.1)"
            pt={5}
            px={5}
            w={MAX_WIDTH}
            minH={MAX_HEIGHT * 0.5}
            flexGrow={1}
            borderTopRadius="3xl"
        >
            <Text fontSize="lg" fontFamily="Inter_900Black">
                {shoe.split(' ').map((v, index) => (
                    <Text key={`${id}-text-${index}`}>{v} </Text>
                ))}
            </Text>

            <Text textTransform="capitalize">{gender} Shoe's</Text>

            <Divider w={10} my={4} bg="#555" />

            {description != '' && (
                <>
                    <Text fontSize="md" mb={3} fontFamily="Inter_700Bold">
                        Description
                    </Text>

                    {readMore ? (
                        <Text>{cleanDescription}</Text>
                    ) : (
                        <Text numberOfLines={4}>{cleanDescription}</Text>
                    )}

                    <TouchableOpacity
                        onPress={() => setReadMore(!readMore)}
                        style={{ marginVertical: 10 }}
                    >
                        <Text
                            fontFamily="Roboto_500Medium"
                            textDecorationLine="underline"
                            textDecorationColor="black"
                        >
                            {readMore ? 'Réduire.' : 'Lire plus...'}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </VStack>
    );
}
