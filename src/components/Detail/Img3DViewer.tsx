import React, { useState } from 'react';

// APIs
import { VStack, Slider, Image } from 'native-base';

// Hooks
import { useShoe } from '../../hooks';

// Utils
import { MAX_WIDTH } from '../../utils/constants';

// Types
import { ShoeMediaImage } from '../../types';

interface IProps {
    urlKey: string;
    media: ShoeMediaImage;
}

export default function Img3DViewer({ urlKey, media }: IProps) {
    const { data, error } = useShoe(urlKey);
    const [onChangeValue, setOnChangeValue] = useState(0);
    const cdt = data && data.media;

    return (
        <VStack bg="#fff" w={MAX_WIDTH} alignItems="center">
            {cdt && (
                <>
                    <Image
                        w={250}
                        h={250}
                        alt="shoe"
                        resizeMode="contain"
                        source={{
                            uri: data.media[360][0]
                                ? data.media[360][
                                      onChangeValue < 0 ? 0 : onChangeValue
                                  ]
                                : media.thumbUrl,
                        }}
                    />

                    {data.media[360][0] && (
                        <Slider
                            mb={5}
                            w="60%"
                            defaultValue={data.media[360].length}
                            color="black"
                            colorScheme="black"
                            onChange={(v) => {
                                setOnChangeValue(
                                    Math.floor(
                                        (v * data.media[360].length) / 100
                                    ) - 1
                                );
                            }}
                        >
                            <Slider.Track bg="gray.200">
                                <Slider.FilledTrack bg="black" />
                            </Slider.Track>
                            <Slider.Thumb
                                style={{
                                    backgroundColor: '#fff',
                                    borderColor: '#000',
                                    borderWidth: 2,
                                }}
                            />
                        </Slider>
                    )}
                </>
            )}
        </VStack>
    );
}
