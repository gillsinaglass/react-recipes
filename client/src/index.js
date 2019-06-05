import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//Essential for connecting frontend and Backend
const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql'
});



ReactDOM.render(
<ApolloProvider client={client}>
    <App /> 
</ApolloProvider>, 
document.getElementById('root'));
