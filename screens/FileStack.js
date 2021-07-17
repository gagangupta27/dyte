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
  FlatList,
  Linking,
  Share,
  NativeModules
} from "react-native";
import { Icon } from "react-native-elements";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from '@react-navigation/native';
var RNFS = require('react-native-fs');
//import RNFileStack from 'react-native-filestack';

export default function FileStack({route}){

    const navigation = useNavigation();
    const [images,setImages] = useState(null)
    const [res,setRes] = useState([])
    const [image64,setImage64] = useState(null);

    useEffect(()=>{
      CameraRoll.getPhotos({first:100,groupTypes:"Album",groupName:"DyteScan"}).then((data)=>{
        var dat = data.edges;
        var temp = []
        dat.forEach((id)=>{
          console.log(id.node.image.uri)
          temp.push({uri:id.node.image.uri})
        })
        setImages(temp)
      })
    },[])

    useEffect(()=>{
        //const client = RNFileStack.init("AkQR8RXHRChcDK7xwQhLwz");
        //client.picker().open();
        
        let base64String = "";
        if(images){
          /*
          async function func(){
          const response = await fetch(images[0].uri);
          const blob = await response.blob();
          console.log(blob)
          }
          func();
          */
          RNFS.readFile(images[0].uri, 'base64')
          .then(res =>{
            setImage64(res)
            //console.log(res);
          });

          /*
        const fs = RNFetchBlob.fs;
        let imagePath = null;
        RNFetchBlob.config({
          fileCache: true
          })
  .fetch(images[0].uri)
  .then(resp => {
    // the image path you can use it directly with Image component
    imagePath = resp.path();
    return resp.readFile("base64");
  })
  .then(base64Data => {
    // here's base64 encoded image
    console.log(base64Data);
    // remove the file from storage
    return fs.unlink(imagePath);
  });

          /*
            let document = "";
            let reader = new FileReader();
            reader.readAsDataURL(images[0].uri);
            reader.onload = function () {
                document = reader.result;
                console.log(document)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
    
        fetch('https://www.filestackapi.com/api/file/store/S3?key=AkQR8RXHRChcDK7xwQhLwz', {
          method: 'POST',
          headers: {
            Accept: 'image/png',
            'Content-Type': "image/png"
          },
        body: JSON.stringify({
        key:"AkQR8RXHRChcDK7xwQhLwz",
        filename:"gagan",
        mimetype:"image/jpeg",
        path:""
        })
      });
      */
    }
    },[images])


    return (
        <View style={styles.container}>
          <Text style={{fontSize:24,fontWeight:"bold",color:"white",textAlign:"center",marginBottom:20}}>DyteScan</Text>
          <FlatList
            data={images}
            renderItem={({item,index}) => (
                <TouchableOpacity
                  activeOpacity={0.6}
                  key={item.id}
                  style={{padding:5,width:"33%"}}
                  onPress={async() => {
                    //Linking.openURL('content:' + item.uri);
                    //Linking.openURL('content:' + item.uri.slice(6,));
                    //const path = NativeModules.RNAndroidURIPathModule.getPath(item.uri)
                    //Linking.sendIntent("android.intent.action.VIEW",[{key:item.uri,value:item.uri,number:0,boolean:true}])
                    //const destPath = `${RNFS.TemporaryDirectoryPath}/1)}`;
                    //await RNFS.copyFile(item.uri, destPath);
                    //console.log(await RNFS.stat(destPath));
                    //await RNFS.moveFile(item.uri,"//media/internal/images/media/1").then(()=>{
                    //Linking.openURL('content://media/internal/images/media/1');
                  //})
                  }}>
                    <Image source={{uri:item.uri}} style={{height:120,width:"100%"}} />
                </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} activeOpacity={0.6} style={{position:"absolute",bottom:"5%",right:"5%",padding:10,borderWidth:3,borderRadius:100,borderColor:"white"}}>
            <Icon size={30} name="camera" type="font-awesome-5" color="white"/>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black",
    padding:10
  },
});