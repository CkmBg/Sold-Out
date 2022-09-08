import React, { useState } from 'react';

// APIs
import { Text, FlatList, Pressable, Box } from 'native-base';

// Utils
import { COLORS } from '../../utils/theme';

export default function CategoryList() {
    const [active, setActive] = useState(data[0]);

    const renderItem = ({ item: category }: { item: string }) => {
        const onPress = () => {
            setActive(category);
        };

        return (
            <Pressable
                py={2}
                px={3}
                mx={1}
                onPress={onPress}
                style={{
                    borderRadius: 5,
                    backgroundColor:
                        active === category ? COLORS.red1 : 'transparent',
                }}
            >
                <Text color={active === category ? '#fff' : '#000'}>
                    {category}
                </Text>
            </Pressable>
        );
    };

    return (
        <Box mx="auto" my={8}>
            <FlatList data={data} horizontal renderItem={renderItem} />
        </Box>
    );
}

const data = ['Running', 'Basket', 'Football', 'Volley'];
