import React from 'react';
import { Input, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface IProps {
    filters: Array<string>;
    handleChange: React.Dispatch<React.SetStateAction<string>>;
    handleFilters: React.Dispatch<React.SetStateAction<Array<string>>>;
}

export default function SearchBar({
    filters,
    handleChange,
    handleFilters,
}: IProps) {
    const onChange = (ev: NativeSyntheticEvent<TextInputChangeEventData>) => {
        handleChange(ev.nativeEvent.text);
        handleFilters([...filters, ev.nativeEvent.text]);
    };

    return (
        <Input
            placeholder="Search product"
            width="80%"
            m="auto"
            borderRadius="12"
            marginTop="3"
            marginBottom="3"
            backgroundColor="rgba(0, 0, 0, 0.05)"
            borderWidth="1.5"
            py="3"
            px="1"
            fontSize="14"
            focusOutlineColor="black"
            onChange={onChange}
            InputLeftElement={
                <Icon
                    m="2"
                    ml="3"
                    size="6"
                    color="gray.400"
                    as={<MaterialIcons name="search" />}
                />
            }
        />
    );
}
