import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Text
} from "react-native";
import RNDocumentScanner from "react-native-document-scanner";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';

export default function Home(){
    
    const navigation = useNavigation();
    const [timer,setTimer] = useState(null)
    const [isCropping,setIsCropping] = useState(false)
    const [ref,setRef] = useState(null)

    const startImageCropping = () => {
      ref.cropImage().then(({ image }) => {
        navigation.navigate("SaveImage",{image})
          setIsCropping(false)
          ref.restart();
      });
    };

    useEffect(()=>{
      if(timer == 3){
        setTimeout(()=>{
          setTimer(2)
        },1000)
        setTimeout(()=>{
          setTimer(1)
        },2000)
        setTimeout(()=>{
          setTimer(null)
        },3000)
      }
    },[timer])


      return (
        <View style={styles.container}>
          <RNDocumentScanner
            ref={(ref) => setRef(ref)}
            onStartCapture={() =>{setTimer(3);}}
            onEndCapture={() =>{
                setIsCropping(true)
            }}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
          />
          {/*(isCapturing || isValidatingImageCropping) && (
            <ActivityIndicator style={styles.loading} animating />
          )*/}
          {isCropping ?
          <TouchableOpacity onPress={()=>{setIsCropping(false); ref.restart();}} activeOpacity={0.6} style={{position:"absolute",bottom:"7%",left:"10%",paddingVertical:5,paddingHorizontal:15}}>
            <Icon size={30} name="times" type="font-awesome-5" color="white"/>
          </TouchableOpacity> :
          <TouchableOpacity onPress={()=>navigation.navigate("AllFiles")} activeOpacity={0.6} style={{position:"absolute",bottom:"5%",left:"12%",padding:20}}>
          <Icon size={30} name="images" type="font-awesome-5" color="white"/>
          </TouchableOpacity>}
          <Text style={{fontWeight:"bold",position:"absolute",top:20,fontSize:22,right:10}}>DyteScan</Text>
          {isCropping &&
          <TouchableOpacity onPress={startImageCropping} activeOpacity={0.6} style={{position:"absolute",bottom:"7%",right:"10%",paddingVertical:5,paddingHorizontal:15,borderWidth:3,borderColor:"white",borderRadius:25}}>
            <Text style={{fontWeight:"bold",fontSize:18,color:"white"}}>Continue</Text>
          </TouchableOpacity>}
          <Text style={{fontSize:100,fontWeight:"800",position:"absolute",alignSelf:"center",top:"30%"}}>{timer}</Text>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
});