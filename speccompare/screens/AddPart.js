import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const categoryIcons = {
  cpu: 'hardware-chip-outline',
  gpu: 'game-controller-outline',
  ram: 'server-outline',
  ssd: 'save-outline',
  hdd: 'disc-outline',
  psu: 'flash-outline',
  case: 'cube-outline',
  cooler: 'thermometer-outline',
  mainboard: 'grid-outline'
};

export default function AddPart({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('cpu');
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !category || !image) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', {
      uri: image,
      name: `img_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/add-part.php', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const json = await res.json();
      if (json.status === 'success') {
        Alert.alert('สำเร็จ', 'เพิ่มอุปกรณ์เรียบร้อยแล้ว');
        navigation.goBack();
      } else {
        Alert.alert('ผิดพลาด', json.message || 'เพิ่มข้อมูลไม่สำเร็จ');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('ผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#1A237E', '#283593', '#3949AB']}
            style={styles.headerContainer}
          >
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.header}>เพิ่มอุปกรณ์ฮาร์ดแวร์</Text>
            <View style={styles.headerUnderline} />
          </LinearGradient>

          <View style={styles.formContainer}>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>รูปภาพอุปกรณ์</Text>
              <TouchableOpacity 
                style={styles.imageBox} 
                onPress={handleImagePick}
                activeOpacity={0.8}
              >
                {image ? (
                  <>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.editImageBadge}>
                      <Ionicons name="camera" size={18} color="#fff" />
                    </View>
                  </>
                ) : (
                  <View style={styles.placeholderContainer}>
                    <Ionicons name="image-outline" size={40} color="#A1A1A1" />
                    <Text style={styles.placeholderText}>แตะเพื่อเลือกรูปภาพ</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>ข้อมูลอุปกรณ์</Text>
              
              <View style={styles.inputContainer}>
                <Ionicons name="information-circle-outline" size={20} color="#3949AB" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="ชื่ออุปกรณ์" 
                  value={name} 
                  onChangeText={setName} 
                  placeholderTextColor="#9E9E9E"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Ionicons name="pricetag-outline" size={20} color="#3949AB" style={styles.inputIcon} />
                <TextInput 
                  style={styles.input} 
                  placeholder="ราคา" 
                  value={price} 
                  onChangeText={setPrice} 
                  keyboardType="numeric" 
                  placeholderTextColor="#9E9E9E"
                />
              </View>

              <View style={styles.pickerContainer}>
                <View style={styles.pickerIconContainer}>
                  <Ionicons name={categoryIcons[category] || 'apps-outline'} size={20} color="#3949AB" style={styles.pickerIcon} />
                </View>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#3949AB"
                  >
                    <Picker.Item label="CPU" value="cpu" />
                    <Picker.Item label="GPU" value="gpu" />
                    <Picker.Item label="RAM" value="ram" />
                    <Picker.Item label="SSD" value="ssd" />
                    <Picker.Item label="HDD" value="hdd" />
                    <Picker.Item label="PSU" value="psu" />
                    <Picker.Item label="CASE" value="case" />
                    <Picker.Item label="COOLER" value="cooler" />
                    <Picker.Item label="MAINBOARD" value="mainboard" />
                  </Picker>
                </View>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.saveButtonContainer}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#FFA000', '#FFC107', '#FFCA28']}
                style={styles.saveButton}
              >
                <Ionicons name="save-outline" size={20} color="#fff" />
                <Text style={styles.buttonText}>บันทึกข้อมูล</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  keyboardAvoid: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
    padding: 4,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center',
  },
  headerUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#FFCA28',
    marginTop: 8,
    borderRadius: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3949AB',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  imageBox: {
    height: 200,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  editImageBadge: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'rgba(57, 73, 171, 0.8)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#757575',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerIconContainer: {
    backgroundColor: '#F9F9F9',
    padding: 17,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRightWidth: 0,
  },
  pickerIcon: {
    width: 20,
    height: 20,
  },
  pickerWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#F9F9F9',
    height: 56,
    justifyContent: 'center',
  },
  picker: {
    color: '#333',
  },
  saveButtonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});