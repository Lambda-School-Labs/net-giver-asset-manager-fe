import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from "react-navigation";
import axios from "axios";
const SingleAsset = ({ data, navigation }) => {

  getAssetImage = () => {
    var currentAssetID = data.id
    axios
      .get(`https://net-giver-asset-mngr.herokuapp.com/api/assets/img/${currentAssetID}`)
      .then(response => {
        var assetImage = response.data;

        // var image = assetImage.map(function (e) {
        //   return e.location
        // });
        console.log('images', assetImage)
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAssetImage();
  }, []);

  // Handles clicking an individual asset in the Dashboard screen
  const showDetails = () => {
    const id = data.id;;
    console.log("ASSET ID:", id);
    navigation.navigate("SingleAssetScreen", { id });
  };

  return (
    <TouchableOpacity onPress={showDetails}>
      <View style={styles.assetWrapper}>
        <View style={styles.imageWrapper} />{data.photo}
        <View style={styles.textWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.assetName}>{data.name}</Text>
            <Text style={styles.assetID}>QR #{data.barcode}</Text>
            <Text>Description: {data.description}</Text>
            <View>
              {data.check_in_status == true ?
                (<View>
                  <Text style={styles.assetName}>Status: Check-In</Text>
                </View>)
                :
                (<View>
                  <Text style={styles.assetName}>Status: Check-Out</Text>
                </View>)
              }
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  assetWrapper: {
    flexDirection: "row",
    marginTop: 25,
    marginLeft: 25
  },
  imageWrapper: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "grey",
    width: 100,
    height: 100
  },
  textWrapper: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 30,
    fontSize: 15
  },
  assetName: {
    fontSize: 15,
    fontWeight: "500"
  },
  assetID: {
    fontSize: 14,
    color: "#7C7777",
    fontStyle: "italic"
  },
  assetDescription: {
    fontSize: 14,
    fontWeight: "normal",
  },
  assetLocation: {
    color: "#82A0FD"
  },
});

export default withNavigation(SingleAsset);