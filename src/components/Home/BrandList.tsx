import React, { memo, useRef, useState } from 'react';
import {
    View,
    Animated,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';

// APIs
import { Box, Text, useColorMode } from 'native-base';

// Hooks
import { useBrands } from '../../hooks';

// Types
import { Brand } from '../../types';

// Utils
import { MAX_WIDTH } from '../../utils/constants';

interface IProps {
    changeBrand: (arg: string) => void;
}

export default function BrandList() {
    // { changeBrand }: IProps
    // Current color mode
    const { colorMode } = useColorMode();

    const changeBrand = (args: any) => {
        console.log('ChangeBrand');
    };

    // Scroll Handlers
    const scrollX = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
    );

    // Switch brand
    const { data, error, isSuccess, isLoading } = useBrands();
    const [dragEnded, setDragEnded] = useState(false);

    // List Item config
    const ITEM_SIZE = MAX_WIDTH * 0.38;
    const ITEM_SPACING = (MAX_WIDTH - ITEM_SIZE) / 2;

    const renderItem = ({ item, index }: { item: Brand, index: number }) => {
        const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
        ];

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
        });

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1.2, 0.6],
        });

        return (
            <View
                style={{
                    justifyContent: 'center',
                }}
            >
                <Animated.Text
                    style={[
                        {
                            fontFamily: 'Inter_700Bold',
                            fontSize: 20,
                            textAlign: 'center',
                            textTransform: 'uppercase',
                            width: ITEM_SIZE,
                            color: colorMode === 'light' ? 'black' : 'white',
                        },
                        {
                            opacity,
                            transform: [{ scale }],
                        },
                    ]}
                >
                    {item.name}
                </Animated.Text>
            </View>
        );
    };

    const keyExtractor = (item: Brand) => `brand-category-${item.name}`;

    const onScrollEndDrag = () => {
        setDragEnded(true);
    };

    const onMomentumScrollEnd = (
        ev: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const index = Math.ceil(ev.nativeEvent.contentOffset.x / ITEM_SIZE);

        if (data && dragEnded) {
            changeBrand(data[index].name);
            setDragEnded(false);
        }
    };

    return (
        <Box minHeight={25} my={5}>
            {isLoading && <Text>Loading...</Text>}

            {error && <Text>An error occured {error}</Text>}

            {isSuccess && (
                <Animated.FlatList
                    horizontal
                    data={data}
                    // bounces={false}
                    // onScroll={onScroll}
                    // decelerationRate="fast"
                    // style={{ flexGrow: 0 }}
                    renderItem={renderItem}
                    // snapToInterval={ITEM_SIZE}
                    // keyExtractor={keyExtractor}
                    // onScrollEndDrag={onScrollEndDrag}
                    // showsHorizontalScrollIndicator={false}
                    // onMomentumScrollEnd={onMomentumScrollEnd}
                    // contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
                />
            )}
        </Box>
    );
}
