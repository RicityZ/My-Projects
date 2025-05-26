import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  TextInput, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const specParts = [
  { id: 'cpu', label: 'เลือก CPU', icon: 'cpu-64-bit' },
  { id: 'mainboard', label: 'เลือก Mainboard', icon: 'motherboard' },
  { id: 'gpu', label: 'เลือก GPU', icon: 'expansion-card' },
  { id: 'ram', label: 'เลือก Memory', icon: 'memory' },
  { id: 'ssd', label: 'เลือก SSD', icon: 'harddisk' },
  { id: 'hdd', label: 'เลือก HDD', icon: 'disc' },
  { id: 'psu', label: 'เลือก PSU', icon: 'power-socket' },
  { id: 'case', label: 'เลือก Case', icon: 'desktop-tower' },
  { id: 'cooler', label: 'เลือก Cooler', icon: 'fan' }
];

export default function EditSavedSpec() {
  const navigation = useNavigation();
  const route = useRoute();
  const { specId } = route.params;

  const [selectedParts, setSelectedParts] = useState({});
  const [specName, setSpecName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'เล่นเกม', value: 'gaming' },
    { label: 'ทำงาน', value: 'work' },
    { label: 'กราฟฟิก', value: 'graphic' }
  ]);

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-spec-detailUser.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: specId })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setSelectedParts(data.data.spec);
          setSpecName(data.data.spec_name);
          setCategory(data.data.category);
        } else {
          Alert.alert('ไม่พบข้อมูล', 'ไม่สามารถโหลดข้อมูลได้');
        }
      })
      .catch(err => {
        console.error(err);
        Alert.alert('เกิดข้อผิดพลาด', 'โหลดข้อมูลไม่สำเร็จ');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (partId) => {
    const screenMap = {
      cpu: 'SelectCPU', mainboard: 'SelectMainboard', gpu: 'SelectGPU',
      ram: 'SelectMemory', ssd: 'SelectSSD', hdd: 'SelectHDD',
      psu: 'SelectPSU', case: 'SelectCase', cooler: 'SelectCooler'
    };
    const screen = screenMap[partId];
    if (screen) {
      navigation.navigate(screen, {
        onSelect: (item) => {
          setSelectedParts((prev) => ({ ...prev, [partId]: item }));
        }
      });
    }
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

  const handleUpdate = async () => {
    if (!specName || !category) {
      Alert.alert('กรุณากรอกชื่อและเลือกหมวดหมู่');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2/speccompare-api/update-spec.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: specId,
          spec_name: specName,
          category,
          spec: selectedParts,
          price: calculateTotalPrice()
        })
      });

      const json = await response.json();
      if (json.status === 'success') {
        Alert.alert('✅ อัปเดตสำเร็จ', 'ข้อมูลถูกบันทึกแล้ว', [
          { text: 'กลับ', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('❌ ไม่สำเร็จ', json.message || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถอัปเดตได้');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#173B7A" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>แก้ไขสเปคที่บันทึกไว้</Text>

      {specParts.map((item) => {
        const selected = selectedParts[item.id];
        return (
          <View key={item.id} style={styles.partRow}>
            {selected ? (
              <>
                <Image source={{ uri: selected.image_url }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{selected.name}</Text>
                  <Text style={styles.price}>฿ {parseFloat(selected.price).toLocaleString('th-TH')}</Text>
                </View>
                <TouchableOpacity onPress={() => handleCancel(item.id)} style={styles.removeBtn}>
                  <Text style={styles.btnText}>ลบ</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.imagePlaceholder}>
                  <Icon name={item.icon} size={24} color="#555" />
                </View>
                <Text style={{ flex: 1 }}>{item.label}</Text>
                <TouchableOpacity onPress={() => handleAdd(item.id)} style={styles.addBtn}>
                  <Text style={styles.btnText}>เพิ่ม</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      })}

      <TextInput
        placeholder="ตั้งชื่อสเปค..."
        value={specName}
        onChangeText={setSpecName}
        style={styles.input}
      />

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
      />

      <Text style={styles.total}>รวมราคา: ฿ {calculateTotalPrice().toLocaleString('th-TH')}</Text>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.saveText}>💾 บันทึก</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f8f9fa' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  partRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 12,
    borderRadius: 8
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  imagePlaceholder: {
    width: 60, height: 60, borderRadius: 8,
    backgroundColor: '#e0e0e0', marginRight: 10,
    justifyContent: 'center', alignItems: 'center'
  },
  name: { fontWeight: 'bold', fontSize: 14 },
  price: { color: '#22a45d', fontSize: 13 },
  addBtn: {
    backgroundColor: '#173B7A', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6
  },
  removeBtn: {
    backgroundColor: '#c0392b', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, marginTop: 16, backgroundColor: '#fff'
  },
  dropdown: {
    marginTop: 16,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  dropdownContainer: {
    borderColor: '#ccc'
  },
  total: {
    textAlign: 'right',
    marginTop: 16,
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 10,
    color: '#333'
  }
});
