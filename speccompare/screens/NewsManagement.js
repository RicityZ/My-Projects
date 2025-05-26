import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

export default function NewsManagement() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const fetchNews = () => {
    setLoading(true);
    fetch('http://10.0.2.2/speccompare-api/get-news.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setNewsList(data.data);
        } else {
          setNewsList([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  };

  useFocusEffect(useCallback(() => {
    fetchNews();
  }, []));

  const handleDelete = (id) => {
    Alert.alert('ยืนยันการลบ', 'คุณต้องการลบข่าวสารนี้ใช่หรือไม่?', [
      { text: 'ยกเลิก', style: 'cancel' },
      {
        text: 'ลบ',
        style: 'destructive',
        onPress: () => {
          fetch(`http://10.0.2.2/speccompare-api/delete-news.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 'success') {
                fetchNews();
              } else {
                Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลบข่าวได้');
              }
            })
            .catch((err) => {
              console.error(err);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
            });
        },
      },
    ]);
  };

  const filteredNews = newsList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <FontAwesome5 name="newspaper" size={60} color="#CCCCCC" />
        <Text style={styles.emptyStateText}>ไม่พบข่าวสาร</Text>
        <Text style={styles.emptyStateSubText}>
          เพิ่มข่าวสารใหม่ด้วยการกดปุ่มด้านบน
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3D8F" />
      
      <LinearGradient
        colors={['#1E3D8F', '#102158']}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>จัดการข่าวสาร</Text>
          <Text style={styles.headerSubtitle}>เพิ่ม แก้ไข และลบข่าวสารของระบบ</Text>
        </View>
      </LinearGradient>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="ค้นหาข่าวตามหัวข้อ"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearch}>
              <FontAwesome5 name="times-circle" size={16} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddNews')}
          activeOpacity={0.8}
        >
          <FontAwesome5 name="plus" size={14} color="#FFF" style={styles.addIcon} />
          <Text style={styles.addButtonText}>เพิ่มข่าวสารใหม่</Text>
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsHeaderText}>รายการข่าวสาร</Text>
            <Text style={styles.newsCount}>
              {filteredNews.length} รายการ
            </Text>
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#1E3D8F" />
              <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
            </View>
          ) : filteredNews.length === 0 ? (
            renderEmptyState()
          ) : (
            <ScrollView 
              style={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
              {filteredNews.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.row}>
                    <Image source={{ uri: item.image_url }} style={styles.thumbnail} />
                    <View style={styles.textContent}>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={styles.content} numberOfLines={2}>
                        {item.content}
                      </Text>
                      <TouchableOpacity 
                        onPress={() => Linking.openURL(item.link)}
                        style={styles.linkButton}
                      >
                        <Text style={styles.linkText}>ดูเพิ่มเติม</Text>
                        <FontAwesome5 name="external-link-alt" size={12} color="#1E3D8F" style={styles.linkIcon} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.editButton]}
                      onPress={() => navigation.navigate('EditNews', { newsData: item })}
                    >
                      <FontAwesome5 name="edit" size={12} color="#FFF" style={styles.actionIcon} />
                      <Text style={styles.actionText}>แก้ไข</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDelete(item.id)}
                    >
                      <FontAwesome5 name="trash-alt" size={12} color="#FFF" style={styles.actionIcon} />
                      <Text style={styles.actionText}>ลบ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              <View style={styles.bottomPadding} />
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
  },
  clearSearch: {
    padding: 4,
  },
  addButton: {
    backgroundColor: '#1E3D8F',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#1E3D8F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newsHeaderText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  newsCount: {
    fontSize: 14,
    color: '#666',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  scroll: {
    flex: 1,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  row: {
    flexDirection: 'row',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  content: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  linkText: {
    color: '#1E3D8F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  linkIcon: {
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    backgroundColor: '#FF5C5C',
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  bottomPadding: {
    height: 20,
  },
});