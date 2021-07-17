import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid, 
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import CameraRoll from "@react-native-community/cameraroll";
var RNFS = require('react-native-fs');
import { useNavigation } from '@react-navigation/native';

export default function SaveImage({route}){

    const navigation = useNavigation();
    const [name,setName] = useState(String(new Date()))

    const save =async () =>{
      if(name.length == 0){
        Alert.alert("","File name cannot be blank.");
      }else{
       await RNFS.moveFile(route.params.image,route.params.image.slice(0,35)+name+".png").then(()=>{
        savePicture();
        navigation.navigate("AllFiles")
       })
      }
    }

    async function hasAndroidPermission() {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
    
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }
    
    async function savePicture() {
      if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
    
      CameraRoll.save(route.params.image.slice(0,35)+name+".png", {album:"DyteScan" })
    };

    useEffect(()=>{
        var d = new Date(),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
    
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
    
        setName([day,month,year].join("-"));
    })


      return (
        <View style={styles.container}>
          <View style={{width:"80%",alignSelf:"center",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:"10%"}}>
            <TextInput 
              value={name}
              onChangeText={setName}
              style={{color:"white",textAlign:"center",fontSize:24,margin:0,padding:0}}
            />
            <Text style={{color:"white",fontSize:24,marginRight:15}}>.png</Text>
            <Icon size={25} name="pen" type="font-awesome-5" color="white"/>
          </View>
        <Image
          style={styles.container}
          source={{ uri: route.params.image }}
          resizeMode="contain"
        />
          <TouchableOpacity onPress={save} activeOpacity={0.6} style={{position:"absolute",bottom:"7%",right:"10%",paddingVertical:5,paddingHorizontal:15,borderWidth:3,borderColor:"white",borderRadius:25}}>
            <Text style={{fontWeight:"bold",fontSize:18,color:"white"}}>Save</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
});