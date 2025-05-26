import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('กรุณากรอกอีเมล');
      return;
    }

    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/forgot-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const raw = await res.text(); // อ่านเป็น text ก่อน
      console.log('📦 RAW RESPONSE:', raw); // ดูใน log dev

      try {
        const data = JSON.parse(raw); // แปลง JSON อย่างปลอดภัย
        if (data.status === 'success') {
          Alert.alert('สำเร็จ', data.message);
          navigation.goBack();
        } else {
          Alert.alert('ผิดพลาด', data.message);
        }
      } catch (err) {
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่ได้รับข้อมูล JSON ที่ถูกต้อง:\n' + raw);
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ลืมรหัสผ่าน</Text>
      <TextInput
        style={styles.input}
        placeholder="กรอกอีเมลที่ลงทะเบียน"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
        <Text style={styles.buttonText}>ส่งลิงก์รีเซ็ตรหัสผ่าน</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#173B7A',
    padding: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
