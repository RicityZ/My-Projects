import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  TextInput, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function EditAdminSpec() {
  const navigation = useNavigation();
  const route = useRoute();
  const { specId } = route.params;

  const [selectedParts, setSelectedParts] = useState({});
  const [specName, setSpecName] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'เล่นเกม', value: 'gaming', icon: () => <Icon name="gamepad-variant" size={18} color="#173B7A" /> },
    { label: 'ทำงาน', value: 'work', icon: () => <Icon name="briefcase" size={18} color="#173B7A" /> },
    { label: 'กราฟฟิก', value: 'graphic', icon: () => <Icon name="palette" size={18} color="#173B7A" /> }
  ]);

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-spec-detail-admin.php', {
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
      const response = await fetch('http://10.0.2.2/speccompare-api/update-spec-admin.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: specId,
          user: 'admin',
          spec_name: specName,
          category,
          spec: selectedParts,
          price: calculateTotalPrice(),
          is_ai: 2
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={['#f0f2f5', '#e6eaf0']}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={['#173B7A', '#2563EB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.headerGradient}
            >
              <Icon name="shield-account" size={24} color="#FFF" style={{ marginRight: 10 }} />
              <Text style={styles.header}>แก้ไขคอมพิวเตอร์เซ็ต (แอดมิน)</Text>
            </LinearGradient>
          </View>

          <View style={styles.partsContainer}>
            {specParts.map((item) => {
              const selected = selectedParts[item.id];
              return (
                <View key={item.id} style={[styles.partRow, selected ? styles.selectedPartRow : {}]}>
                  {selected ? (
                    <>
                      <Image 
                        source={{ uri: selected.image_url }} 
                        style={styles.image} 
                      />
                      <View style={styles.partInfoContainer}>
                        <Text style={styles.name} numberOfLines={2}>{selected.name}</Text>
                        <Text style={styles.price}>฿ {parseFloat(selected.price).toLocaleString('th-TH')}</Text>
                      </View>
                      <TouchableOpacity 
                        onPress={() => handleCancel(item.id)} 
                        style={styles.removeBtn}>
                        <Icon name="delete" size={18} color="#FFF" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <View style={styles.imagePlaceholder}>
                        <Icon name={item.icon} size={24} color="#173B7A" />
                      </View>
                      <Text style={styles.partLabel}>{item.label}</Text>
                      <TouchableOpacity 
                        onPress={() => handleAdd(item.id)} 
                        style={styles.addBtn}>
                        <Icon name="plus" size={18} color="#FFF" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              );
            })}
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Icon name="pencil" size={20} color="#173B7A" style={styles.inputIcon} />
              <TextInput
                value={specName}
                onChangeText={setSpecName}
                placeholder="ตั้งชื่อสเปค..."
                style={styles.input}
                placeholderTextColor="#9CA3AF"
              />
            </View>

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
              placeholderStyle={styles.dropdownPlaceholder}
              labelStyle={styles.dropdownLabel}
              zIndex={1000}
              zIndexInverse={3000}
              listMode="SCROLLVIEW"
            />

            <View style={styles.priceContainer}>
              <LinearGradient
                colors={['#173B7A', '#173B7A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.priceGradient}
              >
                <Icon name="cash-multiple" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.total}>รวมราคา: ฿ {calculateTotalPrice().toLocaleString('th-TH')}</Text>
              </LinearGradient>
            </View>

            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleUpdate}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={['#173B7A', '#16a34a']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saveGradient}
              >
                <Icon name="content-save" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.saveText}>อัปเดตสเปค</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f9f9f9'
  },
  loadingText: {
    marginTop: 10,
    color: '#4B5563',
    fontSize: 16
  },
  headerContainer: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerGradient: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { 
    color: '#FFF',
    fontSize: 20, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  partsContainer: {
    marginBottom: 16,
  },
  partRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#fff', 
    marginBottom: 12,
    padding: 14, 
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPartRow: {
    borderLeftWidth: 4,
    borderLeftColor: '#173B7A',
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f3f4f6'
  },
  imagePlaceholder: {
    width: 60, 
    height: 60, 
    backgroundColor: '#E5E7EB',
    borderRadius: 8, 
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  partInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: { 
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4
  },
  partLabel: { 
    flex: 1, 
    fontSize: 15,
    color: '#4B5563',
    fontWeight: '500'
  },
  price: { 
    color: '#047857', 
    fontSize: 14,
    fontWeight: 'bold'
  },
  addBtn: {
    backgroundColor: '#173B7A', 
    paddingVertical: 8,
    paddingHorizontal: 14, 
    borderRadius: 8,
    elevation: 1
  },
  removeBtn: {
    backgroundColor: '#EF4444', 
    paddingVertical: 8,
    paddingHorizontal: 14, 
    borderRadius: 8,
    elevation: 1
  },
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  formContainer: {
    marginTop: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: '#1F2937'
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
    borderRadius: 12,
    elevation: 4,
  },
  dropdownPlaceholder: {
    color: '#9CA3AF',
    fontSize: 15
  },
  dropdownLabel: {
    color: '#1F2937',
    fontSize: 15
  },
  priceContainer: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  priceGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  total: { 
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF'
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  saveGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  saveText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  }
});