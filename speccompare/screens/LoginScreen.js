import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Alert, ImageBackground
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const { setFirstName, setUsername } = useUser(); // ดึง context

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบ');
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const json = await response.json();
  
      if (json.status === 'success') {
        const role = json.user.role;
        const name = json.user.first_name;
  
        setFirstName(name);
        setUsername(json.user.username);
  
        if (role === 'user') {
          Alert.alert('เข้าสู่ระบบสำเร็จ', `ยินดีต้อนรับคุณ ${name}`);
          navigation.navigate('Tabs');
        } else if (role === 'admin') {
          Alert.alert('ผู้ดูแลระบบ', `ยินดีต้อนรับผู้ดูแล ${name}`);
          navigation.navigate('AdminHome'); // ✅ ไปหน้าแอดมิน
        } else {
          Alert.alert('แจ้งเตือน', 'ไม่สามารถเข้าสู่ระบบได้: ไม่รู้จักสิทธิ์');
        }
  
      } else {
        Alert.alert('ผิดพลาด', json.message);
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };
  

  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>SpecCompare</Text>
        </View>

        <Text style={styles.title}>เข้าสู่ระบบ</Text>

        <TextInput
          placeholder="ชื่อผู้ใช้"
          style={styles.input}
          value={username}
          onChangeText={setUsernameInput}
        />
        <TextInput
          placeholder="รหัสผ่าน"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

<View style={{ alignItems: 'flex-end', marginBottom: 10 }}>
  <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
    <Text style={styles.forgotText}>ลืมรหัสผ่าน?</Text>
  </TouchableOpacity>
</View>


        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>ลงทะเบียน</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  logoCircle: {
    backgroundColor: '#fff', borderRadius: 50, padding: 20, alignSelf: 'center', marginBottom: 10,
  },
  logoText: { fontWeight: 'bold', textAlign: 'center' },
  title: {
    fontSize: 26, fontWeight: 'bold', textAlign: 'center',
    marginBottom: 20, color: '#fff',
  },
  input: {
    backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 12,
    height: 45, marginBottom: 15,
  },
  forgot: { alignItems: 'flex-end' },
  forgotText: { color: '#ccc' },
  loginButton: {
    backgroundColor: '#000', borderRadius: 8,
    padding: 15, alignItems: 'center', marginTop: 20,
  },
  loginText: { color: '#fff', fontWeight: 'bold' },
  registerText: { color: '#ccc', marginTop: 15, textAlign: 'center' },
});
