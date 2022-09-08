import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

type RootStackParamList = {
    Root: NavigatorScreenParams<RootBottomTabParamList> | undefined;
    Detail: Shoe;
    Agenda: undefined;
    NotFound: undefined;
}

// eslint-disable-next-line
type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
    RootStackParamList,
    Screen
>;

type RootBottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Agenda: undefined;
    Favorite: undefined;
};

type RootBottomTabScreenProps<Screen extends keyof RootBottomTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<RootBottomTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

interface Shoe {
    id: string;
    brand: string;
    category: string;
    gender: string;
    description: string;
    countryOfManufacture: string;
    media: ShoeMediaImage;
    name: string; // Shoe Category's name
    releaseDate: string;
    releaseTime: number;
    retailPrice: number;
    shoe: string; // Shoe name
    year: number;
    urlKey: string;
    market: ShoeMarket;
    _tags: Array<string>;
    selling_countries: Array<string>;
    isLiked?: boolean;
}

type Shoes = Shoe[];

interface ShoeMediaImage {
    '360': Array<string>;
    imageUrl: string;
    smallImageUrl: string;
    thumbUrl: string;
}

interface ShoeMarket {
    numberOfAsks: number;
    createdAt: string;
    lastSale: number;
}

interface Brand {
    name: string;
    qty: number;
}

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export {
    Shoe,
    Shoes,
    Brand,
    ShoeMarket,
    ShoeMediaImage,
    RootStackParamList,
    RootStackScreenProps,
    RootBottomTabParamList,
    RootBottomTabScreenProps
};