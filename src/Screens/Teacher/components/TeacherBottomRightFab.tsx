import React, {useState} from 'react';
import { Alert } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

const TeacherBottomRightFab = (props: any) => {
  const {backgroundColor, navigation, singleSubjectDetails} = props;
  const [state, setState] = useState(false);
  const onStateChange = () => setState(!state);
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={state}
          fabStyle={{backgroundColor}}
          icon={state ? 'calendar-today' : 'plus'}
          actions={[
            {
              icon: 'file-edit-outline',
              label: 'Answer A Quesction',
              onPress: () => navigation.navigate('TeacherBlogPost', {
                teacher: true,
                subject_details: singleSubjectDetails
              }),
            },
            {
              icon: 'chat-outline',
              label: 'Chat',
              onPress: () => navigation.navigate('SeperateSubjectChat'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default TeacherBottomRightFab;