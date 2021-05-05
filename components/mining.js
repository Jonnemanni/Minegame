import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem } from'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('addressplace.db');

// Screen in which items are added, deleted, and selected.
export default function MineScreen({ route, navigation }) {
    const [progress, setProgress] = useState(0);
    const power = 1;
    const strength = 10;
    const [barProg, setBarProg] = useState(0);
    let params = (route.params);

    
    // Creating table
    useEffect(() => {
      db.transaction(tx => {
        tx.executeSql('select * from addresses;', [], (_, { rows }) =>
          console.log(rows._array)
        );
      });
    }, []);
    
    // Update the progress bar
    const updateProgress = () => {
        let newProg = (progress+power);
        // For some reason, just doing staright setProgress and then setBarProg
        // doesn't take into account the change in Progress
        if (newProg >= strength) {
            setProgress(0);
            setBarProg(0)
            Alert.alert("You mined up some " + params.item + ".");
        } else {
            setBarProg(newProg/strength);
            setProgress(newProg);
        }
    }

    const logstuff = () => {
        console.log(progress + " / " + strength)
        console.log(progress/strength)
        console.log(barProg + " / 1")
    }

    return (
      <View style={styles.container}>
        <View style={{marginBottom:80}}>
          <Text style={{fontSize:30, fontWeight:"bold"}}>{params.name}</Text>
        </View>

        <ProgressBar progress={barProg} width={300} />
        
        <View style={styles.button}>
            <TouchableOpacity containerStyle={{height:200,width:200}} 
                title=" Mine "
                onPress={() => updateProgress()}
            >
                <Image source={require('../assets/placeholder32x32.png')}
                style= {{
                    height: 200,
                    width: 200,
                }}
                />
            </TouchableOpacity>
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
    justifyContent: 'center'
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
    margin:20,
  },
});