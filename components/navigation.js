import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem, Image, Avatar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgressBar from 'react-native-progress/Bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('addressplace.db');

// Screen in which items are added, deleted, and selected.
export default function NavScreen({ route, navigation }) {

    let params = (route.params);

    const materials = [
        {
            name: "Copper Ore",
            amount: 10
        },
        {
            name: "Balsa Log",
            amount: 20
        },
        {
            name: "Copper Bar",
            amount: 10
        },
        {
            name: "Balsa Plank",
            amount: 0
        }
    ]

    const statuschecker = (itemats) => {
        if (params.screen == "Crafting") {
            //console.log(itemats)
            for (i = 0; i < materials.length; i++) {
                //console.log(materials[i]);
                for (i2 = 0; i2 < itemats.length; i2++) {
                    //console.log(itemats[i2]);
                    if (materials[i].name == itemats[i2].name && materials[i].amount < itemats[i2].required) {
                        return "Not enough materials";
                    }
                }
            }
            return "Ready to craft";
        } else {
            return "Ready to go";
        }
    }

    _renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => navigation.navigate(params.screen, item)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{statuschecker(item.materials)}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 20 }}>{params.name}</Text>
            </View>

            <FlatList
                data={params.list}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
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