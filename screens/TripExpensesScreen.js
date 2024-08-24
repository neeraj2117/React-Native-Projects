import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../themes';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import BackButton from '../components/backButton';
import ExpensesCard from '../components/expensesCard';
import { expensesRef } from '../config/firebase';
import { getDocs, query, where } from 'firebase/firestore';

export default function TripExpensesScreen(props) {
  const {id, place, country} = props.route.params;
  const [expenses, setExpenses] = useState([]);
  
  const isFocused = useIsFocused();

  const fetchExpenses = async() => {
    const q = query(expensesRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      data.push({...doc.data(), id: doc.id});
    })
    setExpenses(data);
  } 
  
  useEffect(() => {
    if (isFocused)
      fetchExpenses();
  },[isFocused])


  const navigation = useNavigation();

  return (
    <ScreenWrapper className="flex-1">
      <View className='px-4'>
        <View className="relative mt-5">
            <View className="absolute top-2 left-0">
              <BackButton />
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
            <Text className={`${colors.heading} text-xs text-center`}>{country}</Text>
        </View>
        <View className="flex-row justify-center items-center rounded-xl mb-4 ">
          <Image
            source={require('../assets/images/banner.png')}
            className="w-60 h-80"
          />
        </View>
        <View className="space-y-5">
          <View className="flex-row justify-between items-center">
            <Text className={`text-black font-bold text-xl`}>Expenses</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddExpense', {id, place, country})}
              className="p-2 px-3 bg-white border-gray-200 rounded-full">
              <Text className={`text-gray-500 font-semibold`}>Add Expenses</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={{height: 480}}>
              <FlatList
                data={expenses}
                ListEmptyComponent={
                  <EmptyList message={"You haven't recorded any expenses yet"} />
                }
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                className="mx-0"
                renderItem={({item}) => {
                  return (
                    <ExpensesCard item={item}/>
                  );
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
