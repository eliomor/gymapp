import  React, { useState, useEffect, useCallback  } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { LinearGradient } from 'expo-linear-gradient';

import HeaderButton from '../components/UI/HeaderButton';
import * as trainingsAction from '../store/action/trainings';

const AddTrainingScreen = (props) => {
  
const dispatch = useDispatch()
const [date, setDate] = useState('');
const userId = props.navigation.getParam('userId');

const submitHandler = useCallback(() => {
  dispatch(trainingsAction.createTraining(date,userId));
  props.navigation.goBack();
}, [dispatch,date]);

useEffect(() => {
  props.navigation.setParams({ submit: submitHandler });
}, [submitHandler]);


return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
           <Text style={styles.label}>Date</Text>
           <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
        </View>
      </View>  
    </ScrollView>
  );
};

AddTrainingScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
    return {
      headerTitle: 'Add Training',
      headerRight: (
       <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item
          title="Save"
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

 const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    formControl: {
      width: '100%'
    },
    label: {
      marginVertical: 8
    },
    input: {
      paddingHorizontal: 2,
      paddingVertical: 5,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1
    },
  });

export default AddTrainingScreen;

