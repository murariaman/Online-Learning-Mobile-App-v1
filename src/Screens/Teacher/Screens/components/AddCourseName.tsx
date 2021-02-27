import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import { TextInput, FAB } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../../../utils/Color';
import SecondHeader from '../../../../components/SecondHeader';

const {width, height} = Dimensions.get('screen');
const AddCourseName = (props: any) => {
    const {setCourseName} = props;
    return (
        <>
        <StatusBar backgroundColor={Colors.headerBlue()} barStyle='light-content' />
        <SafeAreaView style={styles.container}>
            <SecondHeader 
                blank={true}
            />
            <View style={styles.mainBody}>
                <ScrollView style={{}}>
                    <View style={styles.categoryBody}>

                        <View style={[styles.addNewCourseForm]}>
                            <TextInput 
                                label={'Course Name'}
                                onChangeText={(name) => console.log(name)}
                                style={styles.textInputStyle}
                            />
                        </View>
                        <FAB
                            style={styles.fab}
                            icon="chevron-right"
                            onPress={() => console.log('Pressed')}
                        />

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        </>
    );
};

export default AddCourseName;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    IntroductionMsg: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 15,
    },
    mainBody: {
        width,
        minHeight: height * .75, 
        backgroundColor: Colors.F9Background(), 
        borderTopRightRadius: 30, 
        position: 'relative', 
        top: -30
    },
    categoryBody: {
        marginTop: 15, 
        paddingLeft: 15, 
        paddingRight: 15,
        marginBottom: 130
    },
    addNewCourseForm: {
        marginTop: 10,
        minHeight: height * .75, 
    },
    textInputStyle: {
        borderTopRightRadius: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
