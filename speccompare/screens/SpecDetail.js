import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useUser } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SpecDetail({ route, navigation }) {
  const { firstName } = useUser();
  const [specData, setSpecData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const passedSpec = route.params?.spec;
    const isAI = route.params?.isAI === true;

    if (isAI && passedSpec) {
      setSpecData({
        ...passedSpec,
        parsedSpec: typeof passedSpec.parts === 'string'
          ? JSON.parse(passedSpec.parts)
          : passedSpec.parts || {},
        recommendation: passedSpec.recommendation || ''
      });
      setLoading(false);
      return;
    }

    const fetchSpecDetails = async () => {
      const specId = route.params?.spec_id;
    
      try {
        let url;
    
        if (specId) {
          url = `http://10.0.2.2/speccompare-api/get-spec-detail.php?spec_id=${specId}`;
        } else {
          url = `http://10.0.2.2/speccompare-api/get-my-specs.php?user=${firstName}`;
        }
    
        const response = await fetch(url);
        const result = await response.json();
    
        if (result.status === 'success') {
          const data = specId ? result.data : result.data.find(spec => spec.spec_name === route.params?.specName);
    
          if (data) {
            const parsed = typeof data.spec === 'string' ? JSON.parse(data.spec) : data.spec;
            setSpecData({
              ...data,
              parsedSpec: parsed,
            });
          } else {
            throw new Error('ไม่พบข้อมูลสเปค');
          }
        } else {
          throw new Error(result.message || 'เกิดข้อผิดพลาด');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการโหลดสเปค:', error);
        Alert.alert('ผิดพลาด', error.message || 'ไม่สามารถโหลดข้อมูลสเปคได้', [
          { text: 'ตกลง', onPress: () => navigation.goBack() }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecDetails();
  }, [firstName, route.params]);

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
              ฿{Number(specData.price || 0).toLocaleString()}
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
              specData.parsedSpec?.[key] ||
              specData.parsedSpec?.[key.toUpperCase()] ||
              specData.parsedSpec?.[key.charAt(0).toUpperCase() + key.slice(1)];

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