import React, { useState } from 'react';
import { Box } from 'native-base';

// Components
import {
    SearchBar,
    Header,
    ShoesList,
    CategoryList,
    HandleCart,
} from '../components/Home';

// Types
import { RootBottomTabScreenProps } from '../types';

// Utils
import { COLORS } from '../utils/theme';

export default function HomeScreen({
    navigation,
    route,
}: RootBottomTabScreenProps<'Home'>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<Array<string>>([]);

    return (
        <Box pt="16" flex={1} bg={COLORS.palewhite}>
            <Header navigation={navigation} />

            <SearchBar
                handleChange={setSearchTerm}
                handleFilters={setFilters}
                filters={filters}
            />

            <CategoryList />

            <ShoesList navigation={navigation} searchTerm={searchTerm} />

            <HandleCart />
        </Box>
    );
}

/**
 * SpaceGrey - #A1A0A3
 * Grey - #F2F3F6
 * Black - #040404
 * Pink - #D0B1BA
 * Bronw - #4E3F3D
 * Red - #C32A37
 * Green - #8E9A6E
 * Blue - #3B429F
 */
