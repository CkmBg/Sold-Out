import React, { useState, useEffect } from 'react';
import { Pressable, Image, Text, Center } from 'native-base';
import { Agenda } from 'react-native-calendars';
import { RootBottomTabParamList, RootStackParamList, Shoe } from '../types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useShoesByYear } from '../hooks';
import { COLORS } from '../utils/theme';

export default function Calendar({
    navigation,
}: {
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Calendar', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >,
}) {
    const [dataSource, setDataSource] = useState<{ [key: string]: Shoe[] }>({});

    const [year, setYear] = useState(2022);
    const [month, setMonth] = useState(1);
    const { data, error, isLoading, isSuccess } = useShoesByYear(year, month);

    useEffect(() => {
        if (data) {
            const mappedData = data.map((shoe) => ({ ...shoe }));

            const reduced = mappedData.reduce(
                (acc: { [key: string]: Shoe[] }, currentValue: Shoe) => {
                    const { releaseDate, ...rest } = currentValue;

                    acc[releaseDate] = [{ releaseDate, ...rest }];

                    return acc;
                },
                {}
            );

            setDataSource(reduced);
        }
    }, [data, year, month]);

    const renderItem = (item: Shoe) => {
        return (
            <Pressable onPress={() => navigation.push('Detail', item)}>
                <Center p={2} mt={17} shadow="9" bg="white">
                    <Image
                        source={{ uri: item.media.thumbUrl }}
                        alt="shoe"
                        w={120}
                        h={120}
                        resizeMode="contain"
                    />
                    <Text fontSize="md" fontStyle="italic" opacity={0.5}>
                        {item.name}
                    </Text>
                    <Text fontSize="md" fontFamily="Roboto_400Regular">
                        {item.shoe}
                    </Text>
                </Center>
            </Pressable>
        );
    };

    return (
        <>
            <Agenda
                items={dataSource}
                selected={'2022-07-09'}
                renderItem={renderItem}
                loadItemsForMonth={(date) => {
                    if (date.year != year) {
                        setYear(date.year);
                        setMonth(1);
                    }
                    if (date.month != month) {
                        setMonth(month + 1);
                    }
                }}
                theme={{
                    dotColor: COLORS.red1,
                    selectedDotColor: 'white',
                    selectedDayBackgroundColor: COLORS.red1,
                    todayBackgroundColor: 'gray',
                    todayTextColor: 'white',
                    todayButtonFontWeight: '900',
                }}
            />
        </>
    );
}
