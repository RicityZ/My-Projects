import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CATEGORY_LABELS = {
  gaming: 'เกมมิ่ง',
  work: 'ทำงาน',
  graphic: 'กราฟิก'
};

export default function UserSpecManagement() {
  const [specs, setSpecs] = useState([]);
  const [filteredSpecs, setFilteredSpecs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, specs, searchQuery]);

  useFocusEffect(
    useCallback(() => {
      fetchSpecs();
    }, [])
  );

  const fetchSpecs = async () => {
    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/get-user-specs.php');
      const data = await response.json();
      if (data.status === 'success') {
        setSpecs(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณแน่ใจหรือไม่ว่าต้องการลบเซ็ตนี้?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ', style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch('http://10.0.2.2/speccompare-api/delete-user-spec.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
              });
              const data = await response.json();
              if (data.status === 'success') {
                fetchSpecs();
              } else {
                Alert.alert('ลบไม่สำเร็จ', data.message || 'เกิดข้อผิดพลาด');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถลบข้อมูลได้');
            }
          }
        }
      ]
    );
  };

  const applyFilter = () => {
    let filtered = specs;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(spec => spec.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(spec =>
        spec.spec_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSpecs(filtered);
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'gaming': return 'game-controller';
      case 'work': return 'briefcase';
      case 'graphic': return 'color-palette';
      default: return 'apps';
    }
  };

  return (
    <LinearGradient
      colors={['#1E3D8F', '#102055']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.headerSection}>
        <Text style={styles.header}>จัดการคอมพิวเตอร์เซ็ต</Text>
        <Text style={styles.subHeader}>รายการคอมเซ็ตสำหรับผู้ใช้ทั่วไป</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อสเปค..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        {['all', 'gaming', 'work', 'graphic'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.activeFilter
            ]}
            onPress={() => setSelectedCategory(cat)}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={getCategoryIcon(cat)} 
              size={18} 
              color={selectedCategory === cat ? '#1E3D8F' : '#555'} 
            />
            <Text 
              style={[
                styles.filterText,
                selectedCategory === cat && styles.activeFilterText
              ]}
            >
              {cat === 'all' ? 'ทั้งหมด' : CATEGORY_LABELS[cat]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultBadge}>
          <Text style={styles.resultText}>พบ {filteredSpecs.length} รายการ</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredSpecs.length > 0 ? (
          filteredSpecs.map((spec, index) => (
            <View key={spec.id} style={styles.specRow}>
              <View style={styles.orderBadge}>
                <Text style={styles.order}>{index + 1}</Text>
              </View>
              <View style={styles.specDetails}>
                <Text style={styles.name}>{spec.spec_name}</Text>
                <View style={styles.categoryBadge}>
                  <Ionicons 
                    name={getCategoryIcon(spec.category)} 
                    size={14} 
                    color="#1E3D8F" 
                  />
                  <Text style={styles.categoryText}>
                    {CATEGORY_LABELS[spec.category] || 'ทั่วไป'}
                  </Text>
                </View>
              </View>

              {spec.image_url ? (
                <Image
                  source={{ uri: spec.image_url }}
                  style={styles.specImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.noImageContainer}>
                  <Ionicons name="image-outline" size={22} color="#888" />
                </View>
              )}

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigation.navigate('EditUserSpec', { specId: spec.id })}
                >
                  <Ionicons name="create-outline" size={16} color="#000" />
                  <Text style={styles.btnText}>แก้ไข</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(spec.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#FFF" />
                  <Text style={styles.deleteBtnText}>ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#E0E0E0" />
            <Text style={styles.emptyText}>ไม่พบรายการที่ค้นหา</Text>
          </View>
        )}
        
        <View style={styles.bottomSpace} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
  },
  headerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26, 
    color: 'white', 
    fontWeight: 'bold',
    marginBottom: 6, 
    textAlign: 'center'
  },
  subHeader: {
    fontSize: 14,
    color: '#BFD1FF',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 12, 
    fontSize: 16, 
    color: '#333'
  },
  filterContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 6,
  },
  filterButton: {
    backgroundColor: '#fff', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10, 
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
  },
  filterIcon: {
    marginRight: 6,
  },
  activeFilter: { 
    backgroundColor: '#FFB800',
  },
  filterText: { 
    color: '#555', 
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  activeFilterText: {
    color: '#1E3D8F',
    fontWeight: 'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  resultBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  resultText: { 
    color: 'white', 
    fontSize: 14,
    fontWeight: '500',
  },
  scrollView: {
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
  },
  specRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 16,
    marginBottom: 12, 
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  orderBadge: {
    backgroundColor: '#1E3D8F',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  order: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#FFF',
  },
  specDetails: { 
    flex: 1,
    justifyContent: 'center',
  },
  name: { 
    fontSize: 16, 
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: '#1E3D8F',
    marginLeft: 4,
  },
  specImage: { 
    width: 56, 
    height: 56, 
    borderRadius: 8, 
    marginLeft: 10,
    marginRight: 12,
  },
  noImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 12,
  },
  buttonsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 70,
  },
  editBtn: {
    backgroundColor: '#FFB800', 
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 8, 
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 82,
    shadowColor: '#FFB80080',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  deleteBtn: {
    backgroundColor: '#FF5E5E', 
    paddingHorizontal: 12,
    paddingVertical: 8, 
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 82,
    shadowColor: '#FF5E5E80',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 3,
  },
  btnText: { 
    color: '#000', 
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 13,
  },
  deleteBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 4,
    fontSize: 13,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#E0E0E0',
    marginTop: 16,
    fontSize: 16,
  },
  bottomSpace: {
    height: 20,
  }
});