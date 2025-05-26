import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EditProfile() {
  const navigation = useNavigation();
 const { username, setUsername } = useUser();


  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [originalUsername, setOriginalUsername] = useState(''); 
  const [originalPassword, setOriginalPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://10.0.2.2/speccompare-api/get-user.php?username=${username}`); // ✅ ใช้ username ที่ถูกต้อง
        const json = await res.json();
        if (json.status === 'success') {
          const userData = json.user;
          setUserInfo({
            username: userData.username || '',
            password: userData.password || '',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            phone: userData.phone || ''
          });
          setOriginalUsername(userData.username || ''); // ✅ เก็บค่าชื่อผู้ใช้เดิมจาก DB
          setOriginalPassword(userData.password || '');
        } else {
          Alert.alert('ข้อผิดพลาด', 'ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        }
      } catch (err) {
        console.error('Load user error:', err);
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  const handleSave = async () => {
    if (!userInfo.username || !userInfo.password) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    if (!userInfo.first_name || !userInfo.last_name) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อและนามสกุล');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/update-user.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          oldUsername: originalUsername,
          username: userInfo.username,
          password: userInfo.password,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email,
          phone: userInfo.phone
        }),
      });

      const json = await response.json();
      
      if (json.status === 'success') {
        const usernameChanged = userInfo.username !== originalUsername;
        const passwordChanged = userInfo.password !== originalPassword;
      
        if (usernameChanged) {
          setUsername(userInfo.username); 
        }
      
        if (passwordChanged) {
          Alert.alert('สำเร็จ', 'รหัสผ่านถูกเปลี่ยน กรุณาเข้าสู่ระบบใหม่', [
            { text: 'ตกลง', onPress: () => navigation.navigate('Login') }
          ]);
        } else {
          Alert.alert('สำเร็จ', 'บันทึกข้อมูลเรียบร้อยแล้ว', [
            { text: 'ตกลง', onPress: () => navigation.goBack() }
          ]);
        }
      } else {
        Alert.alert('ข้อผิดพลาด', json.message);
      }
    } catch (err) {
      console.error('Save user error:', err);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#173B7A" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>แก้ไขโปรไฟล์</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>ชื่อผู้ใช้</Text>
          <TextInput
            style={styles.input}
            value={userInfo.username}
            onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
            placeholder="กรอกชื่อผู้ใช้"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          <Text style={styles.label}>รหัสผ่าน</Text>
          <TextInput
            style={styles.input}
            value={userInfo.password}
            onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
            placeholder="กรอกรหัสผ่าน"
            placeholderTextColor="#999"
            secureTextEntry
            autoCapitalize="none"
          />

          <Text style={styles.label}>ชื่อ</Text>
          <TextInput
            style={styles.input}
            value={userInfo.first_name}
            onChangeText={(text) => setUserInfo({ ...userInfo, first_name: text })}
            placeholder="กรอกชื่อ"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>นามสกุล</Text>
          <TextInput
            style={styles.input}
            value={userInfo.last_name}
            onChangeText={(text) => setUserInfo({ ...userInfo, last_name: text })}
            placeholder="กรอกนามสกุล"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>อีเมล</Text>
          <TextInput
            style={styles.input}
            value={userInfo.email}
            onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
            placeholder="กรอกอีเมล"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>เบอร์โทรศัพท์</Text>
          <TextInput
            style={styles.input}
            value={userInfo.phone}
            onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
            placeholder="กรอกเบอร์โทรศัพท์"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={[styles.saveButton, saving && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>บันทึก</Text>
            )}
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#173B7A',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerPlaceholder: {
    width: 32,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  formContainer: {
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  saveButton: {
    backgroundColor: '#173B7A',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDisabled: {
    backgroundColor: '#A3BFFA',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
