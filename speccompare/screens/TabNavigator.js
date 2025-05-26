import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from 'react-native';

import UserHome from './UserHome';
import RandomScreen from './RandomScreen';
import SelectSpec from './SelectSpec';
import CompareSpecs from './CompareSpecs';
import Account from './AccountScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
  const { route } = props;
  const { firstName } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#173B7A',
          height: 80,
          paddingBottom: 8,
        },
        tabBarLabel: ({ focused, color }) => {
          const labelMap = {
            UserHome: 'หน้าหลัก',
            RandomScreen: 'สุ่ม',
            SelectSpec: 'เลือกสเปค',
            CompareSpecs: 'เปรียบเทียบสเปค',
            Account: 'บัญชี',
          };
          return (
            <Text style={{
              color,
              fontSize: focused ? 12 : 12,
              fontWeight: focused ? 'bold' : 'normal',
              marginTop: 4,
            }}>
              {labelMap[route.name]}
            </Text>
          );
        },
        tabBarIcon: ({ focused, color }) => {
          const iconMap = {
            UserHome: 'home',
            RandomScreen: 'dice-5',
            SelectSpec: 'tune',
            CompareSpecs: 'compare',
            Account: 'account',
          };
          return (
            <Icon
              name={iconMap[route.name]}
              size={focused ? 30 : 26}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#FDB813',
        tabBarItemStyle: {
          marginHorizontal: 5,
          borderRadius: 16,
        },
      })}
    >
      <Tab.Screen name="UserHome" component={UserHome} initialParams={{ firstName }} />
      <Tab.Screen name="RandomScreen" component={RandomScreen} initialParams={{ firstName }} />
      <Tab.Screen name="SelectSpec" component={SelectSpec} initialParams={{ firstName }} />
      <Tab.Screen name="CompareSpecs" component={CompareSpecs} initialParams={{ firstName }} />
      <Tab.Screen name="Account" component={Account} initialParams={{ firstName }} />
    </Tab.Navigator>
  );
}