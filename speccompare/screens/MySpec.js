  import React, { useEffect, useState, useCallback } from 'react';
  import {
    View, Text, StyleSheet, FlatList, Image,
    SafeAreaView, ActivityIndicator, TouchableOpacity, Alert,
    Modal, StatusBar, Platform
  } from 'react-native';
  import { useUser } from '../context/UserContext';
  import { useFocusEffect, useNavigation } from '@react-navigation/native';
  import Ionicons from 'react-native-vector-icons/Ionicons';

  export default function MySpec() {
    const { username } = useUser();
    const [specs, setSpecs] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSpecId, setSelectedSpecId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    
    const navigation = useNavigation();

    useEffect(() => {
      if (showDeleteSuccessModal) {
        const timer = setTimeout(() => {
          setShowDeleteSuccessModal(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    }, [showDeleteSuccessModal]);

    const fetchSpecs = async () => {
      try {
        // เปลี่ยนมาใช้ getuser-my-specs.php เพื่อดึงสเปคทั้งหมดของผู้ใช้
        const res = await fetch(`http://10.0.2.2/speccompare-api/getuser-my-specs.php?user=${username}`);
        const json = await res.json();
        if (json.status === 'success') {
          setSpecs(json.data || []);
        } else {
          Alert.alert("ข้อผิดพลาด", json.message || "ไม่สามารถดึงข้อมูลสเปคได้");
        }
      } catch (err) {
        console.error('load specs error:', err);
        Alert.alert("ข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    const fetchUser = async () => {
      try {
        const res = await fetch(`http://10.0.2.2/speccompare-api/get-user.php?username=${username}`);
        const json = await res.json();
        if (json.status === 'success') {
          setUserInfo(json.user);
        } else {
          Alert.alert("ข้อผิดพลาด", json.message || "ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        }
      } catch (err) {
        console.error('load user error:', err);
        Alert.alert("ข้อผิดพลาด", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      }
    };

    const handleDeletePress = (specId) => {
      setSelectedSpecId(specId);
      setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
      setDeleteLoading(true);
      try {
        const response = await fetch('http://10.0.2.2/speccompare-api/delete-spec.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: selectedSpecId }),
        });

        const json = await response.json();
        if (json.status === 'success') {
          setShowDeleteModal(false);
          setShowDeleteSuccessModal(true);
          await fetchSpecs();
        } else {
          Alert.alert("ลบไม่สำเร็จ", json.message);
        }
      } catch (err) {
        console.error(err);
        Alert.alert("ลบไม่สำเร็จ", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์");
      } finally {
        setDeleteLoading(false);
      }
    };

    const loadAll = async () => {
      setLoading(true);
      await Promise.all([fetchUser(), fetchSpecs()]);
      setLoading(false);
    };

    useFocusEffect(
      useCallback(() => {
        loadAll();
      }, [username])
    );

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => 
            navigation.navigate('SpecDetail', {
             spec_id: item.id,
              specName: item.spec_name,
              spec: item.spec,
              compatibility: item.compatibility,
              price: item.price,
              createdAt: item.created_at,
              recommendation: item.recommendation
            })
          }
        >
          <View style={styles.specItem}>
            {item.image_url ? (
              <Image source={{ uri: item.image_url }} style={styles.specImage} />
            ) : (
              <View style={styles.placeholder} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.specName}>{item.spec_name || 'ไม่มีชื่อ'}</Text>
              <Text style={styles.specPrice}>ราคา: ฿ {Number(item.price || 0).toLocaleString()}</Text>
              <Text style={styles.scoreText}>ความเข้ากันได้: {item.compatibility}%</Text>
              <Text style={styles.time}>บันทึกเมื่อ: {new Date(item.created_at).toLocaleString()}</Text>
            </View>
            <TouchableOpacity 
              onPress={() => handleDeletePress(item.id)}
              style={styles.deleteButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={24} color="#FF4D4D" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    };

    const DeleteSuccessModal = () => (
      <Modal
        visible={showDeleteSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successModalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>ลบสำเร็จ</Text>
            <Text style={styles.successMessage}>
              สเปคของคุณถูกลบเรียบร้อยแล้ว
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setShowDeleteSuccessModal(false)}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );

    const DeleteConfirmationModal = () => {
      const selectedSpec = specs.find(spec => spec.id === selectedSpecId);
      return (
        <Modal
          visible={showDeleteModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowDeleteModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Ionicons name="trash-outline" size={28} color="#FF4D4D" />
                <Text style={styles.modalTitle}>ยืนยันการลบ</Text>
              </View>
              <Text style={styles.modalMessage}>
                คุณต้องการลบสเปคนี้ใช่หรือไม่?
              </Text>
              <View style={styles.compatibilityBox}>
                <Ionicons name="alert-circle-outline" size={20} color="#FF9500" />
                <Text style={styles.compatibilityText}>
                  ความเข้ากันได้: <Text style={{fontWeight: 'bold'}}>{selectedSpec?.compatibility || 'N/A'}%</Text>
                </Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => setShowDeleteModal(false)}
                >
                  <Text style={styles.cancelButtonText}>ยกเลิก</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteConfirmButton} 
                  onPress={handleConfirmDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.deleteConfirmButtonText}>ลบ</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      );
    };

    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <StatusBar backgroundColor="#173B7A" barStyle="light-content" />
        <View style={styles.navbar}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>โปรไฟล์ของฉัน</Text>
          <View style={styles.rightPlaceholder} />
        </View>
        <FlatList
          data={specs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.profileSection}>
                <View style={styles.profileImageContainer}>
                  <Image 
                    source={require('../assets/user.png')} 
                    style={styles.profileImage}
                  />
                  <View style={styles.profileImageOuterBorder} />
                  <View style={styles.profileImageInnerBorder} />
                </View>
                <Text style={styles.profileName}>
                  {userInfo?.first_name || ''} {userInfo?.last_name || ''} ({username})
                </Text>
                <View style={styles.statsContainerNew}>
                  <View style={styles.statItemNew}>
                    <View style={styles.statIconNew}>
                      <Ionicons name="server-outline" size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.statNumberNew}>{specs.length}</Text>
                    <Text style={styles.statLabelNew}>สเปคที่เก็บไว้</Text>
                  </View>
                  <View style={styles.statDividerNew} />
                  <View style={styles.statItemNew}>
                    <View style={[styles.statIconNew, styles.visitorIconNew]}>
                      <Ionicons name="eye-outline" size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.statNumberNew}>0</Text>
                    <Text style={styles.statLabelNew}>ผู้เข้าชมสเปค</Text>
                  </View>
                  <View style={styles.statDividerNew} />
                  <View style={styles.statItemNew}>
                    <View style={[styles.statIconNew, styles.commentIconNew]}>
                      <Ionicons name="chatbox-outline" size={20} color="#FFFFFF" />
                    </View>
                    <Text style={styles.statNumberNew}>0</Text>
                    <Text style={styles.statLabelNew}>ความคิดเห็น</Text>
                  </View>
                </View>
              </View>
              <View style={styles.specListHeader}>
                <Ionicons name="list-outline" size={20} color="#173B7A" />
                <Text style={styles.specListTitle}>ประวัติสเปคที่บันทึกไว้</Text>
              </View>
            </>
          )}
        />
        <DeleteSuccessModal />
        <DeleteConfirmationModal />
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#173B7A',
      paddingVertical: 16,
      paddingHorizontal: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    backButton: {
      padding: 4,
    },
    navTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    rightPlaceholder: {
      width: 32,
    },
    profileSection: {
      paddingTop: 20,
      paddingBottom: 16,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
    },
    profileImageContainer: {
      position: 'relative',
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
    },
    profileImage: {
      width: 84,
      height: 84,
      borderRadius: 42,
      borderWidth: 3,
      borderColor: '#FFFFFF',
    },
    profileImageOuterBorder: {
      position: 'absolute',
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'rgba(23, 59, 122, 0.15)',
      top: 0,
      left: 0,
    },
    profileImageInnerBorder: {
      position: 'absolute',
      width: 92,
      height: 92,
      borderRadius: 46,
      borderWidth: 1,
      borderColor: '#173B7A',
      top: 4,
      left: 4,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#173B7A',
      marginBottom: 5,
    },
    statsContainerNew: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16,
      marginHorizontal: 16,
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: '#F5F5F5',
    },
    statItemNew: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statIconNew: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#1E4C9A',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
    },
    visitorIconNew: {
      backgroundColor: '#FF8800',
    },
    commentIconNew: {
      backgroundColor: '#4CAF50',
    },
    statNumberNew: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 4,
    },
    statLabelNew: {
      fontSize: 12,
      color: '#666666',
      textAlign: 'center',
    },
    statDividerNew: {
      width: 1,
      height: '70%',
      backgroundColor: '#EEEEEE',
      marginHorizontal: 8,
    },
    specListHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F7F9FC',
      paddingVertical: 12,
      paddingHorizontal: 20,
      marginVertical: 12,
      borderLeftWidth: 4,
      borderLeftColor: '#173B7A',
    },
    specListTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#173B7A',
      marginLeft: 10,
    },
    specItem: {
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: '#FFFFFF', 
      padding: 15, 
      marginBottom: 10, 
      marginHorizontal: 15,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
      borderWidth: 1,
      borderColor: '#F0F0F0',
    },
    placeholder: {
      width: 60, 
      height: 60, 
      borderRadius: 10, 
      backgroundColor: '#E0E0E0', 
      marginRight: 15,
    },
    specImage: {
      width: 60, 
      height: 60, 
      borderRadius: 10, 
      marginRight: 15,
    },
    specName: {
      fontWeight: 'bold', 
      fontSize: 16, 
      color: '#173B7A',
      marginBottom: 5,
    },
    specPrice: {
      fontSize: 14, 
      color: '#22a45d',
      marginBottom: 3,
    },
    scoreText: {
      fontSize: 13, 
      color: '#FFA500', 
      marginTop: 2,
      fontWeight: 'bold',
    },
    time: {
      fontSize: 12, 
      color: '#666',
    },
    deleteButton: {
      padding: 6,
    },
    successModalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successModalContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 24,
      paddingTop: 20,
      paddingBottom: 20,
      alignItems: 'center',
      width: '80%',
      maxWidth: 300,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 10,
    },
    iconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    checkmark: {
      color: '#FFFFFF',
      fontSize: 36,
      fontWeight: 'bold',
    },
    successTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#333333',
    },
    successMessage: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: '#666666',
    },
    okButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 8,
    },
    okButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      width: '85%',
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
      marginLeft: 10,
    },
    modalMessage: {
      fontSize: 16,
      color: '#555555',
      marginBottom: 16,
      lineHeight: 22,
    },
    compatibilityBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF8E1',
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      borderLeftWidth: 3,
      borderLeftColor: '#FFB800',
    },
    compatibilityText: {
      fontSize: 14,
      color: '#333333',
      marginLeft: 8,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
      marginRight: 10,
    },
    cancelButtonText: {
      fontSize: 15,
      color: '#555555',
      fontWeight: '600',
    },
    deleteConfirmButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      backgroundColor: '#FF4D4D',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 80,
    },
    deleteConfirmButtonText: {
      fontSize: 15,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
  });