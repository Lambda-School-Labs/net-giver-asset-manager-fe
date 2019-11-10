import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button, AsyncStorage } from "react-native";
import axios from "axios";
import AssetsCard from "../AssetsCard";
import { ListItem } from "react-native-elements";
import { withNavigation } from 'react-navigation';

const SingleAssetCard = (props) => {

    const [userId, setUserId] = useState(0)

    useEffect(() => {
        console.log('useeffect run')
        AsyncStorage.getItem("user_id")
            .then(response => {
                var userId = JSON.parse(response);
                setUserId(userId);

            })
            .catch(error => {
                console.log(error)
            });
    }, []);


    if (props.navigation.state.params) {
        var currentAssetId = props.navigation.state.params.id
    }



    const [assets, setAssets] = useState({ id: currentAssetId });
    const assetHistory = { asset_id: currentAssetId, user_id: userId }
    const [assetStatus, setAssetStatus] = useState({});




    const checkInStatus = () => {

        var statusAsset = assets.map(function (e) {

            if (e.check_in_status == true) {
                return e.check_in_status = { check_in_status: false };
            } else {
                return e.check_in_status = { check_in_status: true };
            }
        });

        var AssetID = assets.map(function (ids) {

            return ids.id;

        });


        var newObj = Object.assign({}, ...statusAsset);

        axios
            .put(`https://net-giver-asset-mngr.herokuapp.com/api/assets/${AssetID}`, newObj)
            .then(response => {
                console.log('Updated Check In Status', newObj)

            })
            .catch(error => {
                console.log(error);
            });


        axios
            .post("https://net-giver-asset-mngr.herokuapp.com/api/history/", assetHistory)
            .then(response => {
                console.log("New Asset History Added!")
            })
            .catch(error => {
                console.log(error);
            });


    }



    // Fetch assets
    const getAssetsList = () => {
        axios
            .get(`https://net-giver-asset-mngr.herokuapp.com/api/assets/${currentAssetId}`)
            .then(response => {

                setAssets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAssetsList();
    }, []);




    return (
        <View>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerTitle}>Single Asset Overview</Text>
            </View>

            <FlatList
                keyExtractor={(item, index) => item.id}
                data={assets}
                renderItem={({ item }) => {
                    return <AssetsCard data={item} />;
                }}
            />
            <Button
                title="RETURN and ADD ASSET HISTORY"
                onPress={checkInStatus}

            />

        </View>
    );
};

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: "row",
        backgroundColor: "#3366FF",
        borderBottomColor: "black",
        height: 95
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: "center",
        flex: 9,
        paddingLeft: 20,
        color: "white"
    }
});

export default withNavigation(SingleAssetCard);

