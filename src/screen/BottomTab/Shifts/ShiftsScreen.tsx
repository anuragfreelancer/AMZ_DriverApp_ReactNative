import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import imageIndex from "../../../assets/imageIndex";

const TABS = ["Completed", "Upcoming", ];

const ShiftsScreen = () => {
  const [activeTab, setActiveTab] = useState("Completed");
  const [search, setSearch] = useState("");

  const DATA = [
    {
      id: 1,
      title: "LittleSteps Child Care Unit",
      date: "Friday, 2 February 2025",
      time: "9:00 AM – 3:00 PM",
      status: "Completed",
    },
    {
      id: 2,
      title: "LittleSteps Child Care Unit",
      date: "Friday, 2 February 2025",
      time: "9:00 AM – 3:00 PM",
      status: "Completed",
    },
    {
      id: 3,
      title: "Institution A - Downtown Clinic",
      date: "Monday, Feb 19, 9:00 AM - 1:00 PM",
      time: "",
      status: "Upcoming",
    },
  ];

  const filteredData = DATA.filter((item) => {
    return (
      item.status === activeTab &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  });
const ShiftCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardInner}>
        {/* Icon */}
        <View style={styles.iconCircle}>
          <Image
            source={imageIndex.calneder}
            style={{ height: 26, width: 26, tintColor: "white" }}
          />
        </View>

        {/* Info */}
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardTitle}>{item.title}</Text>

          {item.time &&           <Text style={styles.cardTime}>{item.time}</Text>
 }
 {item.status == "Completed" ? 

  <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View> :  
          
          <View style={[styles.statusBadge,{
            backgroundColor:"#F3178B" ,
            flexDirection:"row" ,
            alignItems:"center"
          }]}>
            <Text style={styles.statusText}>{item.status}</Text>
            <Image style={{
              height:18,
              width:18 ,
              resizeMode:"contain" ,
              marginTop:5 ,
              marginLeft:5
            }} source={imageIndex.mess1}/>
          </View>
}
        
        </View>
      </View>
    </View>
  );
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
 
      {/* Tabs */}
    

       

 
 <View style={{
  marginTop:15
 }}> 
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 15 }}
        data={[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ShiftCard item={item} />}
      />
      </View>
    </SafeAreaView>
  );
};

// ---------------- CARD COMPONENT ------------------


// ---------------- STYLES --------------------

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  // Tabs
  tabWrapper: {
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    padding: 5,
    borderRadius: 40,
    width: "90%",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#FF1FA3",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#999",
  },
  activeTabText: {
    color: "white",
  },

  // Search
  searchInput: {
    marginTop: 15,
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 10,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginVertical: 10,
borderWidth:0.1,
borderColor:"#000",
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
     // Android shadow
   },
  cardInner: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconCircle: {
    height: 45,
    width: 45,
    backgroundColor: "#00D1FF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  cardTitle: {
    fontSize: 13,
    color: "#000",
    marginTop: 3,
    fontWeight: "600",
  },
  cardTime: {
    marginTop: 8,
    fontSize: 13,
    color: "#777",
  },

  statusBadge: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#1CDE65",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems:"center"
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
});

export default ShiftsScreen;
