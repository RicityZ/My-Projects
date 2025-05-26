import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function RandomSpecDetail({ route, navigation }) {
  const specName = route.params?.spec_name;
  const [specData, setSpecData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🟨 กำลังโหลด spec_name:', specName);
    if (!specName) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://10.0.2.2/speccompare-api/get-my-specs.php?spec_name=${encodeURIComponent(specName)}`);

        const json = await response.json();
        console.log('✅ ได้ข้อมูลจาก PHP:', json);
        if (json.status === 'success' && json.data) {
          const raw = json.data.spec;
          const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;

          setSpecData({
            ...json.data,
            parsedSpec: parsed
          });
        } else {
          throw new Error('ไม่พบข้อมูลสเปค');
        }
      } catch (err) {
        Alert.alert('ข้อผิดพลาด', err.message || 'โหลดข้อมูลสเปคไม่สำเร็จ');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [specName]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar backgroundColor="#173B7A" barStyle="light-content" />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
      </SafeAreaView>
    );
  }

  if (!specData) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <StatusBar backgroundColor="#173B7A" barStyle="light-content" />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.errorText}>ไม่พบข้อมูลสเปค</Text>
      </SafeAreaView>
    );
  }

  const parts = specData.parsedSpec || {};
  const componentOrder = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#173B7A" barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายละเอียดสเปค</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.specNameContainer}>
          <Text style={styles.specName}>
            {specData.spec_name || 'ไม่มีชื่อสเปค'}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ราคา</Text>
            <Text style={styles.statValue}>
              ฿{Number(specData.price).toLocaleString()}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ความเข้ากันได้</Text>
            <Text style={styles.compatValue}>
              {specData.compatibility || 0}%
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>รายละเอียดอุปกรณ์</Text>
          {componentOrder.map((key) => {
            const value =
              parts[key] ||
              parts[key.toUpperCase()] ||
              parts[key.charAt(0).toUpperCase() + key.slice(1)];

            if (!value) return null;

            return (
              <View key={key} style={styles.componentRow}>
                <Text style={styles.componentKey}>{key.toUpperCase()}</Text>
                <Text style={styles.componentValue}>
                  {typeof value === 'object'
                    ? (value.name || value.Name || JSON.stringify(value))
                    : value}
                </Text>
              </View>
            );
          })}
        </View>

        {specData.recommendation && (
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationTitle}>คำแนะนำจาก AI</Text>
            <Text style={styles.recommendationText}>
              {specData.recommendation}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#173B7A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#173B7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#173B7A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 10,
  },
  specNameContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  specName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#173B7A',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22a45d',
  },
  compatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B7A',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  componentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  componentKey: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    flex: 1,
  },
  componentValue: {
    color: '#666',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  recommendationContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  recommendationText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
});