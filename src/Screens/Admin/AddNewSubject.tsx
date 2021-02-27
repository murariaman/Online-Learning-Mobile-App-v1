import React, {useState, useContext, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, List } from 'react-native-paper';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Context';
import CommonHeader from '../../components/StudentCommonHeader';
import SecondHeader from '../../components/SecondHeader';
import TextField from '../../components/TextInput';
import Colors from '../../utils/Color';
import Loader from '../../components/Loader';
const {width, height} = Dimensions.get('screen');

export const AddNewSubject = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allTeacher, setAllTeacher] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const getAllTeachersInformation = async () => {
    setLoading(true)
    const teacherArray: any = [];
    try {
      const allSubjects = 
        await firestore()
        .collection('Users')
        .where('admin_id', '==',user.uid)
        .get();
      allSubjects.forEach((res: any) => {
        const { name, user_id } = res.data();
        teacherArray.push({
          name,
          user_id
        });
      })
      setAllTeacher(teacherArray);
      // console.log(teacherArray)
      setLoading(false);
    } catch(e) {
      console.log(e)
    }
  };

  useEffect(() => {
    try{
      getAllTeachersInformation()
    } catch(e){
      console.log(e)
    }
  }, []);

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
    <KeyboardAvoidingView>
        <SafeAreaView style={styles.container}>
            <CommonHeader
                back={true}
                backgroundColor="#4B83F2"
                title="Add New Subject"
                fontColor={'#F2F2F2'}
                navigation={navigation}
                bookmark={true}
                notification={true}
            />
            <SecondHeader 
                blank={true}
            />
            <View style={styles.mainBody}>
                <View style={{marginTop: 20}}>
                <View style={ styles.FormArea }>
                <>
                    {/* FORM BODY */}
                    <Formik
                    initialValues={{
                        teacher_name: '',
                        teacher_id: '',
                        subject_name: '',
                        subject_id: '',
                        batch_id: '',
                        admin_id: user.uid
                    }}
                    onSubmit={async (values) => {
                    try{
                      if(values.batch_id === '' || values.subject_id === '' || values.subject_name === '' || values.teacher_id === '' || values.teacher_name === '') {
                        Alert.alert('Warning', 'Empty Field')
                      } else {
                        // console.log(values)
                        firestore()
                          .collection('subject_details')
                          .add(values)
                          .then(() => {
                            // values.teacher_name = '',
                            // values.teacher_id = '',
                            // values.subject_name = '',
                            // values.subject_id = '',
                            // values.batch_id = '',
                            Alert.alert('Done', 'Subject Details Added Successfully!')
                          })
                          .catch((error) => {
                            console.log(error)
                            Alert.alert('ERROR', 'Add New Subject')
                          });
                      }
                    } catch(e) {
                      console.log(e)
                    }
                  }}>
                  {({handleChange, handleSubmit, setFieldValue, values}) => (
                      <View>
                          <View>
                              <List.Section>
                                <List.Accordion
                                  title="Select a Teacher"
                                  expanded={expanded}
                                  onPress={handlePress}
                                  >
                                  {allTeacher.map((individualTeacher) => 
                                    <List.Item 
                                      key={individualTeacher.user_id} 
                                      title={individualTeacher.name} 
                                      onPress={() => {
                                        console.log(individualTeacher.user_id)
                                        values.teacher_id = individualTeacher.user_id
                                        values.teacher_name = individualTeacher.name
                                        handlePress()
                                      }}
                                    />
                                  )}
                                </List.Accordion>
                              </List.Section>

                              <TextField
                                label="Teacher Name"
                                handleChange={handleChange('teacher_name')}
                                value={values.teacher_name}
                                style={styles.inputBackground}
                              />

                              <TextField
                                label="Teacher Id"
                                handleChange={handleChange('teacher_id')}
                                value={values.teacher_id}
                                style={styles.inputBackground}
                              />

                              <TextField
                                label="Batch Id"
                                handleChange={handleChange('batch_id')}
                                value={values.batch_id}
                                style={styles.inputBackground}
                              />  

                              <TextField
                                label="Subject Name"
                                handleChange={handleChange('subject_name')}
                                value={values.subject_name}
                                style={styles.inputBackground}
                              />

                              <TextField
                                label="Subject Id"
                                handleChange={handleChange('subject_id')}
                                value={values.subject_id}
                                style={styles.inputBackground}
                              />

                          </View>
                          <View>
                              <Button
                                  mode="contained"
                                  onPress={handleSubmit}
                                  style={styles.btn}>
                                  <Text style={styles.btnText}>Add New Subject</Text>
                              </Button>
                          </View>
                      </View>
                  )}
                  </Formik>
              </>
              </View>
              </View>
          </View>
      </SafeAreaView>
  </KeyboardAvoidingView>
  )}
  </>
  );
};

const styles = StyleSheet.create({
  container: {},
  mainBody: {
    width,
    minHeight: height * .85, 
    backgroundColor: Colors.F9Background(), 
    borderTopRightRadius: 30, 
    position: 'relative', 
    top: -30,
    paddingLeft: 15,
    paddingRight: 15
  },
  submitBody: {},
  btn: { 
    backgroundColor: '#28AAD8', 
    width: width*.92, 
    borderRadius: 10,
    height: 45,
    marginTop: '10%',
    shadowColor: "#28AAD8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  btnText: {
    color: '#fff',
    fontSize: 17,
    textTransform: 'uppercase',
    paddingLeft: '42.5%',
  },
  FormArea: {
    width: width - 30,
  },
  FormContent: {
    marginBottom: '1.5%',
  },
  accountText: {
    textAlign: 'center',
    marginTop: '5%',
    fontSize: 16,
  },
  inputBackground: {
    backgroundColor: Colors.F9Background()
  },
});
