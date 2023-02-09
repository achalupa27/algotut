import { extendTheme, StyleFunctionProps, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                color: '#ffffff',
                bg: '#000000',
            },
        }),
    },
});

export default theme;
