// EditHardware.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditHardware() {
  const navigation = useNavigation();
  const route = useRoute();
  const { hardwareData: hardware } = route.params;

  const [name, setName] = useState(hardware.name || '');
  const [price, setPrice] = useState(hardware.price?.toString() || '');
  const [category, setCategory] = useState(hardware.category || 'cpu');
  const [image, setImage] = useState(hardware.image_url || null);
  const [newImage, setNewImage] = useState(null);

  const categories = [
    'cpu', 'gpu', 'ram', 'ssd', 'hdd',
    'psu', 'case', 'cooler', 'mainboard',
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setNewImage(uri);
    }
  };

  const handleUpdate = async () => {
    if (!name || !price || !category) {
      Alert.alert('ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('id', hardware.id);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);

    if (newImage) {
      const fileName = newImage.split('/').pop();
      const match = /\.(\w+)$/.exec(fileName);
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', {
        uri: newImage,
        name: fileName,
        type,
      });
    }

    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/update-part.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      if (result.status === 'success') {
        Alert.alert('สำเร็จ', 'แก้ไขข้อมูลเรียบร้อย');
        navigation.goBack();
      } else {
        Alert.alert('ข้อผิดพลาด', result.message || 'ไม่สามารถแก้ไขข้อมูลได้');
      }
    } catch (error) {
      console.error('Error updating part:', error);
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3D8F" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>แก้ไขอุปกรณ์ฮาร์ดแวร์</Text>
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>รูปภาพอุปกรณ์</Text>
          <TouchableOpacity 
            style={styles.imageBox} 
            onPress={pickImage}
            activeOpacity={0.7}
          >
            {newImage ? (
              <Image source={{ uri: newImage }} style={styles.image} />
            ) : image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholderContainer}>
                <Ionicons name="camera" size={32} color="#1E3D8F" />
                <Text style={styles.imagePlaceholder}>เลือกรูปภาพ</Text>
              </View>
            )}
            <View style={styles.editImageBadge}>
              <Ionicons name="create-outline" size={16} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>รายละเอียดอุปกรณ์</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ชื่ออุปกรณ์</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="hardware-chip-outline" size={22} color="#1E3D8F" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกชื่ออุปกรณ์"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#AAA"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ราคา (บาท)</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="pricetag-outline" size={22} color="#1E3D8F" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="กรอกราคา"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                placeholderTextColor="#AAA"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>ประเภทอุปกรณ์</Text>
            <View style={styles.dropdownWrapper}>
              <Ionicons name="list-outline" size={22} color="#1E3D8F" style={styles.inputIcon} />
              <View style={styles.dropdownContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue) => setCategory(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#1E3D8F"
                >
                  {categories.map((cat) => (
                    <Picker.Item 
                      label={cat.toUpperCase()} 
                      value={cat} 
                      key={cat} 
                      color="#333"
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle-outline" size={22} color="#1E3D8F" />
          <Text style={styles.cancelButtonText}>ยกเลิก</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={handleUpdate}
          activeOpacity={0.7}
        >
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.saveButtonText}>บันทึกการเปลี่ยนแปลง</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E3D8F',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySpace: {
    width: 28,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3D8F',
    marginBottom: 12,
    marginTop: 8,
  },
  imageBox: {
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  imagePlaceholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    color: '#666',
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  editImageBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#1E3D8F',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    fontWeight: '500',
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  dropdownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1E3D8F',
  },
  cancelButtonText: {
    color: '#1E3D8F',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E3D8F',
    padding: 12,
    borderRadius: 8,
    flex: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});