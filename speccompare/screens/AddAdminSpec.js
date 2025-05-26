import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  FlatList, TextInput, SafeAreaView, Alert
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';

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

export default function AddAdminSpec() {
  const navigation = useNavigation();
  const [selectedParts, setSelectedParts] = useState({});
  const [specName, setSpecName] = useState('');
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: '-- กรุณาเลือกหมวดหมู่ --', value: '' },
    { label: 'ทำงาน', value: 'work' },
    { label: 'เล่นเกม', value: 'gaming' },
    { label: 'กราฟฟิก', value: 'graphic' }
  ]);

  const handleAdd = (partId) => {
    const screenMap = {
      cpu: 'SelectCPU', mainboard: 'SelectMainboard', gpu: 'SelectGPU',
      ram: 'SelectMemory', ssd: 'SelectSSD', hdd: 'SelectHDD',
      psu: 'SelectPSU', case: 'SelectCase', cooler: 'SelectCooler',
    };
    navigation.navigate(screenMap[partId], {
      onSelect: (item) => {
        setSelectedParts((prev) => ({ ...prev, [partId]: item }));
      },
    });
  };

  const handleCancel = (partId) => {
    const updated = { ...selectedParts };
    delete updated[partId];
    setSelectedParts(updated);
  };

  const calculateTotalPrice = () => {
    return Object.values(selectedParts).reduce((total, part) => {
      const price = parseFloat(part.price);
      return total + (isNaN(price) ? 0 : price);
    }, 0);
  };

  const handleSave = async () => {
    if (!specName || !category) {
      Alert.alert('กรุณากรอกชื่อสเปคและเลือกหมวดหมู่');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/save-specAdmin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'admin',
          spec_name: specName,
          spec: selectedParts,
          category: category,
          price: calculateTotalPrice(),
          is_ai: 2,
          image_url: '',
          compatibility: '',
          recommendation: ''
        }),
      });

      const json = await response.json();
      if (json.status === 'success') {
        Alert.alert('✅ สำเร็จ', 'เพิ่มคอมเซ็ตแอดมินเรียบร้อยแล้ว');
        navigation.goBack();
      } else {
        Alert.alert('❌ ไม่สำเร็จ', 'เกิดข้อผิดพลาดในการบันทึก');
      }
    } catch (err) {
      Alert.alert('❌ เกิดข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์');
    }
  };

  const renderPartItem = ({ item }) => {
    const selected = selectedParts[item.id];
    return (
      <View style={styles.row}>
        {selected ? (
          <>
            <Image source={{ uri: selected.image_url }} style={styles.partImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.selectedName}>{selected.name}</Text>
              <Text style={styles.price}>฿ {parseInt(selected.price).toLocaleString()}</Text>
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
      <CustomHeader name="Admin" />

      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>เพิ่มสเปคคอมพิวเตอร์ (Admin)</Text>
        <Text style={styles.headerSubtitle}>เลือกอุปกรณ์และตั้งชื่อสเปคเพื่อเพิ่มข้อมูล</Text>
      </View>

      <FlatList
        data={specParts}
        keyExtractor={item => item.id}
        renderItem={renderPartItem}
        ListFooterComponent={
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

            <Text style={styles.totalText}>
              ราคารวม: ฿ {calculateTotalPrice().toLocaleString()}
            </Text>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              disabled={!specName || !category}
            >
              <Text style={styles.saveText}>💾 บันทึก</Text>
            </TouchableOpacity>
            <View style={{ height: open ? 200 : 80 }} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  headerBox: {
    backgroundColor: '#173B7A',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 16,
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
  },
  placeholder: {
    width: 50, height: 50, backgroundColor: '#eee', borderRadius: 8, marginRight: 12,
  },
  partImage: {
    width: 50, height: 50, borderRadius: 8, marginRight: 12,
  },
  label: { flex: 1, fontSize: 15, color: '#444' },
  selectedName: {
    fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 4,
  },
  price: {
    fontSize: 14, color: '#22a45d', fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#173B7A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8,
  },
  addText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cancelButton: {
    backgroundColor: '#ff4d4f', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8,
  },
  cancelText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  saveSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 12,
    marginTop: 16,
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
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginTop: 8,
  },
});
