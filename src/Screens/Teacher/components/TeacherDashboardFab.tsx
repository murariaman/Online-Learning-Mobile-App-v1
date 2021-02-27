import React, {useState} from 'react';
import { Alert } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper'

const TeacherDashboardFab = (props: any) => {
  const {navigation, backgroundColor} = props;
  const [state, setState] = useState(false);
  const onStateChange = () => setState(!state);
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={state}
          fabStyle={{backgroundColor}}
          icon={state ? 'window-close' : 'plus'}
          actions={[
            {
              icon: 'file-edit-outline',
              label: 'Add A New Course',
              onPress: () => navigation.navigate('TeacherAddNewCourse'),
            },
            {
              icon: 'square-edit-outline',
              label: 'Edit Course',
              onPress: () => Alert.alert('Coming Soon...'),
            },
            {
              icon: 'delete-outline',
              label: 'Delete Course',
              onPress: () => Alert.alert('Coming Soon...'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};

export default TeacherDashboardFab;