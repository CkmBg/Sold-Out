import React, { useState, useEffect } from 'react'; 

// APIs
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
import Navigation from './src/navigation';
// import { Splash } from './src/components';

// Fonts
import { useFonts, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import {  Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';


// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
};

// Extend the theme
export const theme = extendTheme({ config });

type MyThemeType = typeof theme;

declare module 'native-base' {
    // eslint-disable-next-line
    type ICustomTheme = MyThemeType;
}

export default function App() {
    const queryClient = new QueryClient();

    const FAKE_TIME_LOAD = 3000;
    const [endOfLoading, setEndOfLoading] = useState(false);
    
    // Fonts Loading
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_900Black,
        Roboto_400Regular,
        Roboto_500Medium,
        Montserrat_600SemiBold,
    });

    const loadCondition = !endOfLoading || !fontsLoaded;

    // Loader
    useEffect(() => {
        setTimeout(() => {
            setEndOfLoading(true);
        }, FAKE_TIME_LOAD);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <NativeBaseProvider>
                {loadCondition ? (
                    // <Splash />
                    <></>
                ) : (
                    <Navigation />
                )}
                <StatusBar style="light" backgroundColor="black" />
            </NativeBaseProvider>
        </QueryClientProvider>
    );
}