import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { axios } from '@/constants/axios';
import { FontAwesome } from '@expo/vector-icons';
import { useFilesystem } from '@/store/filesystem';
type File = {
  name: string
  type: "folder" | "file"
  path: string
}


export default function TabTwoScreen() {
  const {path,setPath,setFileslist,fileslist} = useFilesystem()

  useEffect(() => {
  axios.post("/filelist",{path}).then((res) => {
    setFileslist(res.data)
  }).catch((err) => {
    console.log(err)
  })

  },[path])
  return (
    <ScrollView style={styles.container} >
      {
      fileslist.map((file) => {
        return <TouchableOpacity key={file.path} onPress={()=>{if(file.type == "folder"){setPath(file.path)}}} style={styles.card}>
            <FontAwesome name={file.type}  size={file.type =="folder"?35:25} style={{height:35,width:35}} color={"#2a9d8f"} />
              <Text style={{fontSize:20}}>{file.name}</Text>
          </TouchableOpacity>
      })
      }
      <View style={{height:0 , marginTop:30}}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    backgroundColor:"#eee"
  },
  card:{
    borderRadius:15,
    marginTop:5,
    backgroundColor:"white",
    padding:12,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    gap:10,
  }
});
