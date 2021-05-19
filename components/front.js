import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('gamedb3.db');

// Screen in which items are added, deleted, and selected.
export default function FrontScreen({ navigation }) {
    
  const matlist = [
    {
      id: 1,
      name: "Copper Ore",
      amount: 0,
      value: 5
    },
    {
      id: 2,
      name: "Balsa Log",
      amount: 0,
      value: 5
    },
    {
      id: 3,
      name: "Copper Bar",
      amount: 0,
      value: 10
    },
    {
      id: 4,
      name: "Balsa Plank",
      amount: 0,
      value: 10
    },
    {
      id: 5,
      name: "Copper Sword",
      amount: 0,
      value: 25
    }
  ]
  
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists items (id integer primary key not null, name text, amount integer, value integer);');
    });

    for (let i = 0; i < matlist.length; i++) {
      db.transaction(tx => {
        tx.executeSql('insert ignore into items (name, amount, value) values (?, ?, ?);', [matlist[i].name, matlist[i].amount, matlist[i].value]);
      }, null, console.log("Inserted at number. " + i))
    };
  }, []);

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
  
  let [list, setList] = useState();

  const fetching = () => {
    db.transaction(tx => {
      tx.executeSql('select * from items;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  }

  const logging = () => {
    console.log(list);
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