import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/screenWrapper';
import { colors } from '../themes';
import { useNavigation } from '@react-navigation/native';

import {
  GoogleOneTapSignIn,
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';


GoogleSignin.configure({
  webClientId: '132731441776-gnevngp4l0kr8455rm17d7o3o0g2li9t.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
});

export default function WelcomeScreen() {
  const navigation = useNavigation();
    
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);

    } catch (error) {
      console.log('error', error.message);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  return (
    <ScreenWrapper>
      <View className='h-full flex justify-around'>
        <View className="flex-row justify-center mt-10">
          <Image
            source={require('../assets/images/1.png')}
            // source={{uri :'https://cdn.dribbble.com/users/3821672/screenshots/7172854/welcome-to-investment.gif'}}
            style={{ height: 410, width: 410}}
            className="h-96 w-96 shadow"
          />
        </View>

        <View className='mx-5 mb-20'>
            <Text className={`text-center font-bold text-4xl text-black mb-10`}>Expensify</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className='shadow p-4 rounded-full' style={{backgroundColor: colors.button}}>
                <Text className={`text-center font-bold text-lg text-white`}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className='shadow p-4 rounded-full mt-5' style={{backgroundColor: colors.button}}>
                <Text className={`text-center font-bold text-lg text-white`}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={signIn} className='shadow p-4 rounded-full mt-5 bg-white'>
              <View className='flex-row justify-center items-center space-x-3'>
                <Image source={require('../assets/images/googleIcon.png')} className='h-8 w-8'/>
                <Text className={`text-center font-bold text-lg text-black`}>Sign In with Google</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
