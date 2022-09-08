import axios from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { Shoe } from '../types';
import { API_BROWSE_URL } from '../utils/constants';

const getShoesByYear = async (year: number, page: number) => {
    const { data } = await axios.get(
        `${API_BROWSE_URL}&year=${year}&page=${page}`,
        {
            withCredentials: true,
        }
    );

    const shoes = data.Products;

    return shoes;
};

export default function useShoesByYear(
    year = 2022,
    page = 1
): UseQueryResult<Shoe[], unknown> {
    return useQuery(`query-shoes-by-${year}`, () => getShoesByYear(year, 1));
}
