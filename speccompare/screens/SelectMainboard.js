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

export default function SelectMainboard({ route, navigation }) {
  const { firstName } = useUser();
  const { onSelect } = route.params || {};
  const [parts, setParts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-parts.php?part=mainboard')
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
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const getBrandFromName = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('asus')) return 'ASUS';
    if (lower.includes('asrock')) return 'ASRock';
    if (lower.includes('msi')) return 'MSI';
    if (lower.includes('gigabyte')) return 'GIGABYTE';
    return 'Other';
  };

  const filteredParts = parts.filter((part) => {
    const brand = getBrandFromName(part.name);
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(brand);
    const nameMatch = part.name.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && nameMatch;
  });

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

  const brands = ['ASUS', 'ASRock', 'MSI', 'GIGABYTE'];

  return (
    <View style={styles.container}>
      <CustomHeader name={firstName} />
      <Text style={styles.title}>เลือก Mainboard</Text>

      <View style={styles.filterRow}>
        {brands.map((brand) => (
          <TouchableOpacity
            key={brand}
            onPress={() => toggleBrand(brand)}
            style={[
              styles.filterButton,
              selectedBrands.includes(brand) && styles.selectedFilter,
            ]}
          >
            <Text style={styles.filterText}>{brand}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="ค้นหา Mainboard..."
        style={styles.searchInput}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredParts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  filterButton: {
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 4,
  },
  selectedFilter: {
    backgroundColor: '#ddd',
  },
  filterText: {
    fontWeight: 'bold',
  },
  searchInput: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
  },
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 10,
  },
  partName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  partPrice: {
    color: 'green',
    fontSize: 13,
    marginTop: 4,
  },
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
  addIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  addText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f33',
    margin: 20,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});