import { View, Text } from 'react-native'
import React from 'react'
import { categoryBG, colors } from '../themes'

export default function ExpensesCard({item}) {
  return (
    <View style={{backgroundColor: categoryBG[item.category]}} className='flex-row justify-between items-center p-4 mb-3 rounded-2xl'>
      <View> 
        <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
        <Text  className={`${colors.heading} text-sm`}>{item.category}</Text>
      </View>
      <View> 
        <Text  className={`${colors.heading} font-bold text-lg`}>₹{item.amount}</Text>
      </View>
    </View>
  )
}