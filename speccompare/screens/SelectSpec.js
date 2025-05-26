import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  FlatList, SafeAreaView, Alert, TextInput, Modal,
  Animated, Easing
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomHeader from '../components/CustomHeader';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ฟังก์ชันสำหรับสุ่ม URL รูปภาพตามหมวดหมู่
const getRandomImageURL = (category) => {
  const imageSets = {
    gaming: [
      'https://notebookspec.com/web/wp-content/uploads/2021/01/Omen_Tracer_M_Clearpanel_Aircooledsystem_Intel_noSPDIF_REDled_2080HPModified_Backlit_Woodstock_Daisy_Vortex_Hero_Environment_Gameplay.jpg',
      'https://notebookspec.com/web/wp-content/uploads/2021/01/william2006523-1-780x585.jpg',
      'https://cdn.shopify.com/s/files/1/0724/4247/8904/files/blog1_a74979b0-19d5-4cc2-a422-ea4c6f9e2e57_480x480.png?v=1712740574'
    ],
    work: [
      'https://fortunetown.co.th/wp-content/uploads/2022/01/photo-1614624532983-4ce03382d63d.jpeg',
      'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/09/Items-that-should-be-on-your-Workstation(8).png',
      'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2021/09/Items-that-should-be-on-your-Workstation(5).png'
    ],
    graphic: [
      'https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2022/08/Blog/%E0%B8%88%E0%B8%AD%2032%20%E0%B8%99%E0%B8%B4%E0%B9%89%E0%B8%A7/decor%201.jpg',
      'https://notebookspec.com/web/wp-content/uploads/2021/01/%E0%B8%AA%E0%B9%80%E0%B8%9B%E0%B8%84%E0%B8%84%E0%B8%AD%E0%B8%A1%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%9F%E0%B8%9F%E0%B8%B4%E0%B8%84-2021-%E0%B8%A2%E0%B9%88%E0%B8%AD-scaled.jpg',
      'https://notebookspec.com/web/wp-content/uploads/2021/01/tophero-PA32UCX-PK-e1610785282634.jpg'
    ]
  };

  const selectedSet = imageSets[category] || [];
  return selectedSet[Math.floor(Math.random() * selectedSet.length)];
};

const specParts = [
  { id: 'cpu', label: 'เลือก CPU' },
  { id: 'mainboard', label: 'เลือก Mainboard' },
  { id: 'gpu', label: 'เลือก GPU' },
  { id: 'ram', label: 'เลือก Memory' },
  { id: 'ssd', label: 'เลือก Solid State Drive' },
  { id: 'hdd', label: 'เลือก Hard Disk' },
  { id: 'psu', label: 'เลือก Power Supply' },
  { id: 'case', label: 'เลือก Case' },
  { id: 'cooler', label: 'เลือก CPU Cooler' },
];

