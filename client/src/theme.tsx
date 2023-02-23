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
            h0: {
                fontSize: '40pt',
            },
            h1: {
                fontSize: '32pt',
            },
            h2: {
                fontSize: '26pt',
            },
            h3: {
                fontSize: '22pt',
            },
            h4: {
                fontSize: '20pt',
            },
            p: {
                a: {
                    color: '#00ffd2',
                    _hover: {
                        textDecoration: 'underline',
                    },
                },
            },
            blockquote: {
                marginY: '1rem',
                marginX: '2rem',
            },
            code: {
                background: 'white',
                color: 'black',
                padding: '0.25rem',
                paddingX: '0.75rem',
            },
        }),
    },
});

export default theme;
