/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';

import styled from 'styled-components';
import WebView from 'react-native-webview';
import {NativeModules} from 'react-native';

const SharedStorage = NativeModules.SharedStorage;

class App extends Component {
  componentDidMount() {
    SharedStorage.set(
      JSON.stringify({text: 'This is data from the React Native app'}),
    );
    console.log(SharedStorage);
  }

  render() {
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
