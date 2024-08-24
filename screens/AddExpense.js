import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/screenWrapper';
import {colors} from '../themes';
import BackButton from '../components/backButton';
import {useNavigation} from '@react-navigation/native';
import {categories} from '../constants';
import Snackbar from 'react-native-snackbar';
import {expensesRef} from '../config/firebase';
import {addDoc} from 'firebase/firestore';
import Loading from '../components/loading';
import { useSelector } from 'react-redux';

export default function AddExpenseScreen(props) {
  let {id} = props.route.params;

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (title && amount && category) {
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        id,
      });
      setLoading(false);
      Snackbar.show({
        text: 'Expenses Added Successfully!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: 'green',
      });
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Please fill all the fields!',
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
              Add Expense
            </Text>
          </View>
          <View className="flex-row justify-center my-1 mt-5">
            <Image
              style={{height: 320, width: 320}}
              source={require('../assets/images/expenseBanner.png')}
            />
          </View>
        </View>
        <View className="space-y-2 mx-2 mt-2">
          <Text className={`${colors.heading} font-bold text-lg`}>
            For What?
          </Text>
          <TextInput
            value={title}
            onChangeText={value => setTitle(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
          <Text className={`${colors.heading} font-bold text-lg`}>
            How much
          </Text>
          <TextInput
            value={amount}
            onChangeText={value => setAmount(value)}
            className="p-4 bg-white rounded-full mb-3"
          />
        </View>
        <View className="mx-2">
          <Text className={`${colors.heading} font-bold text-lg`}>
            Category
          </Text>
          <View className="flex-row flex-wrap items-center">
            {categories.map(cat => {
              let bgColor = 'bg-white';
              if (cat.value === category) bgColor = 'bg-green-200';

              return (
                <TouchableOpacity
                  onPress={() => setCategory(cat.value)}
                  key={cat.value}
                  className={`rounded-full ${bgColor} py-2 px-3 mb-3 mr-2`}>
                  <Text className="text-base">{cat.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleAddExpense}
              style={{backgroundColor: colors.button}}
              className="my-6 rounded-full p-3 shadow-sm mx-2">
              <Text className="text-center text-white text-lg font-bold">
                Add Expenses
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
