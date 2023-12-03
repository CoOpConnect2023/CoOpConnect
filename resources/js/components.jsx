require('./bootstrap');
require('./component');

import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Example() {
    return (
        <ChakraProvider>
            <App />
        </ChakraProvider>
    );
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
