import React, {useState} from 'react';
import { Alert } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

const BottomRightFab = (props: any) => {
  const {subject_id, backgroundColor, navigation, teacher} = props;
  const [state, setState] = useState(false);
  const onStateChange = () => setState(!state);
  const FabOptions = 
  !teacher ?
    [
      {
        icon: 'file-edit-outline',
        label: 'Ask A Quesction',
        onPress: () => navigation.navigate('AddAQuesction', {
          subject_id: subject_id
        }),
      },
      {
        icon: 'chat-outline',
        label: 'Chat',
        onPress: () => navigation.navigate('SeperateSubjectChat'),
      },
    ]
  : 
    [
      {
        icon: 'chat-outline',
        label: 'Chat',
        onPress: () => navigation.navigate('SeperateSubjectChat'),
      },
    ]

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={state}
          fabStyle={{backgroundColor}}
          icon={state ? 'window-close' : 'plus'}
          actions={FabOptions}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default BottomRightFab;