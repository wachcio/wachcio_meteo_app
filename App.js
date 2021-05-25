/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import styled from 'styled-components';
import WebView from 'react-native-webview';

const App = () => {
  console.log('Start log');

  return (
    <SafeAreaView>
      <Container>
        <DynamicWebView
          source={{uri: 'http://meteo.wachcio.pl/'}}
          startInLoadingState={true}
          renderLoading={() => <Text>{'Loading...'}</Text>}
          renderError={() => <Text>{'Error!'}</Text>}
          onMessage={msg => {
            console.log('WEBVIEW msg = ', msg);
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const DynamicWebView = styled(WebView)`
  width: 100%;
  height: 100%;
`;

export default App;
