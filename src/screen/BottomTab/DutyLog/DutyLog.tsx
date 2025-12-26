import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import LoadingModal from '../../../utils/Loader';
import CustomHeader from '../../../compoent/CustomHeader';
import LogEntryCard from './Card';

const DutyLog = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(false)
    const isLogin = useSelector((state: any) => state?.auth);



    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? <LoadingModal /> : null}

            <StatusBarComponent />
            <CustomHeader
                label="Duty Log"

            />
            <FlatList
            data={[0,1]}
            renderItem={({item})=><LogEntryCard/>}
            style={{paddingHorizontal:15}}
            />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',

    },

});

export default DutyLog;
