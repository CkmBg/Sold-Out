import React, { useEffect, useMemo, useState } from 'react';

// APIs
import { Pressable } from 'native-base';
import Lottie from 'lottie-react-native';

// Components
import ShoeBox from './ShoeBox';

// Hooks
import { useShoes } from '../../hooks';

// Utils
import { MAX_WIDTH } from '../../utils/constants';
import { useRef } from 'react';
import { Animated } from 'react-native';

// Types
import {
    RootBottomTabParamList,
    RootStackParamList,
    Shoe,
    Shoes,
} from '../../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface IProps {
    searchTerm: string;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Agenda', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
}

export default function ShoesList({ searchTerm, navigation }: IProps) {
    const [page, setPage] = useState(1);
    const { data: shoes, error, isSuccess, isLoading } = useShoes(page);
    const [preparedData, setPreparedData] = useState<Shoes>([]);
    const windowSize = shoes && shoes.length > 50 ? shoes.length / 4 : 21;
    const num = 15;
    const initialNumToRender = 10;

    useEffect(() => {
        if (shoes && preparedData.length < shoes?.length) {
            if (page === 1) {
                setPreparedData(shoes.slice(0, page * initialNumToRender));
            }
        }
    }, [shoes]);

    const getMoreData = () => {
        if (shoes && preparedData.length < shoes.length && shoes.length != 0) {
            setPage(page + 1);
            setPreparedData(shoes.slice(0, page * num));
        }
    };

    const BOX_SIZE = MAX_WIDTH * 0.5 + 30;
    const BOX_MARGIN = (MAX_WIDTH - BOX_SIZE) / 2;

    const renderItem = ({ item, index }: { item: Shoe, index: number }) => {
        const inputRange = [
            (index - 1) * BOX_SIZE,
            index * BOX_SIZE,
            (index + 1) * BOX_SIZE,
        ];

        const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
        });

        return (
            <Animated.View style={{ transform: [{ scale }] }}>
                <Pressable
                    w={BOX_SIZE}
                    onPress={() => navigation.push('Detail', item)}
                >
                    <ShoeBox shoe={item} />
                </Pressable>
            </Animated.View>
        );
    };

    // Scroll Handlers
    const scrollX = useRef(new Animated.Value(0)).current;
    const onScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
    );

    const keyExtractor = (item: Shoe) => `shoe-${item.brand}-${item.id}`;

    const notFound = (error || !isSuccess) && !isLoading;

    const filteredData = useMemo(() => {
        if (searchTerm != '') {
            let conditions: Array<string>;

            if (searchTerm != '') {
                const searchFilter = searchTerm
                    .split(' ')
                    .map((term) => term.toLowerCase());

                conditions = [...searchFilter];
            }

            return [
                ...new Set(
                    preparedData.filter((shoe) => {
                        const includeName = conditions.some((term) =>
                            shoe.name.toLowerCase().includes(term)
                        );

                        // Shoe brand
                        const includeBrand = conditions.some((term) =>
                            shoe.brand.toLowerCase().includes(term)
                        );

                        // Shoe gender
                        const includeGender = conditions.some((term) =>
                            shoe.gender.toLowerCase().includes(term)
                        );

                        // Shoe date
                        const includeDate = conditions.some((term) =>
                            shoe.releaseDate.includes(term)
                        );

                        return (
                            includeBrand ||
                            includeDate ||
                            includeGender ||
                            includeName
                        );
                    })
                ),
            ];
        } else {
            return preparedData;
        }
    }, [searchTerm]);

    return (
        <>
            {notFound && (
                <Lottie
                    loop
                    autoPlay
                    source={require('../../../assets/event-not-found.json')}
                />
            )}

            {isLoading && (
                <Lottie
                    loop
                    autoPlay
                    source={require('../../../assets/loading.json')}
                />
            )}

            {shoes && shoes.length != 0 && (
                <Animated.FlatList
                    horizontal
                    bounces={false}
                    onScroll={onScroll}
                    data={
                        filteredData.length <= 0 && searchTerm === ''
                            ? preparedData
                            : filteredData
                    }
                    renderItem={renderItem}
                    style={{ flexGrow: 0 }}
                    decelerationRate="fast"
                    windowSize={windowSize}
                    snapToInterval={BOX_SIZE}
                    onEndReachedThreshold={0}
                    onEndReached={getMoreData}
                    keyExtractor={keyExtractor}
                    maxToRenderPerBatch={num / 2}
                    removeClippedSubviews={true}
                    showsHorizontalScrollIndicator={false}
                    initialNumToRender={initialNumToRender}
                    contentContainerStyle={{
                        paddingHorizontal: BOX_MARGIN,
                    }}
                />
            )}
        </>
    );
}
