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
  Linking
} from "react-native";
import { Icon } from "react-native-elements";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from '@react-navigation/native';

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
                  onPress={() => {
                    Linking.openURL('media:' + item.uri.slice(6,));
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