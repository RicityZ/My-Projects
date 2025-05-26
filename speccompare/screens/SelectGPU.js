import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useUser } from '../context/UserContext';

export default function SelectGPU({ route, navigation }) {
  const { firstName } = useUser();
  const { onSelect } = route.params || {};
  const [parts, setParts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-parts.php?part=gpu')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') {
          setParts(json.data);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const getBrandFromName = (name) => {
    if (name.toLowerCase().includes('nvidia')) return 'NVIDIA';
    if (name.toLowerCase().includes('amd')) return 'AMD';
    return 'Other';
  };

  const filteredParts = parts.filter((part) => {
    const brand = getBrandFromName(part.name);
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(brand);
    const nameMatch = part.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const grouped = filteredParts.reduce((acc, part) => {
    const brand = getBrandFromName(part.name);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(part);
    return acc;
  }, {});

  const CustomCheckbox = ({ label, checked, onToggle }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onToggle}>
      <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]} />
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.partImage} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.partName}>{item.name}</Text>
        <Text style={styles.partPrice}>ราคา: ฿ {item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (onSelect) {
            onSelect(item);
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.addIcon}>➕</Text>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader name={firstName} />
      <Text style={styles.title}>เลือก GPU</Text>

      {/* Filter */}
      <View style={styles.filterRow}>
        <CustomCheckbox
          label="NVIDIA"
          checked={selectedBrands.includes('NVIDIA')}
          onToggle={() => toggleBrand('NVIDIA')}
        />
        <CustomCheckbox
          label="AMD"
          checked={selectedBrands.includes('AMD')}
          onToggle={() => toggleBrand('AMD')}
        />
      </View>

      {/* Search */}
      <TextInput
        placeholder="ค้นหา GPU..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Grouped List */}
      <FlatList
        data={Object.keys(grouped)}
        keyExtractor={(brand) => brand}
        renderItem={({ item: brand }) => (
          <View>
            <View style={styles.brandHeader}>
              <Text style={styles.brandText}>{brand.toUpperCase()}</Text>
            </View>
            {grouped[brand].map((gpu) => (
              <View key={gpu.id}>{renderItem({ item: gpu })}</View>
            ))}
          </View>
        )}
      />

      {/* Cancel */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>❌ Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 16 },
  title: { fontSize: 16, fontWeight: 'bold', paddingHorizontal: 16, marginTop: 10 },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f3f3f3',
    marginHorizontal: 8,
    marginBottom: 10,
    borderRadius: 8,
  },
  partImage: {
    width: 60, height: 60, resizeMode: 'contain', marginRight: 10,
  },
  partName: { fontWeight: 'bold', fontSize: 14 },
  partPrice: { color: 'green', fontSize: 13, marginTop: 4 },

  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  addIcon: { fontSize: 14, marginRight: 4 },
  addText: { fontSize: 13, fontWeight: 'bold' },

  cancelButton: {
    backgroundColor: '#f33',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 8,
  },
  checkboxBoxChecked: {
    backgroundColor: '#333',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  brandText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
