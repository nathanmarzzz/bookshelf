import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { windowWidth } from '../utils/platform/platform';
import { useDispatch, useSelector } from 'react-redux';
import { user, User } from '../data/users';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../store/user';
import { Button } from 'react-native-paper';
import { State } from '../store/store';

const SUCCESS = 'Successful';
const LOGIN_CREDENTIALS_INCORRECT = 'Login credentials invalid';
const NEED_TO_REGISTER =
  'No user found, please register a new account or try again';

const initFormikState = {
  name: '',
  email: '',
  password: '',
};

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const loginValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Must be at leaast 6 characters long')
    .required('Required'),
});

/**
 *
 * provides functionality for both login or registering
 */
export const Login = () => {
  const [register, setRegister] = useState<boolean>(false);

  const currUser = useSelector((state: State) => state.user);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  // use to check if previously logged in
  // TODO : check session valid
  const userLoggedin = currUser !== null;

  // using to test
  // if (userLoggedin) {
  //   navigation.navigate('BottomTab');
  // }

  const submit = useCallback(
    async (values: FormValues, errors: any) => {
      const valid =
        values.email && values.name && values.password ? true : false;

      if (Object.keys(errors).length || !valid) {
        console.log('errors: ', errors, valid);
        return;
      }

      const response = await user(values, register ? 'register' : 'login');
      // TODO : handle responses
      // succes, wrong credentials, need to register, error
      const { msg, error } = response;
      if (error) {
        // display error at top with banner/toast
      } else {
        if (msg == SUCCESS) {
          // nav to home
          navigation.navigate('BottomTab');

          // update store with current user
          const curr_user: Partial<User> = {
            name: values.name,
            email: values.email,
          };

          dispatch(setUser({ user: curr_user }));

          // TODO : add toast / banner for login succesful
        } else if (msg == LOGIN_CREDENTIALS_INCORRECT) {
          // toast / banner to ask user to try different credentials
        } else if (msg == NEED_TO_REGISTER) {
          // set register true
          setRegister(true);
        } else {
        } // shouldnt hit but can be handled the same as error above
      }
    },
    [register],
  );

  return (
    <Formik
      initialValues={initFormikState}
      validationSchema={loginValidation}
      onSubmit={values => console.log(values)}>
      {({
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.header}> {register ? 'Register' : 'Login'}</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('name')}
              value={values.name}
              placeholder="Name"
            />

            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('email')}
              value={values.email}
              placeholder="Email"
            />
            {touched.email && errors.email ? <Text>{errors.email}</Text> : null}

            <TextInput
              style={styles.inputField}
              onChangeText={handleChange('password')}
              value={values.password} // TODO : mask passoword here using asteriks
              placeholder="Password"
            />

            {touched.password && errors.password ? (
              <Text>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                submit(values, errors);
                handleSubmit();
              }}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              mode="contained">
              {register ? 'Register' : 'Login'}
            </Button>

            <Text
              style={styles.backText}
              onPress={() => setRegister(!register)}>
              {register ? 'Back to login' : 'Sign up'}
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignSelf: 'center',
    margin: '2%',
  },
  inputContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 0.5,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputField: {
    width: windowWidth * 0.65,
    borderRadius: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: '2%',
    padding: '2%',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  button: { backgroundColor: 'green' },
  buttonLabel: { fontWeight: '600' },
  backText: {
    alignSelf: 'center',
    margin: '2%',
    marginTop: '3%',
    fontWeight: '500',
    color: 'blue',
  },
});
