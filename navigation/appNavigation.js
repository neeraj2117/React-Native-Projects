import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpense';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useSelector(state => state.user);

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u=>{
    console.log('got user: ',u);
    dispatch(setUser(u));
  })

  if (user) {
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="AddExpense" component={AddExpenseScreen}/>
          <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpensesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen
              options={{
                headerShown: false,
                presentation: Platform.OS === 'ios' ? 'modal' : 'card'
              }}
              name="SignIn"
              component={SignInScreen}
          />
          <Stack.Screen
              options={{
                headerShown: false,
                presentation: Platform.OS === 'ios' ? 'modal' : 'card'
              }}
              name="SignUp"
              component={SignUpScreen}
          />
          <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

}