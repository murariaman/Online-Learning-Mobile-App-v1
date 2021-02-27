import * as React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Colors from '../../utils/Color';

const degreeData = [
    {
        id: 1,
        degree: 'AB',
        name: 'Abc Academy',
    },
    {
        id: 2,
        degree: 'AB',
        name: 'Abc Academy',
    },
    {
        id: 3,
        degree: 'AB',
        name: 'Abc Academy',
    },
    {
        id: 4,
        degree: 'AB',
        name: 'Abc Academy',
    }
]

const DegreeSection = (props: object) => {
  return (
    <View style={styles.container}>
      <Text style={styles.degreeTitle}>Popular Courses</Text>
      <View style={styles.degreeView}>
          <FlatList 
            data={degreeData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index}) => {
                return (
                    <View style={styles.degreeSection}>
                        <View style={styles.insideDegreeSection}>
                            <Text style={styles.degreeHeading}>ABC Academy</Text>
                            <Text style={styles.degree}>UG</Text>
                        </View>
                    </View>
                );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
      </View>
    </View>
  );
};

export default DegreeSection;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    degreeTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    degreeView: {
        marginTop: 20,
        marginBottom: 20,
    },
    degreeSection: {
        width: 150,
        height: 120,
        marginRight: 20,
        borderRadius: 10,
    },
    insideDegreeSection: {
        backgroundColor: Colors.appWhite(),
        shadowColor: Colors.darkBlue(),
        width: '100%',
        height: '100%',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    degreeHeading: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 13,
    },
    degree: {
        textAlign: 'center'
    },
});
