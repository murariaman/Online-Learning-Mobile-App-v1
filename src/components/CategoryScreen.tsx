import * as React from 'react';
import { Text, View, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import CustomIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../utils/Color';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const CategoryScreen = (props: any) => {
  const {navigation, route, name, allSubjectInfo} = props;
  return (
    <View style={styles.categoryScreen}>
        <FlatList 
            data={allSubjectInfo}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            renderItem={ ({ item: subjectInformation }) => {
                return(
                    <>
                    <View> 
                       <View style={styles.categoryViewStyle}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate(`${name}`, {subjectId: subjectInformation.subject_id})}>
                                <Text style={styles.subjectName}>{subjectInformation.subject_name}</Text>
                                <Text style={styles.teacherName}>{subjectInformation.teacher_name}</Text>
                                <Text></Text>
                                <View style={styles.iconView}>
                                    <Text style={styles.icon}>
                                        <MaterialIcon name='laptop' size={40} color={Colors.darkColor()} />
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    </>
                )
            }}
            keyExtractor={ (item, index) => index.toString() }
        />
    </View>
  );
};

const styles = StyleSheet.create({
    categoryScreen: {
    },
    // mainRow: {
    //     display: 'flex', 
    //     flexDirection: 'row', 
    //     justifyContent: 'space-between'
    // },
    subjectName: {
        fontSize: 16, 
        color: Colors.black(), 
        fontWeight: '700'
    },
    teacherName: {
        fontSize: 12, 
        paddingTop: 4
    },
    iconView: {
        width: '100%', 
        height: 70,
        alignItems: 'center'
    },
    icon: {
        textAlign: 'left', 
        marginLeft: 5,
    },
    categoryViewStyle: {
        backgroundColor: '#F2F2FA',
        width: Dimensions.get('screen').width/2.25,
        height: 160,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: Colors.blueShadow(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginRight: 15,
    },
});

export default CategoryScreen;