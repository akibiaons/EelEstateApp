import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import GradientBackground from '../UI/auroraGradient';
import {StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {loginUser} from '../../api/authService';
import axios from 'axios';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({navigation}: Props) => {
  // Tailwind state
  const tailwind = useTailwind();

  // userAuth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //Error handling state:
  const [errorMessage, setErrorMessage] = useState('');

  // Loading spinner state
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // reset the error message below
    setErrorMessage('');
    // loading state for spinner
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
      let errorMessage = 'Email or password incorrect!'; // Default error message
      // Assuming error is of AxiosError type
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      console.error('Login error:', errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <View style={tailwind('flex-1 justify-center px-2 bg-gray-500')}>
      {
        //Below is the error handling ui informing user of incorrect email/password
      }
      {errorMessage ? (
        <Text style={tailwind('text-red-500 text-center mb-4')}>
          {errorMessage}
        </Text>
      ) : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Absolute positioned gradient background */}
          {/* <GradientBackground style={StyleSheet.absoluteFillObject} /> */}

          {/* View Box for the logo image to be centered */}
          <View style={tailwind('items-center mb-12')}>
            <Image // Note for Image. There needs to be a set height and width as it is not intuitive like web dev
              source={{
                uri: 'https://raw.githubusercontent.com/gualberto2/ocomni/main/public/favicon.ico',
              }}
              style={{width: 70, height: 70}}
              resizeMode="contain"
            />
          </View>
          {/* <TouchableOpacity style={tailwind('mb-4')}>
            <Text style={tailwind('text-center')}>Continue with Google</Text>
          </TouchableOpacity> */}
          {/* <Text style={tailwind('text-center mb-4')}>or</Text> */}

          {/* Text inputs for collecting email and passwords */}
          <View style={tailwind('pt-8')}>
            <TextInput
              placeholder="Email address"
              placeholderTextColor="#9CA3AF"
              style={tailwind(
                'text-black rounded-xl border border-gray-300 bg-gray-200 h-12 mb-2 px-4 ',
              )}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={tailwind(
                'text-black rounded-xl border border-gray-300 bg-gray-200 h-12 px-4',
              )}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View>
            <TouchableOpacity
              style={tailwind('mt-4 rounded-xl bg-blue-500 py-3')}
              onPress={handleLogin}>
              <Text style={tailwind('text-white text-center')}>Login</Text>
            </TouchableOpacity>
          </View>
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
