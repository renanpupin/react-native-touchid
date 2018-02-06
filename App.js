/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import FingerprintIdentifierManager from './module/fingerprintidentifier/';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    constructor(props) {
      super(props);
    }

    async hasFingerprintSensor() {
        var sucess = await FingerprintIdentifierManager.hasFingerprintSensor();
        console.log("Has finger print sensor?: " + sucess);
        alert("Has finger print sensor?: " + sucess);
    }

    async authenticationFingerprintRequest() {
        var sucess = await FingerprintIdentifierManager.authenticationFingerprintRequest();
        switch ( FingerprintIdentifierManager.AuthenticationError ) {
            case FingerprintIdentifierManager.APPCANCEL: sucess = "Authentication was cancelled by application"; break;
            case FingerprintIdentifierManager.FAILED: sucess = "The user failed to provide valid credentials"; break;
            case FingerprintIdentifierManager.INVALIDCONTEXT: sucess = "The context is invalid"; break;
            case FingerprintIdentifierManager.PASSCODENOTSET: sucess = "Passcode is not set on the device"; break;
            case FingerprintIdentifierManager.SYSTEMCANCEL: sucess = "Authentication was cancelled by the system"; break;
            case FingerprintIdentifierManager.TOUCHIDLOCKOUT: sucess = "Too many failed attempts."; break;
            case FingerprintIdentifierManager.TOUCHIDNOTAVAILABLE: sucess = "TouchID is not available on the device"; break;
            case FingerprintIdentifierManager.USERCANCEL: sucess = "The user did cancel"; break;
            case FingerprintIdentifierManager.USERFALLBACK: sucess = "The user chose to use the fallback"; break;
            case FingerprintIdentifierManager.NOTERROR: sucess = "Did not find error code object"; break;
            case FingerprintIdentifierManager.NOLOCKSCREEN: sucess = "(Android) No lock sreen enable"; break;
            case FingerprintIdentifierManager.SUCESS: sucess = "(Android)Authentication sucess"; break;
            case FingerprintIdentifierManager.START: sucess = "(Android) Start authentication"; break;
            case DEFAULT: break;
        }
        console.log("Touch status auth: " + sucess);
        alert("Touch id auth: " + sucess);
    }

    async cancelAuthentication() {
        if ( Platform.OS === 'android' ) {
            var sucess = await FingerprintIdentifierManager.cancelAuthentication();
            console.log("Cancel touch id: " + sucess);
            alert("Cancel touch id: " + sucess);
        }
    }

  render() {
    return (
      <View style={styles.container}>

          <Button
              style={styles.button}
              onPress={this.hasFingerprintSensor}
              title="HAS TOUCH ID?"
              color="#841584"/>
          <Button
              style={styles.button}
              onPress={this.authenticationFingerprintRequest}
              title="AUTH TOUCH"
              color="#841584"/>

          <Button
              style={styles.button}
              onPress={this.cancelAuthentication}
              title="CANCEL AUTH TOUCH"
              color="#841584"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 100,
    },
});
