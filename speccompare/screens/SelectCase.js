import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
  TextInput, Image, ScrollView
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { useUser } from '../context/UserContext';

export default function SelectCase({ route, navigation }) {
  const { firstName } = useUser();
  const { onSelect } = route.params || {};
  const [parts, setParts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-parts.php?part=case')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') setParts(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const getBrandFromName = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('nzxt')) return 'NZXT';
    if (lower.includes('cooler master')) return 'Cooler Master';
    if (lower.includes('lian li')) return 'Lian Li';
    if (lower.includes('thermaltake')) return 'Thermaltake';
    return 'Other';
  };

  const brands = ['NZXT', 'Cooler Master', 'Lian Li', 'Thermaltake', 'Other'];

  const filtered = parts.filter((item) => {
    const brand = getBrandFromName(item.name);
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(brand);
    const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

  const grouped = brands.reduce((acc, brand) => {
    acc[brand] = filtered.filter((item) => getBrandFromName(item.name) === brand);
    return acc;
  }, {});

  const renderItem = (item) => (
    <View key={item.id} style={styles.itemContainer}>
      {item.image_url && (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>ราคา: ฿ {item.price}</Text>
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
        <Text style={styles.addText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomHeader name={firstName} />
      <Text style={styles.title}>เลือก Case</Text>

      <View style={styles.filterRow}>
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand}
            onPress={() => toggleBrand(brand)}
            style={[styles.filterButton, selectedBrands.includes(brand) && styles.selectedFilter]}
          >
            <Text style={styles.filterText}>{brand}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="ค้นหา Case..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView>
        {brands.map((brand) => (
          grouped[brand].length > 0 && (
            <View key={brand}>
              <Text style={styles.brandHeader}>{brand}</Text>
              {grouped[brand].map(renderItem)}
            </View>
          )
        ))}
      </ScrollView>

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
  brandHeader: { fontWeight: 'bold', fontSize: 16, marginTop: 16, marginBottom: 8, marginLeft: 16 },
  searchInput: {
    margin: 16, padding: 8, borderColor: '#ccc', borderWidth: 1, borderRadius: 6
  },
  filterRow: {
    flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10, marginBottom: 8
  },
  filterButton: {
    borderColor: '#999', borderWidth: 1, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 4, margin: 4
  },
  selectedFilter: {
    backgroundColor: '#ddd',
  },
  filterText: { fontWeight: 'bold' },
  itemContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#f3f3f3', marginHorizontal: 8, marginBottom: 10, padding: 10, borderRadius: 8
  },
  image: { width: 60, height: 60, marginRight: 10 },
  name: { fontWeight: 'bold', fontSize: 14 },
  price: { color: 'green', fontSize: 13, marginTop: 4 },
  addButton: {
    borderWidth: 1, borderColor: '#000', borderRadius: 6,
    paddingVertical: 4, paddingHorizontal: 10
  },
  addText: { fontSize: 13, fontWeight: 'bold' },
  cancelButton: {
    backgroundColor: '#f33', margin: 20, padding: 12,
    borderRadius: 8, alignItems: 'center'
  },
  cancelText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
