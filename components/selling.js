import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Input, Button, Icon, ListItem, Image, Avatar } from 'react-native-elements';

// Screen in which items are added, deleted, and selected.
export default function ShopScreen({ route, navigation }) {

    // List. Name and Amount are self explanatory and not used much.
    // Value is the items base price. Flux is added to the base price and variable.
    // Now an useState variable that should update the rendering when changed.
    const [materials, setMaterials] = useState(
        [
            {
                name: "Copper Ore",
                amount: 10,
                value: 5
            },
            {
                name: "Balsa Log",
                amount: 20,
                value: 5
            },
            {
                name: "Copper Bar",
                amount: 10,
                value: 10
            },
            {
                name: "Balsa Plank",
                amount: 0,
                value: 10
            }
        ]
    );

    //This will adjust the flux values of each item to adjust the prize.
    const prizerandomizer = (pressed) => {

        // Getting an internal materials list to edit before we push it in.
        let inmat = materials

        // Looping through the inmat list.
        for (i = 0; i < inmat.length; i++) {
            console.log("Working on: " + inmat[i].name)
            //Variable for what will be the new flux.
            let newflux

            // The item we pressed can only go down in price. (We sold this item.)
            if (inmat[i].name == pressed) {
                //Random value that is between 1 and half the items value.
                let rand = Math.floor(Math.random() * (inmat[i].value/2-1))+1
                // Newflux is equal to the old flux - rand.
                newflux = inmat[i].flux - rand
                console.log("THING WE PRESSED. Rand is: " + rand + ". Newflux is :" + newflux);
            } else {
                //Random value that is between 1 and half the items value.
                let rand = Math.floor(Math.random() * (inmat[i].value/2-1))+1
                // Getting 1 or -1 to randomly determine positive or negative.
                let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                //Applying the randomly chosen plus or minus to rand.
                rand = rand * plusOrMinus
                // newflux is old flux + rand, rand may be a negative.
                newflux = inmat[i].flux + rand
                console.log("OTHER THING. Rand is: " + rand + ". Newflux is :" + newflux);
            }

            if (newflux > inmat[i].value/2) {
                //If the new flux is more than half the items value, bring it down to half.
                newflux = Math.floor(inmat[i].value/2)
                console.log("We found a newflux too high. " + newflux)
            } else if (newflux < inmat[i].value/2*-1) {
                //If the new flux is less than half the items value negative, bring it up to half negative.
                newflux = Math.floor(inmat[i].value/2*-1)
                console.log("We found a newflux too low. " + newflux)
            }
            //Applying new flux in place of old flux.
            inmat[i].flux = newflux
        }
        console.log("----------------------------")
        // And finally set materials.
        console.log(inmat);
        setMaterials(inmat)
    }

    const log = () => {
        console.log(materials);
    }

    _renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => prizerandomizer(item.name)}>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>Current price is at {item.value}.</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <View style={{alignItems:"center"}}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>The Shopfront</Text>
                <Text style={{color:"#878787"}}>Short press to sell.</Text>
            </View>

            <FlatList
                data={materials}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
            />

            <View style={styles.button}>
              <Button
                title="Log"
                raised="true"
                onPress={() => log()}
              />

              <Button title="press" onPress={() => change()} />
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