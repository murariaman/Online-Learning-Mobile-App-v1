import * as React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import Colors from '../../../../utils/Color';

const VideoUploadDialog = (props: any) => {
    const {visible, setVisible, subject_details} = props;
    const hideDialog = () => setVisible(false);
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Upload A Video</Dialog.Title>
                    <Dialog.Content>
                        <Formik
                            initialValues={{
                                name: '',
                                subject_id: subject_details.subject_id,
                                video_url: ''
                            }}
                            onSubmit={values => {
                                console.log(values)
                                firestore()
                                .collection('saved_video')
                                .add(values)
                                .then(() => {
                                    values.name=''
                                    values.video_url=''
                                    setVisible(false)
                                    Alert.alert('Video added Successfully!')
                                })
                                .catch(e => console.log(e));
                            }}
                        >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                keyboardType="default"
                                label="Give a Title"
                                multiline={true}
                                numberOfLines={2}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                                style={styles.answerInput}
                            />
                            <TextInput
                                keyboardType="default"
                                label="Enter Video URL"
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={handleChange('video_url')}
                                onBlur={handleBlur('video_url')}
                                value={values.video_url}
                                style={styles.answerInput}
                            />
                            <Button 
                                mode="contained"
                                onPress={handleSubmit}
                                style={styles.btn}
                            >
                                Add Video
                            </Button>
                        </View>
                        )}
                        </Formik>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setVisible(false)}>Cancel</Button>
                    </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
  container: {},
  answerInput: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 15
},
btn: {
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: Colors.extremeBlue()
}
});

export default VideoUploadDialog;