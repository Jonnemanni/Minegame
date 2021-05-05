import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem } from'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapView, { LocalTile, Marker} from 'react-native-maps';
import MineScreen from './components/mining'
import FrontScreen from './components/front'
import CraftScreen from './components/crafting'
import NavScreen from './components/navigation'
import ShopScreen from './components/selling'

const db = SQLite.openDatabase('addressplace.db');
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





// Screen in which items are added, deleted, and selected.
function ListScreen({navigation}) {
  const [address, setAddress] = useState('');
  const [list, setList] = useState([]);
  
  // Update the list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from addresses;', [], (_, { rows }) =>
        setList(rows._array)
      );
    });
  }

  // Save item
  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into addresses (address) values (?);', [address]);
    }, null, updateList
    )
  }

  // Delete item
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from addresses where id = ?;`, [id]);
      }, null, updateList
    )
  }

  // Some logging for ease of debug
  const consoleLogItem = () => {
    console.log("current address")
    console.log(address)
    console.log("current list on our end")    
    console.log(list)
  }

  // Function thing as a base for how an item in the list ought to be rendered.
  _renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => navigation.navigate('Map', {address: item.address})} onLongPress={() => deleteItem(item.id)}>
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
        <ListItem.Subtitle>Press to show, long press to delete.</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )

  // Return start
  return (
    <View style={styles.container}>

      <Input style={{ marginTop: 5, marginBottom: 5, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1 }}
      placeholder='' label='Address' onChangeText={(item) => setAddress(item)} value={address}/>

      <View style={styles.button} >
        <Button style={{width:60}} raised icon={<Icon name="save" color="white"/>} onPress={saveItem} title=" Add"/>
        <Button style={{width:60}} raised icon={<Icon name="article" color="white"/>} onPress={consoleLogItem} title=" Log"/>
      </View>

      <FlatList 
        data={list}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    
    </View>
  ); // end return
}

// The screen on which the map is shown
function MapScreen ({route, navigation}) {

  const { address } = route.params
  const [lat, setLat] = useState(0);
  const [long, setLng] = useState(0);

  const getLocation = async () => {
    try {
      const response = await fetch('http://www.mapquestapi.com/geocoding/v1/address?key=CXzsDeFoor2ieU1z5paecxRjREdagRND&location=' + address);
      const json = await response.json();
      setLat(json.results[0].locations[0].latLng.lat);
      setLng(json.results[0].locations[0].latLng.lng);
    } catch(error) {
      Alert.alert('Error:', error.message); 
    }
    console.log(lat);
    console.log(long);
  }

  // Creating table
  useEffect(() => {
    getLocation();
  }, []);

  return(
    <View style={styles.container}>
        
        <MapView
          style={{ flex:1, flex:1, height:'90%', width:'100%'}}
          region={{
            latitude: lat,
            longitude:long,
            latitudeDelta:0.0322,
            longitudeDelta:0.0221
          }}
        >

        <Marker 
          coordinate={{
            latitude:lat,
            longitude:long
          }}
          title={address}
        />

      </MapView>
    </View>
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