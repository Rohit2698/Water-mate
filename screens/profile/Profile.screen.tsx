import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import ScreenContainer from '@/components/container/ScreenContainer';
import {AccountOptionList} from './util';
import {Entypo} from '@expo/vector-icons';
import {FontContext} from '@/context/FontThemeContext';
import {router} from 'expo-router';

const ProfileScreen = () => {
  const {textTheme} = useContext(FontContext);
  return (
    <ScreenContainer headerTitle="Account">
      <View style={styles.container}>
        {AccountOptionList.map(item => (
          <TouchableOpacity
            onPress={() => {
              router.push('/(routes)/drinkReminder');
            }}
            key={item.value}
            style={styles.list}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <View>{item.icon}</View>
              <Text style={[textTheme.heading3, {fontSize: 18}]}>
                {item.label}
              </Text>
            </View>
            <View>
              <Entypo name={'chevron-right'} size={20} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
});
