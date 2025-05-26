import React, { useState } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

export default function EditNews({ route, navigation }) {
  const { newsData } = route.params;

  const [title, setTitle] = useState(newsData.title);
  const [content, setContent] = useState(newsData.content);
  const [link, setLink] = useState(newsData.link);
  const [imageUrl, setImageUrl] = useState(newsData.image_url);
  const [newImage, setNewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    const uri = newImage;
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('image', {
      uri,
      name: filename,
      type,
    });

    const res = await fetch('http://10.0.2.2/speccompare-api/upload-news-image.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const data = await res.json();
    if (data.status === 'success') {
      return data.url;
    } else {
      throw new Error(data.message || 'อัปโหลดรูปไม่สำเร็จ');
    }
  };

  const handleUpdate = async () => {
    if (!title || !content || !link) {
      Alert.alert('กรุณาตรวจสอบข้อมูล', 'โปรดกรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      setIsLoading(true);
      let imageToSend = imageUrl;
      if (newImage) {
        imageToSend = await uploadImage();
      }

      const response = await fetch('http://10.0.2.2/speccompare-api/update-news.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newsData.id,
          title,
          content,
          link,
          image_url: imageToSend,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        Alert.alert('สำเร็จ', 'แก้ไขข่าวสารเรียบร้อยแล้ว');
        navigation.goBack();
      } else {
        Alert.alert('เกิดข้อผิดพลาด', result.message || 'ไม่สามารถอัปเดตได้');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>แก้ไขข่าวสาร</Text>
          <MaterialIcons name="edit" size={24} color="#1E3D8F" />
        </View>
        
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="edit-3" size={16} color="#1E3D8F" /> หัวข้อข่าว
            </Text>
            <TextInput 
              style={styles.input} 
              value={title} 
              onChangeText={setTitle} 
              placeholder="ระบุหัวข้อข่าว"
              placeholderTextColor="#aaa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="file-text" size={16} color="#1E3D8F" /> เนื้อหา
            </Text>
            <TextInput 
              style={[styles.input, styles.textArea]} 
              value={content} 
              onChangeText={setContent} 
              multiline 
              numberOfLines={4}
              placeholder="รายละเอียดเนื้อหาข่าว"
              placeholderTextColor="#aaa"
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="link" size={16} color="#1E3D8F" /> ลิงก์
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              <Feather name="image" size={16} color="#1E3D8F" /> รูปภาพ
            </Text>
            <View style={styles.imageContainer}>
              {newImage ? (
                <Image source={{ uri: newImage }} style={styles.image} />
              ) : (
                <Image source={{ uri: imageUrl }} style={styles.image} />
              )}
            </View>
            
            <TouchableOpacity style={styles.pickImageBtn} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
              <Text style={styles.pickImageText}>เลือกรูปใหม่</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
            onPress={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.saveText}> กำลังบันทึก...</Text>
              </View>
            ) : (
              <View style={styles.saveContainer}>
                <Feather name="check-circle" size={18} color="#fff" />
                <Text style={styles.saveText}> บันทึกการแก้ไข</Text>
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
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E3D8F',
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
    minHeight: 100,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  pickImageBtn: {
    backgroundColor: '#1E3D8F',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickImageText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: '#1E3D8F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#1E3D8F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#64749F',
  },
  saveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});