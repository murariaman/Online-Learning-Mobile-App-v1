import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Colors from '../utils/Color';
const {width} = Dimensions.get('screen');
const SecondHeader = (props: any) => {
    const {mainText, secondText, welcomeMSG, blank} = props;
    return (
        <>
        {blank ? (
            <View style={styles.upperTopBlank}>
                <View style={{marginTop: 5}}>
                </View>
            </View>
        )
        : (
            <View style={styles.upperTop}>
                <View style={{marginTop: 5}}>
                    {mainText ? <Text style={styles.mainTextStyle}>{mainText}</Text> : null}
                    {secondText ? <Text style={styles.secondTextStyle}>{secondText}</Text> : null}
                    {welcomeMSG ? 
                        <Text style={styles.nameMessage}>Welcome, <Text>{welcomeMSG}</Text></Text>
                    : null }
                </View>
            </View>
        )}
        </>
    );
};

export default SecondHeader;

const styles = StyleSheet.create({
    upperTop: {
        width, 
        height: 80, 
        backgroundColor: '#4B83F2', 
        paddingRight: 15, 
        paddingLeft: 15
    },
    upperTopBlank: {
        width, 
        height: 37, 
        backgroundColor: '#4B83F2', 
        paddingRight: 15, 
        paddingLeft: 15
    },
    nameMessage: {
        color: Colors.black(),
        marginTop: 5,
        fontSize: 17,
        fontWeight: '600',
    },
    mainTextStyle: {
        color: Colors.black(),
        fontWeight: '600',
    },
    secondTextStyle: {
        color: Colors.black(),
        fontWeight: '600',
    },
});
