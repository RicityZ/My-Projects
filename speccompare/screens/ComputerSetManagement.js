import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ComputerSetManagement({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F8FF" />
      <LinearGradient
        colors={['#E1E9FF', '#F7FAFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>เลือกหมวดคอมพิวเตอร์เซ็ต</Text>
            <Text style={styles.subtitle}>กรุณาเลือกประเภทคอมพิวเตอร์เซ็ตที่ต้องการจัดการ</Text>
          </View>

          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('UserSpecManagement')}
            >
              <LinearGradient
                colors={['#E0F2FF', '#D5EDFF']}
                style={styles.iconGradient}
              >
                <Ionicons name="person" size={32} color="#2E78FF" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>จัดการคอมเซ็ตผู้ใช้</Text>
                <Text style={styles.cardDescription}>สำหรับผู้ใช้งานทั่วไป</Text>
              </View>
              <View style={styles.arrowContainer}>
                <View style={styles.arrowCircle}>
                  <Ionicons name="chevron-forward" size={20} color="#2E78FF" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ManageAISpec')}
            >
              <LinearGradient
                colors={['#FFEDD4', '#FFE6C2']}
                style={styles.iconGradient}
              >
                <Ionicons name="flash" size={32} color="#FFB800" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>จัดการคอมเซ็ต AI</Text>
                <Text style={styles.cardDescription}>สำหรับงานประมวลผล AI</Text>
              </View>
              <View style={styles.arrowContainer}>
                <View style={styles.arrowCircle}>
                  <Ionicons name="chevron-forward" size={20} color="#FFB800" />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AdminSpecManagement')}
            >
              <LinearGradient
                colors={['#FFE0E0', '#FFD6D6']}
                style={styles.iconGradient}
              >
                <Ionicons name="shield" size={32} color="#FF5252" />
              </LinearGradient>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>จัดการคอมเซ็ตแอดมิน</Text>
                <Text style={styles.cardDescription}>สำหรับงานบริหารจัดการ</Text>
              </View>
              <View style={styles.arrowContainer}>
                <View style={styles.arrowCircle}>
                  <Ionicons name="chevron-forward" size={20} color="#FF5252" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#1E3D8F',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#5A7089',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '85%',
  },
  cardsContainer: {
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#1E3D8F',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconGradient: {
    width: 68,
    height: 68,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3D8F',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#5A7089',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});