import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
import { getCurrentDate, idGenerator } from '../../../../utils/Utilities';
import Colors from '../../../../utils/Color';

const ExamDialog = (props: any) => {
    const {visible, setVisible, loading, setLoading, subject_details} = props;
    const [uploadedFileName, setUploadedFileName] = useState<any>();
    const [assignmentDetails, setAssignmentDetails] = useState<any>();
    const [submissionDate, setSubmissionDate] = useState<any>();
    const hideDialog = () => setVisible(false);

    const handleFiles = async () => {
        try {
            setLoading(true)
            const file = await DocumentPicker.pick({
              type: [DocumentPicker.types.allFiles],
            });
            const path = await normalizePath(file.uri);
            const result = await RNFetchBlob.fs.readFile(path, 'base64');
            await uploadFileToFirebaseStorage(result, file);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              console.log('CANCEL BY USER')
              setLoading(false)
            } else {
                setLoading(false)
                Alert.alert('ERROR', 'In Upload File Dialog Box');
                throw err;
            }
        }
    }

    const uploadFileToFirebaseStorage = async(result, file) => {
        const uploadTask = storage()
            .ref(`${subject_details.subject_id}/exams/${file.name}`)
            .putString(result, 'base64', {contentType: file.type});

        uploadTask.on('state_changed', 
            (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
                Alert.alert('ERROR', 'There is a problem while uploading the file')
                console.log(error)
            }, 
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('File available at', downloadURL);
                // Add Data to Firestore DB
                //   file: downloadURL, file
                storeDataToDatabase(downloadURL)
            });
        });
    }

    const normalizePath = async (path) => {
        if(Platform.OS === 'ios' || Platform.OS === 'android') {
            const filePrefix = 'file://';
            if(path.startsWith(filePrefix)) {
                try{
                    path = path.substring(filePrefix.length)
                } catch(e) {
                    console.log('ERROR IN NORMALIZE FUNC, MATERIALUPLOADDIALOG',e)
                    Alert.alert('ERROR', 'FILE ISSUE');
                }
            } 

        }
        return path;
    }

    const storeDataToDatabase = (url) => {
        firestore()
            .collection('all_exams')
            .add({
                subject_id: subject_details.subject_id,
                subject_name: subject_details.subject_name,
                file_name: uploadedFileName,
                details: assignmentDetails,
                file_url: url,
                published_on: getCurrentDate(),
                start_time: '',
                end_time: submissionDate,
                exam_id: idGenerator()
            })
            .then(() => {
                setVisible(false)
                setLoading(false)
                Alert.alert('Success', 'Exam Question Uploaded');
            })
            .catch(e => {
                setVisible(false)
                setLoading(false)
                Alert.alert('ERROR', 'Error in Uploading the Data to DB');
                console.log(e)
            });
    }

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Take an Exam</Dialog.Title>
                    <Dialog.Content>
                        <View>
                            <TextInput 
                                label={'Exam Name'}
                                onChangeText={(fie_name) => setUploadedFileName(fie_name)}
                                value={uploadedFileName}
                                style={styles.textInputStyle}
                            />
                            <TextInput 
                                label={'Exam Details'}
                                onChangeText={(details) => setAssignmentDetails(details)}
                                value={assignmentDetails}
                                style={styles.textInputStyle}
                            />
                            <TextInput 
                                label={'Submission Time(Time Format)'}
                                onChangeText={(date) => setSubmissionDate(date)}
                                value={submissionDate}
                                style={styles.textInputStyle}
                            />
                            <Button 
                                onPress={handleFiles} 
                                mode="contained"
                                style={styles.submitBtn}
                                >
                                <Text>Choose And Auto Upload</Text>
                            </Button>
                        </View>
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
    chooseFileStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    uploadBtn: {
        position: 'relative',
        top: -10
    }
});

export default ExamDialog;