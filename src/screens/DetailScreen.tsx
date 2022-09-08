import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

// APIs
import {
    Box,
    Text,
    VStack,
    Slider,
    ScrollView,
    Image,
    Divider,
} from 'native-base';

// Components
import { BottomSheet, Header, Img3DViewer } from '../components/Detail';

// Hooks
import { useShoe } from '../hooks';

// Utils
import { COLORS } from '../utils/theme';
import { MAX_WIDTH } from '../utils/constants';

// Types
import { RootStackScreenProps } from '../types';

export default function DetailScreen({
    navigation,
    route,
}: RootStackScreenProps<'Detail'>) {
    const { shoe, id, gender, description, urlKey, media } = route.params;

    return (
        <Box pt="16" flex={1} bg={COLORS.palewhite}>
            <Header navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Img3DViewer media={media} urlKey={urlKey} />

                <BottomSheet
                    id={id}
                    shoe={shoe}
                    gender={gender}
                    description={description}
                />
            </ScrollView>
        </Box>
    );
}
