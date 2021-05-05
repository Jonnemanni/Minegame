import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('addressplace.db');

// Screen in which items are added, deleted, and selected.
export default function FrontScreen({ navigation }) {

  const craftlist = {
    name: "Crafting Recipies",
    screen: "Crafting",
    list: [
      {
        name: "Copper Bar",
        materials: [
          {
            name: "Copper Ore",
            required: 1
          }
        ]
      },
      {
        name: "Balsa Plank",
        materials: [
          {
            name: "Balsa Log",
            required: 1
          }
        ]
      },
      {
        name: "Copper Sword",
        materials: [
          {
            name: "Copper Bar",
            required: 1
          },
          {
            name: "Balsa Plank",
            required: 1
          }
        ]
      }
    ]
  }

  const minelist = {
    name: "Resource Zones",
    screen: "Mining",
    list: [
      {
        name: "Copper Mine",
        item: "Copper Ore"
      },
      {
        name: "Balsawood Forest",
        item: "Balsa Log"
      }
    ]
  }

  return (
    <View style={styles.container}>

      <View style={styles.button}>
        <Button
          title="Mining"
          raised="true"
          onPress={() => navigation.navigate('Navigate', minelist)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Crafting"
          raised="true"
          onPress={() => navigation.navigate('Navigate', craftlist)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Shopfront"
          raised="true"
          onPress={() => navigation.navigate('Shopfront')}
        />
      </View>

    </View>
  ); // end return
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    justifyContent: 'center',
    margin: 20,
  },
});