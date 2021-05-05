import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem, Image, Avatar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';

const db = SQLite.openDatabase('addressplace.db');

// Screen in which items are added, deleted, and selected.
export default function CraftScreen({ route, navigation }) {
  let params = (route.params);

  const materials = [
    {
      name: "Copper Ore",
      amount: 10,
      value: 5,
      flux: 0
    },
    {
      name: "Balsa Log",
      amount: 20,
      value:5,
      flux: 1
    },
    {
      name: "Copper Bar",
      amount: 10,
      value: 10,
      flux: -5
    },
    {
      name: "Balsa Plank",
      amount: 0,
      value: 10,
      flux: 5
    }
  ]

  const listupdate = () => {
    let truelist = [];
    for (i = 0; i < params.materials.length; i++) {
      /*console.log("What we are looking for");
      console.log(params.materials[i]);
      console.log("------------");*/

      for (i2 = 0; i2 < materials.length; i2++) {
        /*console.log(materials[i2]);
        console.log(params.materials[i].name == materials[i2].name)
        console.log("-----");*/

        if (params.materials[i].name == materials[i2].name) {
          truelist.push(
            {
              name: params.materials[i].name,
              amount: materials[i].amount,
              required: params.materials[i].required
            }
          )
          /*console.log("LIST AT THE MOMENT")
          console.log(truelist);
          console.log("--------------------")*/
        }
      }
    }
    return truelist;
  }

  const listmaker = (data) => {
    maxamount = 9999;

    for (i = 0; i < data.length; i++) {
      curmax = data[i].amount / data[i].required;
      if (maxamount > curmax) {
        maxamount = curmax;
      }
    }

    var list = [];
    for (i = 1; i <= maxamount; i++) {
      list.push(i);
    }
    return list;
  }

  _renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}/{item.required}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", padding: 10 }}>
        <Image
          source={require('../assets/placeholder32x32.png')}
          style={{
            height: 200,
            width: 200,
          }}
        />
      </View>
      <Text>{params.name}</Text>

      <FlatList
        data={listupdate()}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
        extraData={this.state}
      />

      <View style={{ alignItems: "center", justifyContent:"center" ,height:40, marginLeft: 50, marginRight: 50, borderWidth:1, borderColor:"GhostWhite" }}>
        <ModalDropdown
          style={{width:200}}
          isFullWidth={true}
          defaultValue={"How many to make?"}
          options={listmaker(listupdate())}
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Craft"
          raised="true"
        />
      </View>

    </View>
  ); // end return
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%'
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