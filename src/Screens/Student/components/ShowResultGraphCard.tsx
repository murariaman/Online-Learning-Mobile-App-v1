import * as React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import Colors from '../../../utils/Color';

const ShowResultGraphCard = () => {
    return (
        <View style={styles.mainCard}>
            <Text>Want to See the Progress ? </Text>
            <Button
                onPress={() => {
                    Alert.alert('Cooming Soon', 'This features is in Beta...')
                }}
                style={{position: 'relative', top: -8,}}
                >
                <Text style={{color: Colors.extremeBlue()}}>Click Here</Text>
            </Button>
        </View>
    );
};

export default ShowResultGraphCard;

const styles = StyleSheet.create({
    mainCard: {
        backgroundColor: Colors.white(), 
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginBottom: 15,
    }
});
