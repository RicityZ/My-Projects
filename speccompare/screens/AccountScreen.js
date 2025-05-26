import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AccountScreen() {
  const navigation = useNavigation();
  const { username } = useUser(); // เปลี่ยนจาก firstName เป็น username

  const menuItems = [
    { 
      icon: 'heart', 
      label: 'ประวัติการถูกใจ', 
      screen: 'MyLikes',
      color: '#FF6B6B'
    },
    { 
      icon: 'desktop',
      label: 'สเปคของฉัน', 
      screen: 'MySpec',
      color: '#9B59B6'
    },
    { 
      icon: 'settings', 
      label: 'แก้ไขโปรไฟล์', 
      screen: 'EditProfile',
      color: '#FFA07A'
    },
    { 
      icon: 'log-out', 
      label: 'ออกจากระบบ', 
      screen: 'Login',
      color: '#FF4500'
    }
  ];

  const profileImageUrl = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImageUrl }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.username}>{username || 'ผู้ใช้'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={24} color="white" />
              </View>
              <Text style={styles.menuItemText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderRadius: 15,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#173B7A',
    overflow: 'hidden',
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B7A',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});