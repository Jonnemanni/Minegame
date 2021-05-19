import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { LocalTile, Marker } from 'react-native-maps';
import MineScreen from './components/mining'
import FrontScreen from './components/front'
import CraftScreen from './components/crafting'
import NavScreen from './components/navigation'
import ShopScreen from './components/selling'

const db = SQLite.openDatabase('gamedb3.db');
const Stack = createStackNavigator();

// Main app place for navigation purposes
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Front" component={FrontScreen} />
        <Stack.Screen name="Navigate" component={NavScreen} />
        <Stack.Screen name="Mining" component={MineScreen} />
        <Stack.Screen name="Crafting" component={CraftScreen} />
        <Stack.Screen name="Shopfront" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});