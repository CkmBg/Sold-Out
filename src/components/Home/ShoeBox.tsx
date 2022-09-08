import React from 'react';

// APIs
import { Box, Text, VStack, HStack, Image, Divider } from 'native-base';
import { AntDesign as Icon } from '@expo/vector-icons';

// Utils
import { COLORS } from '../../utils/theme';
import { MAX_WIDTH } from '../../utils/constants';

// Types
import { Shoe } from '../../types';

interface IProps {
    shoe: Shoe;
}

export default function ShoeBox({ shoe }: IProps) {
    const BOX_SIZE = MAX_WIDTH * 0.5 + 30;
    const THUMB_SIZE = BOX_SIZE * 0.9;

    return (
        <Box w={BOX_SIZE} shadow="2" borderRadius="2xl">
            <Box
                p={5}
                bg="white"
                justifyContent="center"
                alignItems="center"
                borderTopRadius="2xl"
            >
                <Image
                    alt="shoe"
                    w={THUMB_SIZE}
                    h={THUMB_SIZE}
                    resizeMode="contain"
                    source={{ uri: shoe.media.thumbUrl }}
                    style={{
                        transform: [
                            { rotateY: '180deg' },
                            { rotateZ: '15deg' },
                        ],
                    }}
                />
            </Box>

            <VStack py={4} px={4} bg={COLORS.red2} borderBottomRadius="2xl">
                <Text color="white" fontSize="md" fontWeight="bold">
                    {shoe.shoe}
                </Text>

                <Text color="white" fontSize="xs" numberOfLines={2}>
                    {shoe.description}
                </Text>

                <Divider my={3} w={10} />

                <HStack alignItems="center" justifyContent="space-between">
                    <Text color="white" fontWeight="bold" fontSize="sm">
                        {shoe.retailPrice}€
                    </Text>

                    <Icon name="hearto" size={24} color="white" />
                </HStack>
            </VStack>
        </Box>
    );
}
