import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen = ({navigation}: Props) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-1 justify-center px-4 bg-white')}>
      <Text style={tailwind('text-xl font-bold text-center mb-6')}>
        Create your account
      </Text>
      <TouchableOpacity style={tailwind('mb-4')}>
        <Text style={tailwind('text-center')}>Continue with Google</Text>
      </TouchableOpacity>
      <Text style={tailwind('text-center mb-4')}>or</Text>
      <TextInput
        placeholder="Email address"
        style={tailwind('border-b border-gray-300 py-2 mb-4')}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={tailwind('border-b border-gray-300 py-2 mb-4')}
      />
      <TouchableOpacity style={tailwind('bg-blue-500 rounded-lg py-2 mb-4')}>
        <Text style={tailwind('text-white text-center')}>CONTINUE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={tailwind('text-center text-blue-500')}>
          Have an account? Sign in
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
