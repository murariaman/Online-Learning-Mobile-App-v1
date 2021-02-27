import * as React from 'react';
import { Text, View, StyleSheet, Share } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Colors from '../utils/Color';

const QuesctionCard = (props: any) => {
  const {questionDetails, navigation} = props;
  const data = `${questionDetails.question}?`
  const ShareQuesction = (quesction: String) => {
    Share.share({
        message: `
        Could anyone answer this quesction \n
        ${quesction} \n\n
        Powered By: Online Education
        `,
        title: `${quesction}`
    }, {
        // Android only:
        dialogTitle: `${quesction}`,
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.CopyToPasteboard',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AddToReadingList',
          'com.apple.UIKit.activity.PostToFlickr',
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToTencentWeibo',
          'com.apple.UIKit.activity.AirDrop',
          'com.apple.UIKit.activity.OpenInIBooks',
          'com.apple.UIKit.activity.MarkupAsPDF',
          'com.apple.reminders.RemindersEditorExtension',
          'com.apple.mobilenotes.SharingExtension',
          'com.apple.mobileslideshow.StreamShareService',
          'com.linkedin.LinkedIn.ShareExtension',
          'pinterest.ShareExtension',
          'com.google.GooglePlus.ShareExtension',
          'com.tumblr.tumblr.Share-With-Tumblr',
          'net.whatsapp.WhatsApp.ShareExtension'
        ]
    }) .then(({action}) => {
        if(action === Share.sharedAction)
            console.log('Share was successful');
        else
            console.log('Share was dismissed');
    });
  }
  return (
    <View style={styles.mainCard}>
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate('QuestionAnswer', {
                questionDetails: questionDetails
            })}
            >
            <Text style={styles.doubtQuesction}>
                {data}
            </Text>
            <View style={{marginTop: 10,}}>
                <Text style={styles.quesctionUser}> • Many students has asked this</Text>
            </View>
        </TouchableWithoutFeedback>
        <View style={styles.bottomCard}>
            <View style={styles.answerTab}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('BlogAnswer', {
                        allDetails: questionDetails
                    })}
                    >
                    <Text style={{textAlign: 'center'}}>
                        <FeatherIcon name='edit-3' size={20} />    
                        <Text style={styles.btnText}>&nbsp; Answer</Text>
                    </Text>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.shareTab}>
                <TouchableWithoutFeedback onPress={() => ShareQuesction(data)}>
                    <Text style={{textAlign: 'center'}}>
                        <FeatherIcon name='share-2' size={20} />
                        <Text style={styles.btnText}>&nbsp; Share</Text>
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    </View>
  );
};

export default QuesctionCard;3

const styles = StyleSheet.create({
    mainCard: {
        borderWidth: 1, 
        backgroundColor: Colors.white(),
        borderColor: Colors.appWhite(), 
        borderRadius: 2, 
        marginBottom: 20,
        shadowColor: Colors.shadowWhite(),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    doubtQuesction: {
        fontSize: 15, 
        fontWeight: '700', 
        padding: 15, 
        paddingBottom: 0, 
        color: Colors.extremeBlue(),
    },
    quesctionUser: {
        fontSize: 13, 
        fontWeight: '600', 
        paddingLeft: 15
    },
    bottomCard: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 15, 
        borderTopWidth: 1, 
        borderColor: Colors.appWhite(),
        padding: 15
    },
    answerTab: {
        width: '50%', 
        borderRightColor: Colors.appWhite(), 
        borderRightWidth: 1
    },
    shareTab: {
        width: '50%',
    },
    btnText: {
        fontSize: 16,
        color: '#000',
        position: 'relative',
        top: -2
    },
});
