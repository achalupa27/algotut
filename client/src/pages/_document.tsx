import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head />
                <body>
                    {/* Make Color mode to persists when you refresh the page. */}
                    <ColorModeScript />
                    <Main />
                    <NextScript />
                </body>
                <link rel='icon' href='/assets/at_logo.png' />
                <title>AlgoTut</title>
            </Html>
        );
    }
}
