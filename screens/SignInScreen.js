import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import user, { setUserLoading } from '../redux/slices/user';
import Loading from '../components/loading';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
        try {
            dispatch(setUserLoading(true));
            await signInWithEmailAndPassword(auth, email, password);
            dispatch(setUserLoading(false));
            Snackbar.show({
              text: 'Login Successfull!',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: 'green',
            });
        } catch (error) {
            dispatch(setUserLoading(false));
            Snackbar.show({
                text: error.message,
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: 'red',
              });
        }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'red',
      });
    }
  };

  const navigation = useNavigation();

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Sign In
            </Text>
          </View>
          <View className="flex-row justify-center my-1 mt-5">
            <Image
              style={{height: 330, width: 350}}
              source={require('../assets/images/login.png')}
            />
          </View>
        </View>
        <View className="space-y-2 mx-2 mb-12">
          <Text className={`${colors.heading} font-bold text-lg`}>Email</Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            Password
          </Text>
          <TextInput
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
            className="p-4 bg-white rounded-full"
          />
          <TouchableOpacity className="flex-row-reverse mr-4">
            <Text className="text-lg">Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <View>
          {userLoading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm mx-2 mb-40">
              <Text className="text-center text-white text-lg font-bold">
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
