import React from 'react';
import {View, Text, Button, TextInput, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({navigation}: Props) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-1 justify-center px-4 bg-white')}>
      <Text style={tailwind('text-xl font-bold text-center mb-6')}>Login</Text>

      {/* Google Sign-In Button */}
      <TouchableOpacity style={tailwind('mb-4')}>
        <Text style={tailwind('text-center')}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={tailwind('text-center mb-4')}>or</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email address"
        style={tailwind('border-b border-gray-300 py-2 mb-4')}
      />
      {/* Password input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={tailwind('border-b border-gray-300 py-2 mb-4')}
      />
      {/* Continue Button */}
      <TouchableOpacity
        style={tailwind('bg-blue-500 rounded-lg py-2 mb-4')}
        onPress={() => {
          /* Perform sign-in logic here */
        }}>
        <Text style={tailwind('text-white text-center')}>CONTINUE</Text>
      </TouchableOpacity>

      {/* Navigation to Signup Screen */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={tailwind('text-center text-blue-500')}>
          No account? Sign up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
