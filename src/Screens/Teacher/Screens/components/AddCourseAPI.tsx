import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import SecondHeader from '../../../../components/SecondHeader';
import Colors from '../../../../utils/Color';

const {width, height} = Dimensions.get('screen');
const AddCourseAPI = ({navigation}: any, props: any) => {
    const {courseName} = props;
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
                        <View style={styles.addNewCourseForm}>
                            <Formik
                                initialValues={{ courseName: courseName, batchID: '' }}
                                onSubmit={(values) => {
                                    console.log(values)
                                    Alert.alert('Will be available on Production Mode')
                                }}
                                >
                                {({handleChange, handleBlur, handleSubmit, values}) => (
                                    <View>
                                        <TextInput 
                                            label={'Batch ID'}
                                            onChangeText={handleChange('batchID')}
                                            onBlur={handleBlur('batchID')}
                                            value={values.batchID}
                                            style={styles.textInputStyle}
                                        />
                                        <Button 
                                            onPress={handleSubmit} 
                                            mode="contained"
                                            style={styles.submitBtn}
                                            >
                                            <Text>Add A New Course</Text>
                                        </Button>
                                    </View>
                                )}
                            </Formik>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        </>
    );
};

export default AddCourseAPI;

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
        marginTop: 10
    },
    textInputStyle: {
        borderTopRightRadius: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    submitBtn: {
        position: 'relative',
        bottom: 0,
        backgroundColor: Colors.darkBlue(),
        height: 40,
        borderRadius: 5,
    },
});
