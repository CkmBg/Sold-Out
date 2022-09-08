import { Dimensions } from 'react-native';

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('screen');

const API_URL = 'https://stockx.com/api';

const API_BROWSE_URL = `${API_URL}/browse?productCategory=sneakers`;

const API_PRODUCT_URL = `${API_URL}/products`;

export { MAX_WIDTH, MAX_HEIGHT, API_URL, API_BROWSE_URL, API_PRODUCT_URL };
