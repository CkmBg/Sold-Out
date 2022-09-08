import axios from 'axios';
import { useQuery } from 'react-query';

// Utils
import { API_PRODUCT_URL } from '../utils/constants';

// Types
import { Shoe } from '../types';

const getShoe = async (name: string) => {
    const { data } = await axios.get(`${API_PRODUCT_URL}/${name}`, {
        withCredentials: true,
    });

    const shoe: Shoe = data.Product;

    return shoe;
};

export default function useShoes(name: string) {
    return useQuery('query-all-shoes', () => getShoe(name));
}
