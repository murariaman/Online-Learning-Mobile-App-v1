import React, {useContext, useState} from 'react';
import { Alert } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import { AuthContext } from '../../Context';

const UserFab = (props: any) => {
    const {backgroundColor, navigation} = props;
    const { signOut } = useContext(AuthContext);
    const [state, setState] = useState(false);
    const onStateChange = () => setState(!state);
    return (
        <Provider>
            <Portal>
                <FAB.Group
                    open={state}
                    fabStyle={{backgroundColor}}
                    icon={state ? 'window-close' : 'pencil-outline'}
                    actions={[
                        {
                            icon: 'account-edit-outline',
                            label: 'Edit Profile',
                            onPress: () => Alert.alert('Edit Profile Coming Soon...'),
                        },
                        {
                            icon: 'account-arrow-right-outline',
                            label: 'Logout',
                            onPress: () => Alert.alert('Confirmation',
                                'Are You Sure Want To Logout ?',
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                    },
                                    { 
                                        text: "Logout", 
                                        onPress: () => signOut()
                                    }
                                ],
                                { cancelable: false }
                            )
                        },
                    ]}
                    onStateChange={onStateChange}
                />
            </Portal>
        </Provider>
    );
};

export default UserFab;