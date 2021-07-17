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

export default function AllFiles({route}){

    const navigation = useNavigation();
    const [images,setImages] = useState(null)
    const [res,setRes] = useState([])

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
                  //})
                  Linking.openURL('content://media/internal/images/media/');
                  }}>
                    <Image source={{uri:item.uri}} style={{height:120,width:"100%"}} />
                </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{position:"absolute",flexDirection:"row",bottom:"5%",right:"5%",padding:10,paddingHorizontal:15,borderWidth:3,borderRadius:100,borderColor:"white"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("Home")} activeOpacity={0.6} style={{marginRight:15}}> 
            <Icon size={25} name="camera" type="font-awesome-5" color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("FileStack")} activeOpacity={0.6}>
            <Icon size={25} name="cloud" type="font-awesome-5" color="white"/>
          </TouchableOpacity>
          </View>

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