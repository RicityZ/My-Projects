import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function AdminHome({ navigation }) {
  // ฟังก์ชันสำหรับเลือกไอคอนที่เหมาะสม
  const getIconName = (type) => {
    switch (type) {
      case 'hardware':
        return 'laptop';
      case 'network':
        return 'network-wired';
      case 'users':
        return 'users';
      case 'news':
        return 'newspaper';
      default:
        return 'cog';
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1E3D8F" />
      <LinearGradient
        colors={['#1E3D8F', '#0B2861']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>แผงควบคุมผู้ดูแลระบบ</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>จัดการฐานข้อมูลลูกค้า</Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('HardwareManagement')}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name={getIconName('hardware')} size={20} style={styles.icon} />
                <Text style={styles.buttonText}>จัดการอุปกรณ์ฮาร์ดแวร์</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ComputerSetManagement')}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name="network-wired" size={20} style={styles.icon} />
                <Text style={styles.buttonText}>จัดการคอมพิวเตอร์เซ็ต</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('UserManagement')}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name={getIconName('users')} size={20} style={styles.icon} />
                <Text style={styles.buttonText}>จัดการข้อมูลผู้ใช้</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('NewsManagement')}
            >
              <View style={styles.buttonContent}>
                <FontAwesome5 name={getIconName('news')} size={20} style={styles.icon} />
                <Text style={styles.buttonText}>จัดการข่าวสาร</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 ระบบจัดการฐานข้อมูล</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    paddingVertical: 30,
    borderRadius: 30,
    alignItems: 'center',
    gap: 20,
    alignSelf: 'center',
    elevation: 10, // เงาสำหรับ Android
    shadowColor: '#000', // เงาสำหรับ iOS
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1E3D8F',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFB800',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '80%',
    elevation: 5,
    shadowColor: '#FFB800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    marginRight: 12,
    color: '#000',
    width: 20,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  }
});