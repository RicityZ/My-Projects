// HardwareManagement.js
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const categories = ['cpu', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler', 'mainboard'];

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

export default function HardwareManagement() {
  const [hardwareList, setHardwareList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const fetchHardware = async () => {
    setIsLoading(true);
    try {
      let url = 'http://10.0.2.2/speccompare-api/get-parts-by-category.php';
      if (selectedCategories.length === 1) {
        url += `?category=${selectedCategories[0]}`;
      }

      const res = await fetch(url);
      const json = await res.json();
      if (json.status === 'success') {
        setHardwareList(json.data);
      }
    } catch (err) {
      console.error('Error fetching hardware:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHardware();
    }, [])
  );

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const filteredHardware = hardwareList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    Alert.alert('ยืนยันการลบ', 'คุณแน่ใจหรือไม่ว่าต้องการลบอุปกรณ์นี้?', [
      { text: 'ยกเลิก' },
      {
        text: 'ลบ',
        onPress: async () => {
          try {
            const res = await fetch('http://10.0.2.2/speccompare-api/delete-part.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id })
            });
            const json = await res.json();
            if (json.status === 'success') {
              fetchHardware();
            } else {
              Alert.alert('ล้มเหลว', json.message || 'ไม่สามารถลบได้');
            }
          } catch (err) {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A237E', '#283593', '#3949AB']}
        style={styles.headerContainer}
      >
        <Text style={styles.header}>จัดการอุปกรณ์ฮาร์ดแวร์</Text>
        <View style={styles.headerUnderline} />
      </LinearGradient>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#3949AB" style={styles.searchIcon} />
        <TextInput
          placeholder="ค้นหาอุปกรณ์"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor="#9E9E9E"
        />
        {search !== '' && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#9E9E9E" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterBox}>
        <View style={styles.filterTitleContainer}>
          <Ionicons name="filter" size={18} color="#3949AB" />
          <Text style={styles.filterTitle}>หมวดหมู่</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(cat) && styles.categoryButtonSelected
                ]}
                onPress={() => toggleCategory(cat)}   
              >
                <Ionicons 
                  name={categoryIcons[cat] || 'apps-outline'} 
                  size={14} 
                  color={selectedCategories.includes(cat) ? '#fff' : '#3949AB'} 
                  style={styles.categoryIcon}
                />
                <Text 
                  style={[
                    styles.categoryText,
                    selectedCategories.includes(cat) && styles.categoryTextSelected
                  ]}
                >
                  {cat.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.countAndAddContainer}>
        <View style={styles.countContainer}>
          <Ionicons name="list" size={16} color="#5C6BC0" />
          <Text style={styles.countText}>
            พบทั้งหมด <Text style={styles.countNumber}>{filteredHardware.length}</Text> รายการ
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddPart')}
        >
          <LinearGradient
            colors={['#FFA000', '#FFC107', '#FFCA28']}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.addButtonText}>เพิ่มอุปกรณ์</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3949AB" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : (
        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredHardware.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={60} color="#BDBDBD" />
              <Text style={styles.emptyText}>ไม่พบรายการอุปกรณ์</Text>
              <Text style={styles.emptySubtext}>ลองค้นหาด้วยคำอื่น หรือยกเลิกตัวกรอง</Text>
            </View>
          ) : (
            filteredHardware.map((item, index) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.indexBadge}>
                    <Text style={styles.itemIndex}>{index + 1}</Text>
                  </View>
                  <View style={styles.categoryTag}>
                    <Ionicons 
                      name={categoryIcons[item.category] || 'hardware-chip-outline'} 
                      size={12} 
                      color="#3949AB" 
                    />
                    <Text style={styles.categoryTagText}>{item.category}</Text>
                  </View>
                </View>
                
                <View style={styles.cardContent}>
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: item.image_url }} 
                      style={styles.image} 
                      resizeMode="contain"
                    />
                    <View style={styles.imageShadow} />
                  </View>
                  
                  <View style={styles.infoContainer}>
                    <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                  </View>
                  
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => navigation.navigate('EditHardware', { hardwareData: item })}
                    >
                      <Ionicons name="create-outline" size={16} color="#fff" />
                      <Text style={styles.buttonText}>แก้ไข</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(item.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#fff" />
                      <Text style={styles.buttonText}>ลบ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    margin: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  filterBox: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterTitle: { 
    fontWeight: 'bold', 
    marginLeft: 8,
    fontSize: 16,
    color: '#3949AB',
  },
  categoryScroll: {
    flexGrow: 0,
  },
  categoryRow: {
    flexDirection: 'row',
    paddingBottom: 4,
  },
  categoryButton: {
    borderColor: '#3949AB',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#3949AB',
  },
  categoryIcon: {
    marginRight: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3949AB',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  countAndAddContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 6,
  },
  countNumber: {
    fontWeight: 'bold',
    color: '#3949AB',
  },
  addButton: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#FFA000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#3949AB',
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 0,
  },
  indexBadge: {
    backgroundColor: '#3949AB',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemIndex: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cardContent: {
    padding: 12,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imageShadow: {
    position: 'absolute',
    bottom: 0,
    height: 30,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  infoContainer: {
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#212121',
    marginBottom: 8,
    lineHeight: 22,
  },
  categoryTag: {
    backgroundColor: '#E8EAF6',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryTagText: {
    color: '#3949AB',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#2962FF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    marginRight: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2962FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F44336',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  bottomPadding: {
    height: 24,
  },
});