import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

export default function AddNews({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    let localUri = image;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('image', {
      uri: localUri,
      name: filename,
      type,
    });

    let res = await fetch('http://10.0.2.2/speccompare-api/upload-news-image.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    let json = await res.json();
    return json.url;
  };

  const handleSubmit = async () => {
    if (!title || !content || !link || !image) {
      Alert.alert('กรุณาตรวจสอบข้อมูล', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      setUploading(true);
      const imageUrl = await uploadImage();

      const res = await fetch('http://10.0.2.2/speccompare-api/add-news.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          image_url: imageUrl,
          link,
        }),
      });

      const json = await res.json();

      if (json.status === 'success') {
        Alert.alert('สำเร็จ', 'เพิ่มข้อมูลข่าวสารเรียบร้อยแล้ว');
        navigation.goBack();
      } else {
        Alert.alert('ผิดพลาด', json.message || 'ไม่สามารถเพิ่มข่าวสารได้');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>เพิ่มข้อมูลข่าวสาร</Text>
          <MaterialIcons name="post-add" size={24} color="#1C3F94" />
        </View>

        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="edit-3" size={16} color="#1C3F94" /> หัวข้อข่าวสาร
            </Text>
            <TextInput 
              style={styles.input} 
              value={title} 
              onChangeText={setTitle} 
              placeholder="ระบุหัวข้อข่าวสาร"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="file-text" size={16} color="#1C3F94" /> เนื้อหาข่าว
            </Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              value={content} 
              onChangeText={setContent} 
              placeholder="รายละเอียดเนื้อหาข่าวสาร"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="image" size={16} color="#1C3F94" /> รูปภาพประกอบ
            </Text>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
              <Text style={styles.uploadText}>{image ? 'เปลี่ยนรูปภาพ' : 'เลือกรูปภาพ'}</Text>
            </TouchableOpacity>
            {image && (
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.preview} />
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="link" size={16} color="#1C3F94" /> ลิงก์ข่าว
            </Text>
            <TextInput 
              style={styles.input} 
              value={link} 
              onChangeText={setLink} 
              placeholder="https://example.com/news"
              placeholderTextColor="#aaa"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity 
            onPress={handleSubmit} 
            style={[styles.submitButton, uploading && styles.submitButtonDisabled]} 
            disabled={uploading}
          >
            {uploading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.submitText}> กำลังบันทึก...</Text>
              </View>
            ) : (
              <View style={styles.submitContainer}>
                <Feather name="save" size={18} color="#fff" />
                <Text style={styles.submitText}> บันทึกข้อมูล</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F7FA',
    minHeight: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C3F94',
    marginRight: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F8F9FB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontSize: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#1C3F94',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  imageContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  preview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#1C3F94',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1C3F94',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#7891C5',
  },
  submitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});