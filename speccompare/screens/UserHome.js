import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useUser } from '../context/UserContext';
import CustomHeader from '../components/CustomHeader';
import NewsSection from '../components/NewsSection';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function UserHome() {
  const { firstName, username } = useUser();
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState('gaming');
  const [specs, setSpecs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSpecs = () => {
    console.log('กำลังดึงข้อมูลสเปค, หมวดหมู่:', selectedCategory);
    setLoading(true);
    
    fetch(`http://10.0.2.2/speccompare-api/get-popular-pc.php?category=${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('ผลลัพธ์จาก API:', data); // ตรวจสอบข้อมูลที่ได้รับ
        if (data.status === 'success') {
          const updatedData = data.data.map((item) => ({
            ...item,
            liked: item.likedBy?.includes(username),
          }));
          setSpecs(updatedData);
        } else {
          console.log('ไม่พบข้อมูล');
          setSpecs([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setSpecs([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSpecs();
  }, [selectedCategory]);

  const handleLike = (specId) => {
    fetch('http://10.0.2.2/speccompare-api/toggle-like.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `spec_id=${specId}&username=${username}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setSpecs((prev) =>
            prev.map((spec) =>
              spec.id === specId
                ? {
                    ...spec,
                    liked: !spec.liked,
                    likes: spec.liked ? spec.likes - 1 : spec.likes + 1,
                  }
                : spec
            )
          );
        } else {
          console.log('เกิดข้อผิดพลาดในการกดไลค์');
        }
      })
      .catch((error) => console.log(error));
  };

  const getCategoryName = (category) => {
    switch (category) {
      case 'gaming': return 'เกมมิ่ง';
      case 'work': return 'ทำงาน';
      case 'graphic': return 'กราฟิก';
      default: return category;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'gaming': return <MaterialIcons name="sports-esports" size={16} color={selectedCategory === category ? "#fff" : "#3B82F6"} />;
      case 'work': return <MaterialIcons name="work" size={16} color={selectedCategory === category ? "#fff" : "#3B82F6"} />;
      case 'graphic': return <MaterialIcons name="palette" size={16} color={selectedCategory === category ? "#fff" : "#3B82F6"} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CustomHeader name={firstName} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.greetingContainer}>
            <MaterialCommunityIcons name="monitor-dashboard" size={24} color="#173B7A" />
            <Text style={styles.greeting}>สเปคคอมยอดนิยมที่ผู้อื่นจัดไว้</Text>
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.categoryHeader}>
              <FontAwesome name="tags" size={18} color="#1F2937" /> หมวดหมู่
            </Text>

            <View style={styles.categoryRow}>
              {['gaming', 'work', 'graphic'].map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)}
                  <Text style={[styles.categoryTitle, selectedCategory === category && styles.selectedCategoryText]}>
                    {getCategoryName(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#173B7A" />
                <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
              </View>
            ) : specs.length === 0 ? (
              <View style={styles.emptyContainer}>
                <MaterialIcons name="search-off" size={50} color="#A1A1AA" />
                <Text style={styles.emptyText}>ไม่พบสเปคในหมวดหมู่นี้</Text>
                <TouchableOpacity 
                  style={styles.refreshButton}
                  onPress={fetchSpecs}
                >
                  <Ionicons name="refresh" size={16} color="#fff" style={{marginRight: 6}} />
                  <Text style={styles.refreshButtonText}>ลองอีกครั้ง</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.grid}>
                {specs.slice(0, 6).map((spec, index) => (
                  <TouchableOpacity 
                    key={spec.id} 
                    style={styles.card}
                    onPress={() => navigation.navigate('SpecDetail', { spec_id: spec.id })}
                    activeOpacity={0.8}
                  >
                    <View style={styles.cardInner}>
                      <View style={styles.rankBadgeContainer}>
                        <Text style={styles.rankBadge}>
                          <FontAwesome name="trophy" size={12} color="#fff" /> อันดับ {index + 1}
                        </Text>
                      </View>

                      {spec.image_url ? (
                        <Image
                          source={{ uri: spec.image_url }}
                          style={styles.image}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={[styles.image, styles.noImage]}>
                          <MaterialIcons name="image-not-supported" size={24} color="#A1A1AA" />
                          <Text style={styles.noImageText}>ไม่มีภาพประกอบ</Text>
                        </View>
                      )}

                      <View style={styles.cardContent}>
                        <Text style={styles.pcName} numberOfLines={2}>{spec.spec_name}</Text>
                        <View style={styles.tagContainer}>
                          <Text style={styles.tag}>
                            {getCategoryIcon(spec.category)} {getCategoryName(spec.category)}
                          </Text>
                        </View>
                        <Text style={styles.price}>฿{Number(spec.price).toLocaleString()}</Text>
                      </View>

                      <View style={styles.iconRow}>
                        <TouchableOpacity 
                          onPress={(e) => {
                            e.stopPropagation();
                            handleLike(spec.id);
                          }}
                          style={styles.likeButton}
                        >
                          <FontAwesome
                            name={spec.liked ? "heart" : "heart-o"}
                            size={18}
                            color={spec.liked ? "#FF4D67" : "#6B7280"}
                          />
                          <Text style={[styles.likeText, spec.liked && styles.likedText]}>
                            {spec.likes}
                          </Text>
                        </TouchableOpacity>
                        
                        <View style={styles.bookmarkIcon}>
                          <MaterialIcons name="bookmark-border" size={20} color="#6B7280" />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <NewsSection />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
  },
  container: { 
    flex: 1,
  },
  scrollContent: { 
    padding: 16,
    paddingBottom: 30
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#173B7A',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 14,
    color: '#6B7280',
    fontSize: 15,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#6B7280',
    marginVertical: 15,
    fontSize: 16,
    fontWeight: '500',
  },
  refreshButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  refreshButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#1F2937',
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  categoryTitle: {
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },
  selectedCategory: {
    backgroundColor: '#3B82F6',
    borderColor: '#2563EB',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  cardInner: {
    padding: 0,
  },
  rankBadgeContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
  },
  rankBadge: {
    backgroundColor: '#3B82F6',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: '#F3F4F6',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  noImageText: {
    color: '#A1A1AA',
    fontSize: 12,
    marginTop: 6,
  },
  cardContent: {
    padding: 12,
  },
  pcName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 8,
    height: 38,
  },
  tagContainer: {
    marginBottom: 8,
  },
  tag: {
    color: '#6B7280',
    fontSize: 12,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  price: {
    color: '#3B82F6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFBFC',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeText: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 14,
  },
  likedText: {
    color: '#FF4D67',
  },
  bookmarkIcon: {
    paddingHorizontal: 5,
  },
});