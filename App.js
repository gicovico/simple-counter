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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor (props){
    super(props)
    this.state = { hour: 0, min: 0, sec: 0 }
  }
  _countUp = () => {
    this._interval = setInterval(() => {
      if (this.state.sec === 59) {
        if (this.state.min === 59) {
          if (this.state.hour === 99){
            return
          }
          this.setState(state => {
            return { hour: state.hour+1, min: 0, sec: 0}
          })
        } else {
          this.setState(state => {
            return { min: state.min+1, sec: 0}
          })
        }
      } else {
        this.setState(state => {
          return { sec: state.sec+1}
        })
      }
    }, 1000);
  }

  _countStop = () => {
    clearInterval(this._interval);
  }

  _countReset = () => {
    clearInterval(this._interval);
    this.setState(state => {
        return { hour: 0, min: 0, sec: 0 }
    })
  }

  render() {
    var zeropad = (t) => { return ('00' + t).slice(-2) }
    var formatter = (h, m, s) => { return zeropad(h) + ':' + zeropad(m) + ':' + zeropad(s) }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Simple Counter
        </Text>
        <Button 
          title="START"
          onPress={this._countUp}
        />
        <Button 
          title="STOP"
          onPress={this._countStop}
        />
        <Button 
          title=" RESET"
          onPress={this._countReset}
        />
        <Text style={styles.counter}>{ formatter(this.state.hour, this.state.min, this.state.sec) }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  counter: {
    margin: 10,
    fontSize: 24,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    fontFamily: 'verdana'
  }
});
