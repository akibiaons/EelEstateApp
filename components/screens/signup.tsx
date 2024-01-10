import React, {useState} from 'react';
// UI Imports below
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useTailwind} from 'tailwind-rn';
// Navigation imports below:
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
// API import below
import {signupUser} from '../../api/authService';
import axios from 'axios';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

type Props = {
  navigation: SignupScreenNavigationProp;
};

const SignupScreen = ({navigation}: Props) => {
  // Tailwind state call:
  const tailwind = useTailwind();

  // API Login w/ useState:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Loading spinner state:
  const [isLoading, setIsLoading] = useState(false);

  // State for UI errors in red:
  const [errorMessage, setErrorMessage] = useState('');

  // End of state hooks...

  // Signup function
  const handleSignup = async () => {
    // reset the error message below:
    setErrorMessage('');

    // is loading state true when running handleSignUp function
    setIsLoading(true);

    // Condition to check for inputted data on frontend validation
    if (!email || !password) {
      // Handle empty fields
      Alert.alert('Please fill in all fields');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Invalid email format');
      return;
    }
    // End of the conditionals above to check and validate email + password are correctly written
    // Sign up logic after validation checks
    try {
      const userData = {
        email,
        password,
      };
      const user = await signupUser(userData);
      console.log('New user created!');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred'; // Default error message
      // Assuming error is of AxiosError type
      if (axios.isAxiosError(error) && error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      console.error('Signup error:', errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Validate email function
  function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // Return UI and all that good stuff
  return (
    <View style={tailwind('flex-1 justify-center px-4 bg-white')}>
      {errorMessage ? (
        <Text style={tailwind('text-red-500 text-center mb-4')}>
          {errorMessage}
        </Text>
      ) : null}
      {/* Rest of the component? How will I merge it with isLoading for the spinner (which I really like!!) */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
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
            onPress={handleSignup}>
            <Text style={tailwind('text-white text-center')}>CONTINUE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={tailwind('text-center text-blue-500')}>
              Have an account? Sign in
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default SignupScreen;
