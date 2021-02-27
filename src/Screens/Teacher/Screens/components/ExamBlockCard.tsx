import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentDate } from '../../../../utils/Utilities';
import Colors from '../../../../utils/Color';

const ExamBlockCard = (props: any) => {
    const {navigation, assignmentDetails} = props;

    const compareDate = (lastDate) => {
        const current = getCurrentDate();
        // logic goes here
        return true;
    }

    return (
        <View style={styles.whiteBody}>
            <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ParticularExamView', {
                    assignmentDetails: assignmentDetails
                })}
                >
                <View style={{padding: 15, paddingLeft: 15, paddingRight: 15}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, fontWeight: '700', color: Colors.extremeBlue()}}>{assignmentDetails.file_name}</Text>
                        {compareDate(assignmentDetails.last_date) ? 
                            <Text style={{color: 'red'}}>Completed</Text> 
                        :
                            <Text style={{color: 'green'}}>On going</Text> 
                        }
                    </View>
                    <Text style={{marginTop: 10}}>{'Published on : ' + assignmentDetails.published_on}</Text>
                    <Text style={{marginTop: 3}}>{'Due Date : ' + assignmentDetails.last_date}</Text>
                    <Text numberOfLines={5}>{assignmentDetails.details}</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default ExamBlockCard;

const styles = StyleSheet.create({
    whiteBody: {
        backgroundColor: Colors.white(), 
        borderRadius: 10,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 20,
    },
});
