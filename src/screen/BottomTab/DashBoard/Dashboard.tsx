import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import imageIndex from '../../../assets/imageIndex';
import { color } from '../../../constant';
import {
  Modal,
  Pressable,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';


const DUTY_OPTIONS = [
  { id: 1, label: 'On Duty', icon: 'checkmark-circle', color: '#34C759' },
  { id: 2, label: 'Off Duty', icon: 'close-circle', color: '#FF3B30' },
  { id: 3, label: 'Sleep', icon: 'moon', color: '#FF9500' },
  { id: 4, label: 'Home', icon: 'home', color: '#FF3B30' },
];

const DashboardScreen = () => {
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const [dutyModalVisible, setDutyModalVisible] = useState(false);
// const [selectedDuty, setSelectedDuty] = useState(DUTY_OPTIONS[0]);
const badgeRef = useRef(null);

// const [dutyModalVisible, setDutyModalVisible] = useState(false);
const [badgeLayout, setBadgeLayout] = useState({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});

const [selectedDuty, setSelectedDuty] = useState({
  label: 'On Duty',
  icon: 'checkmark-circle',
  color: '#34C759',
});
  return (
    <SafeAreaView style={styles.container}>
      <StatusBarComponent/>
      {/* Header */}
       <LinearGradient
        colors={[color.primary, color.primary]}
        style={[styles.header, { paddingTop: Platform.OS === 'android' ? insets.top + 10 : 10,
        


        }]}>
         
        <View style={[styles.headerRow,{
          marginBottom:20 ,
          marginHorizontal:10
        }]}>
          
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={imageIndex.menu} style={{height:45, width:45, marginRight:15}}
            
            resizeMode='contain'
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.welcome}>Hello, Welcome 👋</Text>
            <Text style={styles.userName}>Lincoln Bergson</Text>
          </View>
</View>
          <TouchableOpacity>
            <Image source={imageIndex.no1} style={{height:30, width:30, marginRight:0, tintColor:"#fff"}}/>

            {/* <Icon name="notifications-outline" size={24} color="#fff" /> */}
          </TouchableOpacity>
        </View>
      </LinearGradient>
<ScrollView showsVerticalScrollIndicator={false}>
      {/* Content */}
      <View style={[styles.content,]}>
        {/* Dropdown */}
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select Company Rating</Text>
          <Icon name="chevron-down" size={20} color="#777" />
        </TouchableOpacity>

        {/* Driver Card */}
        <View style={[styles.redCard,  {borderBottomLeftRadius:0, borderBottomRightRadius:0, marginBottom:20}]}>
          {/* <View style={styles.iconCircle}> */}
            <Image source={imageIndex.user} style={styles.iconCircle}/>

            {/* <Icon name="person" size={22} color={color.primary}/> */}
          {/* </View> */}
          <View>
            <Text style={styles.cardLabel}>Driver</Text>
            <Text style={styles.cardTitle}>Lincoln Bergson</Text>
          </View>
        </View>

        {/* Company Card */}
        <View style={[styles.redCard,  {borderTopLeftRadius:0, borderTopRightRadius:0}]}>
          {/* <View style={styles.iconCircle}>
            <Icon name="business" size={22} color={color.primary} />
          </View> */}
          <Image source={imageIndex.company} style={styles.iconCircle}/>
          <View>
            <Text style={styles.cardLabel}>Company</Text>
            <Text style={styles.cardTitle}>Swift Transportation Co.</Text>
          </View>
        </View>

        {/* Duty Status */}
        <View style={styles.whiteCard}>
        
          <View style={styles.statusRow}>
            <View style={{flexDirection:'row', }}>
            <Icon name="checkmark-circle" size={100} color="#34C759" />
            <View style={{   justifyContent:'center', paddingTop:20, marginLeft:5}}>
                <Text style={styles.sectionTitle}>Duty Status</Text>
                <Text style={styles.statusText}>On Duty</Text>
            </View>
            </View>
            {/* <View style={styles.badge}>
              <Text style={styles.badgeText}>On Duty</Text>
            </View> */}
            {/* <TouchableOpacity
  style={styles.badge}
  activeOpacity={0.8}
  onPress={() => setDutyModalVisible(true)}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon
      name={selectedDuty.icon}
      size={16}
      color={selectedDuty.color}
      style={{ marginRight: 6 }}
    />
    <Text style={[styles.badgeText, { color: selectedDuty.color }]}>
      {selectedDuty.label}
    </Text>
    <Icon
      name="chevron-down"
      size={16}
      color="#333"
      style={{ marginLeft: 6 }}
    />
  </View>
</TouchableOpacity> */}
<TouchableOpacity
  ref={badgeRef}
  activeOpacity={0.8}
  style={styles.badge}
  onPress={() => {
    badgeRef.current?.measureInWindow((x, y, width, height) => {
      setBadgeLayout({ x, y, width, height });
      setDutyModalVisible(true);
    });
  }}>
  
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Icon
      name={selectedDuty.icon}
      size={16}
      color={selectedDuty.color}
      style={{ marginRight: 6 }}
    />
    <Text style={[styles.badgeText, { color: selectedDuty.color }]}>
      {selectedDuty.label}
    </Text>
    <Icon name="chevron-down" size={16} color="#333" />
  </View>
</TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View style={styles.whiteCard}>
          <Text style={styles.sectionTitle}>Location</Text>

          <View style={styles.locationRow}>
            <Icon name="location-outline" size={24} color={color.primary} />
            <Text style={styles.locationText}>
              New Palasia, Indore, Madhya Pradesh
            </Text>
          </View>

          <View style={styles.locationRow}>
            <Icon name="radio-button-on" size={24} color={color.primary} />
            <Text style={styles.locationText}>
              35 Oak Ave, Antioch, TN 37013
            </Text>
          </View>
        </View>

        {/* RPM */}
        <View style={styles.whiteCard}>
          <Text style={styles.sectionTitle}>RPM (Rate Per Mile)</Text>
          <View style={styles.rpmRow}>
            {/* <Text style={styles.currency}>$</Text>*/}
            <FontAwesome name="dollar" size={18} color={color.primary} /> 
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              style={styles.rpmInput}
            />
            <View style={{marginRight:10}}>
              <FontAwesome name="caret-up" size={18} color={color.primary} />
              <FontAwesome name="caret-down" size={18} color={color.primary} />
              {/* <Icon name="chevron-up" size={18} /> */}
              {/* <Icon name="chevron-down" size={18} /> */}
            </View>
          </View>
        </View>

             <View style={[styles.redCard, { marginBottom:20}]}>
             <Image source={imageIndex.multiUser} style={styles.iconCircle}/>

       
          <View>
            <Text style={styles.cardLabel}>Active Drivers</Text>
            <Text style={[styles.cardTitle, {fontSize:40}]}>58</Text>
            <Text style={styles.cardTitle}>Drivers in California</Text>
          </View>
        </View>

      </View>
      </ScrollView>
 <Modal
  visible={dutyModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setDutyModalVisible(false)}
>
  <Pressable
    style={styles.modalOverlay}
    onPress={() => setDutyModalVisible(false)}
  />

  <View
    style={[
      styles.dutyDropdown,
      {
        top: badgeLayout.y + badgeLayout.height + 8,
        left: badgeLayout.x + badgeLayout.width - 200,
      },
    ]}
  >
    {DUTY_OPTIONS.map(item => (
      <TouchableOpacity
        key={item.label}
        style={styles.dutyItem}
        onPress={() => {
          setSelectedDuty(item);
          setDutyModalVisible(false);
        }}
      >
        <Icon
          name={item.icon}
          size={22}
          color={item.color}
          style={{ marginRight: 12 }}
        />
        <Text style={styles.dutyLabel}>{item.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
</Modal>
    </SafeAreaView>
  );
};

export default DashboardScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
   },

  header: {
     paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  
     },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   },

  welcome: {
    color: '#fff',
    fontSize: 14,
  },

  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },

  content: {
    padding: 16,
  },

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  dropdownText: {
    color: '#888',
  },

  redCard: {
    backgroundColor: '#ff3b3b',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconCircle: {
    // backgroundColor: '#fff',
    width: 60,
    height: 60,
    // borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  cardLabel: {
    color: '#ffdede',
    fontSize: 12,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  whiteCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },

  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 0,
    flex: 1,
  },

  badge: {
    backgroundColor: '#eafaf1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: '600',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor:'#F7F8F8',
    padding :20,
    borderRadius:10
  },

  locationText: {
    marginLeft: 8,
    color: '#555',
    flex: 1,
  },

  rpmRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
  },

  currency: {
    fontSize: 16,
    marginRight: 6,
  },

  rpmInput: {
    flex: 1,
    fontSize: 16,
  },
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.15)',
},

dutyDropdown: {
  position: 'absolute',
  width: 200,
  backgroundColor: '#fff',
  borderRadius: 18,
  paddingVertical: 8,

  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.2,
  shadowRadius: 15,
  elevation: 12,
},

dutyItem: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 14,
  paddingHorizontal: 16,
},

dutyLabel: {
  fontSize: 15,
  fontWeight: '500',
  color: '#000',
},

});
