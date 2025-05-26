import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext';

// Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabNavigator from './screens/TabNavigator';
import SelectCPU from './screens/SelectCPU';
import SelectMainboard from './screens/SelectMainboard';
import SelectGPU from './screens/SelectGPU';
import SelectMemory from './screens/SelectMemory';
import SelectSSD from './screens/SelectSSD';
import SelectHDD from './screens/SelectHDD';
import SelectPSU from './screens/SelectPSU';
import SelectCase from './screens/SelectCase';
import SelectCooler from './screens/SelectCooler';
import SpecDetail from './screens/SpecDetail';
import RandomSpecDetail from './screens/RandomSpecDetail';
import AccountScreen from './screens/AccountScreen';
import MyLikes from './screens/MyLikes';
import CompareSpecs from './screens/CompareSpecs';
import CompareAIResult from './screens/CompareAIResult';
import MySpec from './screens/MySpec';
import EditProfile from './screens/EditProfile'; // เพิ่ม EditProfile
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AdminHome from './screens/AdminHome'; // เปลี่ยน path ให้ตรงกับโปรเจกต์คุณ
import NewsManagement from './screens/NewsManagement';
import AddNews from './screens/AddNews';
import EditNews from './screens/EditNews';
import UserManagement from './screens/UserManagement';
import EditUser from './screens/EditUser';
import HardwareManagement from './screens/HardwareManagement';
import AddPart from './screens/AddPart';
import EditHardware from './screens/EditHardware';
import ComputerSetManagement from './screens/ComputerSetManagement';
import UserSpecManagement from './screens/UserSpecManagement';
import EditUserSpec from './screens/EditUserSpec';
import ManageAISpec from './screens/ManageAISpec';
import AdminSpecManagement from './screens/AdminSpecManagement';
import AddAdminSpec from './screens/AddAdminSpec';
import EditAdminSpec from './screens/EditAdminSpec';
import EditSavedSpec from './screens/EditSavedSpec';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="SelectCPU" component={SelectCPU} />
          <Stack.Screen name="SelectMainboard" component={SelectMainboard} />
          <Stack.Screen name="SelectGPU" component={SelectGPU} />
          <Stack.Screen name="SelectMemory" component={SelectMemory} />
          <Stack.Screen name="SelectSSD" component={SelectSSD} />
          <Stack.Screen name="SelectHDD" component={SelectHDD} />
          <Stack.Screen name="SelectPSU" component={SelectPSU} />
          <Stack.Screen name="SelectCase" component={SelectCase} />
          <Stack.Screen name="SelectCooler" component={SelectCooler} />
          <Stack.Screen name="SpecDetail" component={SpecDetail} />
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="RandomSpecDetail" component={RandomSpecDetail} />
          <Stack.Screen name="AccountScreen" component={AccountScreen} />
          <Stack.Screen name="MyLikes" component={MyLikes} />
          <Stack.Screen name="CompareSpecs" component={CompareSpecs} />
          <Stack.Screen name="CompareAIResult" component={CompareAIResult} />
          <Stack.Screen name="MySpec" component={MySpec} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="NewsManagement" component={NewsManagement} />
          <Stack.Screen name="AddNews" component={AddNews} />
          <Stack.Screen name="EditNews" component={EditNews} />
          <Stack.Screen name="UserManagement" component={UserManagement} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="HardwareManagement" component={HardwareManagement} />
          <Stack.Screen name="AddPart" component={AddPart} />
          <Stack.Screen name="EditHardware" component={EditHardware} />
          <Stack.Screen name="ComputerSetManagement" component={ComputerSetManagement} />
          <Stack.Screen name="UserSpecManagement" component={UserSpecManagement} />
          <Stack.Screen name="EditUserSpec" component={EditUserSpec} />
          <Stack.Screen name="ManageAISpec" component={ManageAISpec} />
          <Stack.Screen name="AdminSpecManagement" component={AdminSpecManagement} />
          <Stack.Screen name="AddAdminSpec" component={AddAdminSpec} />
           <Stack.Screen name="EditAdminSpec" component={EditAdminSpec} />
           <Stack.Screen name="EditSavedSpec" component={EditSavedSpec} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}