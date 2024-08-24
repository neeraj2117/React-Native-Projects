import { View, Text, Image } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className='flex justify-center items-center my-5'>
        <Image source={require('../assets/images/empty.png')} className='w-40 h-40 shadow'/>
      <Text className='font-bold text-gray-400'>{message || 'Data not found'}</Text>
    </View>
  )
}