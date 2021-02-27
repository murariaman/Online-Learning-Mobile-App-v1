import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ExamDetailDesc = (props: any) => {
  const {visible, setVisible} = props;
  const hideDialog = () => setVisible(false);
  const submitAssignment = () => {
    console.log('Pressed Done')
    setVisible(false)
  }
  return (
      <Provider>
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Exam 1</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Exam submit file will show here</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={hideDialog}>Cancel</Button>
                <Button onPress={submitAssignment}>Done</Button>
            </Dialog.Actions>
            </Dialog>
        </Portal>
    </Provider>
  );
};

export default ExamDetailDesc;

const styles = StyleSheet.create({
  container: {}
});
