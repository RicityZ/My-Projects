import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (Object.values(form).some((val) => val.trim() === '')) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await response.json();

      if (json.status === 'success') {
        Alert.alert('ลงทะเบียนสำเร็จ', `ยินดีต้อนรับคุณ ${form.firstName}`);
        navigation.navigate('Login');
      } else {
        Alert.alert('ผิดพลาด', json.message);
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <View style={styles.root}>
      {/* พื้นหลังบน */}
      <View style={styles.topShape} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formBox}>
          <Text style={styles.title}>ลงทะเบียน</Text>

          <TextInput
            style={styles.input}
            placeholder="ชื่อผู้ใช้"
            value={form.username}
            onChangeText={(val) => handleChange('username', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="รหัสผ่าน"
            secureTextEntry
            value={form.password}
            onChangeText={(val) => handleChange('password', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="ชื่อ"
            value={form.firstName}
            onChangeText={(val) => handleChange('firstName', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="นามสกุล"
            value={form.lastName}
            onChangeText={(val) => handleChange('lastName', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="อีเมล"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => handleChange('email', val)}
          />
          <TextInput
            style={styles.input}
            placeholder="เบอร์โทรศัพท์"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(val) => handleChange('phone', val)}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>ยืนยัน</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* พื้นหลังล่าง */}
      <View style={styles.bottomShape} />
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#173B7A',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formBox: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    marginTop: -60,
  },
  topShape: {
    height: 120,
    backgroundColor: '#173B7A',
    transform: [{ skewY: '-5deg' }],
  },
  bottomShape: {
    height: 100,
    backgroundColor: '#173B7A',
    transform: [{ skewY: '5deg' }],
    marginTop: -40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  loginLink: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 15,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#FDB813',
    paddingVertical: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