export default function SelectSpec() {
  const { firstName } = useUser();
  const navigation = useNavigation();
  const [selectedParts, setSelectedParts] = useState({});
  const [compatibilityResult, setCompatibilityResult] = useState('');
  const [compatibilityScore, setCompatibilityScore] = useState('');
  const [specName, setSpecName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  
  // เพิ่ม state สำหรับกล่องแจ้งเตือนสำเร็จ
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const checkmarkStrokeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State สำหรับ DropDownPicker
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '-- กรุณาเลือกหมวดหมู่ --', value: '' },
    { label: 'ทำงาน', value: 'work' },
    { label: 'เล่นเกม', value: 'gaming' },
    { label: 'กราฟฟิก', value: 'graphic' }
  ]);

  // Run animations when success modal shows
  useEffect(() => {
    if (showSuccessModal) {
      // Reset animations
      scaleAnim.setValue(0);
      checkmarkStrokeAnim.setValue(0);
      fadeAnim.setValue(0);
      
      // Start animations sequence
      Animated.sequence([
        // Pop in circle
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.7)),
          useNativeDriver: true,
        }),
        // Draw checkmark and fade in text
        Animated.parallel([
          Animated.timing(checkmarkStrokeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        ])
      ]).start();
    }
  }, [showSuccessModal]);

  const handleAdd = (partId) => {
    const screenMap = {
      cpu: 'SelectCPU', mainboard: 'SelectMainboard', gpu: 'SelectGPU',
      ram: 'SelectMemory', ssd: 'SelectSSD', hdd: 'SelectHDD',
      psu: 'SelectPSU', case: 'SelectCase', cooler: 'SelectCooler',
    };
    const screen = screenMap[partId];
    if (screen) {
      navigation.navigate(screen, {
        onSelect: (item) => {
          setSelectedParts((prev) => ({ ...prev, [partId]: item }));
        },
      });
    }
  };

  const handleCancel = (partId) => {
    setSelectedParts((prev) => {
      const updated = { ...prev };
      delete updated[partId];
      return updated;
    });
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedParts).reduce((total, part) => {
      const price = parseFloat(part.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  const checkCompatibility = async () => {
    if (Object.keys(selectedParts).length < 2) {
      Alert.alert('กรุณาเลือกอุปกรณ์อย่างน้อย 2 ชิ้น', 'ต้องมีอุปกรณ์มากกว่า 1 ชิ้นเพื่อตรวจสอบความเข้ากันได้');
      return;
    }

    setLoading(true);

    const specList = Object.values(selectedParts)
      .map((part) => part?.name)
      .filter(Boolean)
      .join(', ');

    const prompt = `ตรวจสอบความเข้ากันได้ของอุปกรณ์ดังต่อไปนี้ และให้คะแนนความเข้ากันเป็นเปอร์เซ็นต์ พร้อมคำแนะนำเพิ่มเติม: ${specList}`;

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const result = await response.json();
      const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setCompatibilityResult(reply);
      const match = reply.match(/\d{1,3}%/);
      setCompatibilityScore(match ? match[0].replace('%', '') : '');
    } catch (error) {
      console.error(error);
      setCompatibilityResult('เกิดข้อผิดพลาด ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์');
      setCompatibilityScore('');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSpec = async () => {
    if (!specName) {
      Alert.alert('กรุณาตั้งชื่อสเปคก่อนบันทึก');
      return;
    }

    if (!category) {
      Alert.alert('กรุณาเลือกหมวดหมู่ของสเปค');
      return;
    }

    const image_url = getRandomImageURL(category); // สุ่ม URL รูปภาพตามหมวดหมู่

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/save-spec.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: firstName,
          spec_name: specName,
          spec: selectedParts,
          compatibility: compatibilityScore,
          price: calculateTotalPrice(),
          recommendation: compatibilityResult,
          category: category,
          image_url: image_url, // เพิ่ม image_url ในข้อมูลที่ส่งไป
        }),
      });

      const json = await response.json();
      if (json.status === 'success') {
        setShowSuccessModal(true);
        setSpecName('');
      } else {
        Alert.alert('❌ ไม่สำเร็จ', 'เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('❌ เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    } finally {
      setLoading(false);
    }
  };

  // คำนวณสีของคะแนนความเข้ากันได้
  const getScoreColor = () => {
    const score = parseInt(compatibilityScore);
    if (score >= 90) return '#4CAF50'; // เขียว
    if (score >= 70) return '#FFC107'; // เหลือง
    if (score >= 50) return '#FF9800'; // ส้ม
    return '#F44336'; // แดง
  };

  // กล่องแจ้งเตือนสำเร็จแบบกำหนดเอง
  const SuccessModal = () => {
    // Animation styles
    const iconScale = scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    });
    
    const checkmarkOpacity = checkmarkStrokeAnim;
    
    const textTranslateY = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0]
    });
    
    return (
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContainer}>
            <View style={styles.successIconOuterContainer}>
              <Animated.View 
                style={[
                  styles.successIconContainer, 
                  { transform: [{ scale: iconScale }] }
                ]}
              >
                <View style={styles.successIconCircle}>
                  <Animated.View style={{ opacity: checkmarkOpacity }}>
                    <Ionicons name="checkmark" size={32} color="#FFFFFF" />
                  </Animated.View>
                </View>
              </Animated.View>
            </View>
            
            <Animated.View style={{ 
              opacity: fadeAnim, 
              transform: [{ translateY: textTranslateY }]
            }}>
              <Text style={styles.successTitle}>บันทึกสำเร็จ</Text>
              <Text style={styles.successMessage}>
                สเปคของคุณถูกบันทึกเรียบร้อยแล้ว
              </Text>
            </Animated.View>
            
            <Animated.View style={{ opacity: fadeAnim }}>
              <TouchableOpacity 
                style={styles.okButton}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={styles.okButtonText}>OK</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  };

  // แสดงรายการอุปกรณ์
  const renderPartItem = ({ item }) => {
    const selected = selectedParts[item.id];
    return (
      <View style={styles.row}>
        {selected ? (
          <>
            <Image
              source={{ uri: selected.image_url }}
              style={styles.partImage}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedName} numberOfLines={2}>{selected.name}</Text>
              <Text style={styles.price}>ราคา: ฿ {parseInt(selected.price).toLocaleString()}</Text>
            </View>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item.id)}>
              <Text style={styles.cancelText}>ลบ</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.placeholder} />
            <Text style={styles.label}>{item.label}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item.id)}>
              <Text style={styles.addText}>เพิ่ม</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader name={firstName} />

      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>จัดสเปคคอมพิวเตอร์</Text>
        <Text style={styles.headerSubtitle}>เลือกอุปกรณ์ที่ต้องการเพื่อประกอบสเปคของคุณ</Text>
      </View>

      <FlatList
        data={specParts}
        keyExtractor={item => item.id}
        renderItem={renderPartItem}
        ListFooterComponent={
          <>
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>ราคารวม</Text>
              <Text style={styles.totalText}>฿ {calculateTotalPrice().toLocaleString()}</Text>
              <TouchableOpacity
                style={[styles.compatButton, loading && styles.disabledButton]}
                onPress={checkCompatibility}
                disabled={loading}
              >
                <Text style={styles.compatText}>
                  {loading ? 'กำลังประมวลผล...' : 'ตรวจสอบความเข้ากันได้'}
                </Text>
              </TouchableOpacity>
            </View>

            {compatibilityScore !== '' && (
              <View style={styles.resultsContainer}>
                <View style={[styles.scoreBox, { backgroundColor: getScoreColor() }]}>
                  <Text style={styles.scoreLabel}>ความเข้ากันได้</Text>
                  <Text style={styles.scoreValue}>{compatibilityScore}%</Text>
                </View>

                <View style={styles.resultBox}>
                  <Text style={styles.resultTitle}>ผลการตรวจสอบ</Text>
                  <Text style={styles.resultText}>{compatibilityResult}</Text>
                </View>

                <View style={styles.saveSection}>
                  <TextInput
                    placeholder="ตั้งชื่อสเปคของคุณ..."
                    value={specName}
                    onChangeText={setSpecName}
                    style={styles.input}
                    placeholderTextColor="#999"
                  />

                  <View style={styles.categoryPickerContainer}>
                    <DropDownPicker
                      open={open}
                      value={category}
                      items={items}
                      setOpen={setOpen}
                      setValue={setCategory}
                      setItems={setItems}
                      placeholder="เลือกหมวดหมู่"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                      textStyle={styles.dropdownText}
                      zIndex={1000}
                      zIndexInverse={3000}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveSpec}
                    disabled={loading || !specName || !category}
                  >
                    <Text style={styles.saveText}>
                      {loading ? 'กำลังบันทึก...' : '💾 บันทึกสเปค'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* ช่องว่างด้านล่างเพื่อให้เลื่อนได้สุด */}
            <View style={{ height: open ? 200 : 80 }} />
          </>
        }
      />
      
      {/* แสดงกล่องแจ้งเตือนสำเร็จ */}
      <SuccessModal />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  headerBox: {
    backgroundColor: '#173B7A',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 8,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholder: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 12,
  },
  partImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: '#444'
  },
  selectedName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#22a45d',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#173B7A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#ff4d4f',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalBox: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22a45d',
    marginBottom: 16,
  },
  compatButton: {
    backgroundColor: '#173B7A',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  compatText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  resultsContainer: {
    margin: 12,
  },
  scoreBox: {
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#173B7A',
  },
  resultText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  input: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    marginTop: 16,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#22a45d',
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  categoryPickerContainer: {
    marginBottom: 16,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    height: 48,
  },
  dropdownContainer: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#22a45d',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // สไตล์สำหรับกล่องแจ้งเตือนสำเร็จ
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    paddingTop: 60, // เพิ่มระยะห่างด้านบนเพื่อให้ไอคอนยื่นออกมา
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  successIconOuterContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  okButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});