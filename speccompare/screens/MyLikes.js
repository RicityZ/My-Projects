import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useUser } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MyLikes({ navigation }) {
  const { username } = useUser();
  const [likedSpecs, setLikedSpecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedSpecId, setSelectedSpecId] = useState(null);

  const fetchLikedSpecs = () => {
    fetch(`http://10.0.2.2/speccompare-api/get-liked-specs.php?username=${username}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 'success') {
          setLikedSpecs(json.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLikedSpecs();
  }, []);

  const handleUnlikePress = (specId) => {
    setSelectedSpecId(specId);
    setShowModal(true);
  };

  const confirmUnlike = () => {
    fetch('http://10.0.2.2/speccompare-api/toggle-like.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `spec_id=${selectedSpecId}&username=${username}`,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setLikedSpecs((prev) => prev.filter((item) => item.id !== selectedSpecId));
        }
        setShowModal(false);
      })
      .catch((error) => {
        console.error(error);
        setShowModal(false);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar backgroundColor="#173B7A" barStyle="light-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายการโปรด</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#173B7A" />
            <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>รายการโปรดทั้งหมด ({likedSpecs.length})</Text>
            {likedSpecs.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="heart-outline" size={80} color="#173B7A" />
                <Text style={styles.emptyText}>ยังไม่มีรายการที่ถูกใจ</Text>
                <TouchableOpacity 
                  style={styles.browseButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.browseButtonText}>ค้นหาสินค้า</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <ScrollView contentContainerStyle={styles.scrollContent}>
                {likedSpecs.map((spec) => (
                  <TouchableOpacity
                    key={spec.id}
                    style={styles.card}
                    onPress={() => navigation.navigate('SpecDetail', { spec_id: spec.id })}
                    activeOpacity={0.7}
                  >
                    <View style={styles.cardContent}>
                      <View style={styles.specInfo}>
                        <Text style={styles.name} numberOfLines={1}>{spec.spec_name}</Text>
                        <View style={styles.categoryTag}>
                          <Text style={styles.categoryText}>{spec.category}</Text>
                        </View>
                        <Text style={styles.price}>ราคา ฿{Number(spec.price).toLocaleString()}</Text>
                      </View>

                      <TouchableOpacity 
                        onPress={() => handleUnlikePress(spec.id)}
                        style={styles.heartButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons name="heart" size={24} color="#FF4D4D" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </>
        )}

        {/* ✅ MODAL: ยืนยันการลบ */}
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Ionicons name="heart-dislike-outline" size={28} color="#FF4D4D" />
                <Text style={styles.modalTitle}>ยืนยันการลบ</Text>
              </View>
              <Text style={styles.modalText}>คุณต้องการลบออกจากรายการที่ถูกใจหรือไม่?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCancel}>
                  <Text style={styles.modalCancelText}>ยกเลิก</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmUnlike} style={styles.modalConfirm}>
                  <Text style={styles.modalConfirmText}>ลบ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1, 
    backgroundColor: '#173B7A'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#173B7A',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 24, // เพื่อให้หัวข้ออยู่ตรงกลาง
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6FA' 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#173B7A',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 12,
    color: '#333',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#173B7A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  specInfo: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#173B7A',
  },
  categoryTag: {
    backgroundColor: '#FDB813',
    borderRadius: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  categoryText: {
    fontWeight: 'bold',
    color: '#173B7A',
    fontSize: 12,
  },
  price: {
    fontWeight: 'bold',
    color: '#22a45d',
    fontSize: 16,
  },
  heartButton: {
    padding: 8,
  },

  // ✅ MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
    color: '#555',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  modalConfirm: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FF4D4D',
    borderRadius: 8,
  },
  modalCancelText: {
    fontWeight: 'bold',
    color: '#555',
  },
  modalConfirmText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});