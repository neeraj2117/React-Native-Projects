import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import { addDoc } from 'firebase/firestore';
import { db, tripsRef } from '../config/firebase';
import { useSelector } from 'react-redux';
import Snackbar from 'react-native-snackbar';


export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);

  const handleAddTrip = async () => {
    if (place && country) {
        //   navigation.navigate('Home');
        setLoading(true);
        let doc = await addDoc(tripsRef, {
            place,
            country,
            userId: user.uid
        });
        setLoading(false);
        Snackbar.show({
            text: 'Trip Added Successfully!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'green',
        });
        if (doc && doc.id){
            navigation.goBack();
        }
    } else {
        Snackbar.show({
            text: 'Places and Country are required!',
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
              Add Trip
            </Text>
          </View>
          <View className="flex-row justify-center my-1 mt-5">
            <Image
              style={{height: 320, width: 320}}
              source={require('../assets/images/4.png')}
            />
          </View>
        </View>
        <View className="space-y-2 mx-2 mt-2">
          <Text className={`${colors.heading} font-bold text-lg`}>
            Where On Earth?
          </Text>
          <TextInput
            value={place}
            onChangeText={value => setPlace(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            Which Country
          </Text>
          <TextInput
            value={country}
            onChangeText={value => setCountry(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
        </View>
        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddTrip}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-center text-white text-lg font-bold">
                Add Trip
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
