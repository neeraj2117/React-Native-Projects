import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      onPress={() => navigation.goBack()} 
      className='bg-white rounded-full h-10 w-10 justify-center items-center'
    >
      <ChevronLeftIcon size={30} color='#50C878' />
    </TouchableOpacity>
  );
}
