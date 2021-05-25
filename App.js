/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import styled from 'styled-components';
import WebView from 'react-native-webview';
import {NativeModules} from 'react-native';
import axios from 'axios';

const SharedStorage = NativeModules.SharedStorage;

function App() {
  // useEffect(() => {
  setInterval(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://meteo.wachcio.pl/API/GetJSON.php?data=current&sensor=0',
        );
        console.log(response.data);
        SharedStorage.set(
          JSON.stringify({
            text: `${response.data.sensorName}
              ${response.data.valueCurrent.value}${response.data.unit}`,
          }),
        );
      } catch (error) {
        console.error(error);
      }
    })();
  }, 1000 * 10);
  // });

  return (
    <SafeAreaView>
      <Container>
        <DynamicWebView
          source={{uri: 'http://meteo.wachcio.pl/'}}
          startInLoadingState={true}
          renderLoading={() => <Text>{'Loading...'}</Text>}
          renderError={() => <Text>{'Error!'}</Text>}
          onShouldStartLoadWithRequest={request => {
            console.log('WEBVIEW request = ', request);

            return true;
          }}
          onMessage={msg => {
            console.log('WEBVIEW msg = ', msg);
          }}
        />
      </Container>
    </SafeAreaView>
  );
}

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const DynamicWebView = styled(WebView)`
  width: 100%;
  height: 100%;
`;

export default App;
