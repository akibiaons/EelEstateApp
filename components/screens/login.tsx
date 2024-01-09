import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {loginUser} from '../../api/authService';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({navigation}: Props) => {
  const tailwind = useTailwind();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert('Please fill in all fields');
      setIsLoading(false); // Stop loading when there's an input validation error
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid email format');
      setIsLoading(false); // Stop loading when there's an input validation error
      return;
    }

    try {
      const user = await loginUser(email, password);
      console.log('Login successful', user);
      // Here you can navigate to another screen if login is successful
    } catch (error) {
      const err = error as {response?: {data: string}}; // Type assertion
      console.error('There was a problem logging in', err);
      Alert.alert(
        'Login failed',
        err.response ? err.response.data : 'unknown error',
      ); // Display error message to user
    } finally {
      setIsLoading(false);
    }
  };

  function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <View style={tailwind('flex-1 justify-center px-4 bg-white')}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={tailwind('text-xl font-bold text-center mb-6')}>
            Login
          </Text>
          <TouchableOpacity style={tailwind('mb-4')}>
            <Text style={tailwind('text-center')}>Continue with Google</Text>
          </TouchableOpacity>
          <Text style={tailwind('text-center mb-4')}>or</Text>
          <TextInput
            placeholder="Email address"
            style={tailwind('border-b border-gray-300 py-2 mb-4')}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={tailwind('border-b border-gray-300 py-2 mb-4')}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={tailwind('bg-blue-500 rounded-lg py-2 mb-4')}
            onPress={handleLogin}>
            <Text style={tailwind('text-white text-center')}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={tailwind('text-center text-blue-500')}>
              No account? Sign up
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;
