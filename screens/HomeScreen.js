import { View, Text, Touchable, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../themes'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { auth, tripsRef } from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { getDoc, getDocs, query, where } from 'firebase/firestore'

export default function HomeScreen() {
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();

  const fetchTrips = async() => {
    const q = query(tripsRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log(doc.data());
      data.push({...doc.data(), id: doc.id});
    })
    setTrips(data);
  } 
  
  useEffect(() => {
    if (isFocused)
      fetchTrips();
  },[isFocused])
  

  const handleLogout = async() => {
    console.log('Logout clicked');
    await signOut(auth);
    Snackbar.show({
      text: 'Logged-Out Successfull',
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: 'green'
  });
  }

  const navigation = useNavigation();

  return (
    <ScreenWrapper className="flex-1">
      <View className='flex-row justify-between items-center p-4'>
        <Text className={`text-black font-bold text-3xl shadow-sm`}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} className='p-2 px-3 bg-white border-gray-200 rounded-full'>
          <Text className={`text-black`}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4 '>
        <Image
        source={require('../assets/images/banner.png')} 
        className='w-60 h-80'
        />
      </View>

      <View className='px-4 space-y-3'>
        <View className='flex-row justify-between items-center'>
          <Text className={`text-black font-bold text-xl`}>Recent Trips</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className='p-2 px-3 bg-white border-gray-200 rounded-full'>
            <Text className={`text-gray-500 font-semibold`}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View>
        <View style={{height: 480}}>
          <FlatList 
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={"You haven't recorded any trips yet"}/>}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle= {{
              justifyContent: 'space-between',
            }}
            className='mx-1'
            renderItem={({item}) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate('TripExpenses', {...item})} className='bg-white p-3 rounded-2xl mb-3 shadow-sm'>
                  <View>
                    <Image source={randomImage()} className='w-44 h-44 mb-2'/> 
                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                  </View>
                </TouchableOpacity>
              )
              }}
            />
        </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

