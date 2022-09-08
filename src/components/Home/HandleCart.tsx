import React, { useReducer } from 'react';

// APIs
import { Text, Button, Input, HStack } from 'native-base';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

// Utils
import { COLORS } from '../../utils/theme';
import { MAX_WIDTH } from '../../utils/constants';

export default function HandleCart() {
    const reducer = (count: number, action: { type: CartAction }) => {
        switch (action.type) {
            case CartAction.INCREMENT:
                return count + 1;
            case CartAction.DECREMENT:
                return count <= 1 ? count : count - 1;
            default:
                throw new Error('Cart Action not found');
        }
    };

    const [count, dispatch] = useReducer(reducer, 1);

    const addToCart = () => dispatch({ type: CartAction.INCREMENT });

    const removeToCart = () => dispatch({ type: CartAction.DECREMENT });

    return (
        // mt={7}
        <HStack
            w={MAX_WIDTH}
            px={5}
            justifyContent="space-evenly"
            alignItems="center"
            position="absolute"
            bottom={10}
        >
            <Button py={2} px={4} bg="white" shadow="1" onPress={removeToCart}>
                <Text color="#000">
                    Retirer <Icon name="cart-arrow-up" size={12} color="#000" />
                </Text>
            </Button>

            <Input
                value={`${count}`}
                w={20}
                fontSize="2xl"
                fontWieght="bold"
                textAlign="center"
                borderColor="transparent"
                textDecoration="none"
                fontFamily="Montserrat_600SemiBold"
            />

            <Button
                py={2}
                px={4}
                bg={COLORS.red1}
                shadow="1"
                onPress={addToCart}
            >
                <Text color="white">
                    Ajouter{' '}
                    <Icon name="cart-arrow-down" size={12} color="#fff" />
                </Text>
            </Button>
        </HStack>
    );
}

enum CartAction {
    INCREMENT,
    DECREMENT,
}
