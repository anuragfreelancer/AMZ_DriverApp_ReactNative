import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';
import SearchBar from '../../../compoent/SearchBar';
import { color } from '../../../constant';
import { SafeAreaView } from 'react-native-safe-area-context';
import imageIndex from '../../../assets/imageIndex';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../../routes/screenName.enum';
import { useSelector } from 'react-redux';
import { getApi } from '../../../api/getApi/getApi';
import moment from 'moment';
import LoadingModal from '../../../utils/Loader';
 

export default function InvoiceScreen() {
  const [activeTab, setActiveTab] = useState<'paid' | 'unpaid'>('paid');
  const [search, setSearch] = useState('');
  const auth = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const [data, setData] = useState()
  const filteredInvoices = data?.filter(item =>
    item?.customer_name?.toLowerCase().includes(search.toLowerCase())
  );



useFocusEffect(
  useCallback(() => {
    fetchInvoice();

    // optional cleanup
    return () => {
      // cleanup if needed
    };
  }, [])
);


  const fetchInvoice = async () => {

    const res = await getApi('user/get_invoices_by_user', setLoading, auth?.token, 'POST');
    if (res?.success) {
      // console.log(res, 'res==============')
      setData(res?.data);
    }
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}
      onPress={() => navigation.navigate(ScreenNameEnum.InvoiceDetail, {pdfUrl:item?.pdf_url})}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image source={imageIndex.docCircle} style={styles.iconBox} />

        <View style={{ marginLeft: 10 }}>
          <Text style={styles.invoiceNo}>{item.customer_name}</Text>
          <Text style={styles.date}>{moment(item?.created_at).format('DD-MM-YYYY')}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', display: activeTab == "paid" ? "none" : "flex" }}>
        <Image source={imageIndex.card} style={{ height: 20, width: 20, marginRight: 5 }} />
        <Text style={[styles.date,]}>Pay Now</Text>

      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Invoice</Text>
{loading && <LoadingModal/>}
      {/* Tabs */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'paid' && styles.activeTab]}
          onPress={() => setActiveTab('paid')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'paid' && styles.activeTabText,
            ]}
          >
            Paid Invoice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'unpaid' && styles.activeTab]}
          onPress={() => setActiveTab('unpaid')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'unpaid' && styles.activeTabText,
            ]}
          >
            Unpaid Invoice
          </Text>
        </TouchableOpacity>
      </View> */}
      <SearchBar value={search} onSearchChange={setSearch}/>
      {/* List */}
      <FlatList
        data={filteredInvoices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: {
    fontSize: 26,
    fontFamily: 'bold',
    marginBottom: 0
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 35,
    marginBottom: 20,
    padding: 10
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center'
  },
  activeTab: { backgroundColor: color.primary },
  tabText: { fontSize: 14, fontWeight: 'bold', color: '#444' },
  activeTabText: { color: '#fff' },
  search: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  iconBox: {
    width: 40,
    height: 40,
  },
  iconText: { fontSize: 18, color: '#fff' },
  invoiceNo: { fontSize: 16, fontWeight: 'bold', color: '#352C48' },
  date: { fontSize: 13, color: '#666', fontWeight: '600', },
});
