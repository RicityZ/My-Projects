import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert, SafeAreaView, ActivityIndicator,
  ToastAndroid, Platform, Animated, Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';

export default function RandomScreen() {
  const navigation = useNavigation();
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCPU, setSelectedCPU] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(false);
  const [randomResult, setRandomResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [showAIResult, setShowAIResult] = useState(false);
  const { username } = useUser();
  const [comparisonResult, setComparisonResult] = useState('');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const shakeAnim = useState(new Animated.Value(0))[0];
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareData, setCompareData] = useState(null);
  const [aiComparisonResult, setAiComparisonResult] = useState(null);
  const [comparisonResults, setComparisonResults] = useState({});
  const [isComparing, setIsComparing] = useState(false);
  const [showCompareTable, setShowCompareTable] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    let lastShakeTime = 0;

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      const timeSinceLastShake = now - lastShakeTime;

      if (acceleration > 1.7 && timeSinceLastShake > 1200) {
        lastShakeTime = now;
        shakeAnimation();
        handleRandom();
        if (Platform.OS === 'android') {
          ToastAndroid.show('🎲 เขย่าเพื่อสุ่ม!', ToastAndroid.SHORT);
        }
      }
    });

    Accelerometer.setUpdateInterval(200);

    return () => subscription && subscription.remove();
  }, [selectedPrice, selectedCPU, selectedType, loading]);

  const shakeAnimation = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 80, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
    ]).start();
  };

  const handlePriceSelect = (range) => {
    setSelectedPrice(range === selectedPrice ? '' : range);
  };

  const handleLike = async (specId, isAI = false) => {
    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/toggle-like.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `spec_id=${specId}&username=${username}`
      });
      
      const json = await res.json();
    
      if (json.status === 'success') {
        if (isAI) {
          setAiResult(prev => ({
            ...prev,
            likes: json.likes,
            likedBy: json.likedBy
          }));
        } else {
          setRandomResult(prev => ({
            ...prev,
            likes: json.likes,
            likedBy: json.likedBy
          }));
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกการถูกใจได้');
    }
  };
  
  const handleCPUSelect = (cpu) => {
    setSelectedCPU(cpu === selectedCPU ? '' : cpu);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type === selectedType ? '' : type);
  };

  const handleRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/random-spec.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: selectedPrice,
          cpu: selectedCPU,
          type: selectedType
        }),
      });
  
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        console.error('JSON Error:', err);
        Alert.alert('ผิดพลาด', 'ข้อมูลที่ได้รับไม่ถูกต้อง');
        return;
      }
  
      if (json.status === 'success') {
        setRandomResult({
          ...json.result,
          likes: json.result.likes || 0,
          likedBy: json.result.likedBy || [],
        });
        setShowResult(true);
      } else {
        Alert.alert('ไม่พบข้อมูล', json.message || '');
      }
    } catch (err) {
      Alert.alert('เชื่อมต่อผิดพลาด', 'กรุณาลองใหม่ภายหลัง');
    } finally {
      setLoading(false);
    }
  };

  const handleAIRandom = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/ai-random.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: selectedPrice,
          cpu: selectedCPU,
          type: selectedType,
          category: selectedType,
        }),
      });
  
      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch (err) {
        Alert.alert('ผิดพลาด', 'ข้อมูล AI ไม่ถูกต้อง');
        return;
      }
  
      if (json.status === 'success') {
        const fallbackImages = {
          gaming: [
            'https://cdn.pixabay.com/photo/2020/10/19/pc-gaming-5671776_1280.jpg',
            'https://cdn.pixabay.com/photo/2022/09/07/15/00/gaming-7437523_1280.jpg'
          ],
          work: [
            'https://cdn.pixabay.com/photo/2020/06/23/workspace-5330890_1280.jpg',
            'https://cdn.pixabay.com/photo/2021/02/01/13/58/laptop-5968648_1280.jpg'
          ],
          graphic: [
            'https://cdn.pixabay.com/photo/2018/02/01/15/06/workspace-3129480_1280.jpg',
            'https://cdn.pixabay.com/photo/2018/03/01/14/07/ux-3182384_1280.jpg'
          ]
        };
      
        const selectedImages = fallbackImages[selectedType] || fallbackImages.gaming;
        const image_url = selectedImages[Math.floor(Math.random() * selectedImages.length)];
      
        const saveResponse = await fetch('http://10.0.2.2/speccompare-api/save-ai-spec.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: username,
            spec_name: json.result.spec_name || 'AI Custom Build',
            spec: json.result.parts,
            compatibility: json.result.compatibility || 100,
            price: json.result.price || 0,
            recommendation: json.result.recommendation || '',
            category: selectedType || 'gaming',
            is_ai: true,
            image_url
          }),
        });
      
        const saveResult = await saveResponse.json();
        
        if (saveResult.status === 'success') {
          setAiResult({
            ...json.result,
            id: saveResult.id,
            likes: 0,
            likedBy: [],
          });
          setShowAIResult(true);
        } else {
          setAiResult({
            ...json.result,
            likes: 0,
            likedBy: [],
          });
          setShowAIResult(true);
          console.error('ไม่สามารถบันทึกสเปค AI:', saveResult.message);
        }
      } else {
        Alert.alert('ผิดพลาด', json.message || '');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('เชื่อมต่อ AI ผิดพลาด', 'กรุณาลองใหม่ภายหลัง');
    } finally {
      setLoading(false);
    }
  };

  const handleCompareAISpecs = async () => {
    if (!aiResult || !randomResult) {
      Alert.alert('กรุณาสุ่มสเปค AI และสเปครวมก่อน');
      return;
    }
  
    const aiSpecs = Object.values(aiResult.parts || {})
      .map(part => part.name)
      .join(', ');
    
    const randomSpecs = Object.values(randomResult.spec || {})
      .map(part => part.name)
      .join(', ');
  
    const prompt = `เปรียบเทียบสเปคคอมพิวเตอร์สองชุดต่อไปนี้: 
    สเปค AI: ${aiSpecs}
    สเปครวม: ${randomSpecs}
  
    กรุณาประเมินและอธิบายการเปรียบเทียบในด้านต่างๆ เช่น:
    - ประสิทธิภาพโดยรวม
    - ความเหมาะสมกับการใช้งาน
    - ความคุ้มค่า
    - จุดแข็งและจุดอ่อนของแต่ละสเปค
  
    ให้ให้คะแนนและเปอร์เซ็นต์ความเหมาะสมด้วย`;
  
    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-latest:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            contents: [{ parts: [{ text: prompt }] }] 
          }),
        }
      );
  
      const result = await response.json();
      const comparison = result?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
      setComparisonResult(comparison);
      setShowComparisonModal(true);
  
    } catch (error) {
      console.error(error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเปรียบเทียบสเปคได้');
    }
  };

  const fetchAIComparison = async () => {
    setIsComparing(true);
    try {
      if (!compareData || !compareData.left_spec_name || !compareData.right_spec_name) {
        Alert.alert('เกิดข้อผิดพลาด', 'ข้อมูลการเปรียบเทียบไม่สมบูรณ์');
        setIsComparing(false);
        return;
      }
  
      const normalizeSpec = (obj = {}) =>
        Object.entries(obj)
          .filter(([key]) => key !== 'price')
          .map(([key, val]) => `${key.toUpperCase()}: ${val && val !== '-' ? val : 'ไม่มีข้อมูล'}`)
          .join('\n');
  
      const spec1Text = normalizeSpec(compareData.left);
      const spec2Text = normalizeSpec(compareData.right);
  
      const prompt = `เปรียบเทียบสเปคคอมสองชุดต่อไปนี้ และบอกว่าในแต่ละส่วนประกอบ อุปกรณ์ชิ้นไหนดีกว่ากัน...:
  
  Spec 1 (${compareData.left_spec_name}):
  ${spec1Text}
  Price: ฿${compareData.left_price?.toLocaleString() || '0'}
  
  Spec 2 (${compareData.right_spec_name}):
  ${spec2Text}
  Price: ฿${compareData.right_price?.toLocaleString() || '0'}
  
  ให้ผลลัพธ์ในรูปแบบ:
  - CPU: เท่ากัน
  - MAINBOARD: ชุดที่ 1 ดีกว่า (ระบุเหตุผล)
  - ...
  - ราคา: ชุดที่ ... 
  
  และเพิ่มคำแนะนำว่าชุดไหนเหมาะกับการใช้งานแบบไหน (โดยเริ่มบรรทัดด้วยคำว่า "คำแนะนำ")`;
  
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);
  
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 500,
            },
          }),
          signal: controller.signal,
        }
      );
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      let resultText = '';
try {
  resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
} catch (err) {
  console.warn('AI response parsing failed', err);
  resultText = '';
}
if (!resultText) {
  setAiComparisonResult('ไม่สามารถโหลดคำแนะนำจาก AI ได้ในขณะนี้ กรุณาลองใหม่');
  return;
}
      const lines = resultText.split('\n');
  
      const comparison = {};
      let recommendation = '';
      let isRecommendationSection = false;
  
      const componentRegex = /^-\s*\**\s*([A-Z]+)\s*:\s*(.+)$/i;
  
      lines.forEach(line => {
        line = line.trim();
        if (!line) return;
  
        const match = line.match(componentRegex);
        if (match) {
          const [, component, result] = match;
          let comparisonResult = 'เท่ากัน';
          if (result.includes('ชุดที่ 1 ดีกว่า')) comparisonResult = 'ชุดที่ 1 ดีกว่า';
          else if (result.includes('ชุดที่ 2 ดีกว่า')) comparisonResult = 'ชุดที่ 2 ดีกว่า';
          else if (result.includes('เท่ากัน')) comparisonResult = 'เท่ากัน';
  
          comparison[component.toLowerCase()] = {
            result: comparisonResult,
            reason: result,
          };
        } else if (line.includes('คำแนะนำ') || isRecommendationSection) {
          isRecommendationSection = true;
          if (!line.includes('คำแนะนำ')) {
            recommendation += line + '\n';
          }
        }
      });
  
      setComparisonResults(comparison);
      setAiComparisonResult(recommendation.trim() || 'ไม่พบคำแนะนำจาก AI');
    } catch (error) {
      console.error('Error fetching AI comparison:', error);
      setAiComparisonResult('ไม่สามารถเปรียบเทียบได้ เนื่องจากเกิดข้อผิดพลาดในการเชื่อมต่อกับ AI');
  
      const fallback = {};
      ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler', 'ราคา'].forEach(key => {
        fallback[key] = {
          result: 'เท่ากัน',
          reason: 'ไม่สามารถเปรียบเทียบได้',
        };
      });
      setComparisonResults(fallback);
    } finally {
      setIsComparing(false);
    }
  };
  

 const handleComparePopup = async () => {
  if (!randomResult?.id || !aiResult?.id) {
    Alert.alert('กรุณาสุ่มสเปคทั้งสองฝั่งก่อน');
    return;
  }

  try {
    const res = await fetch('http://10.0.2.2/speccompare-api/compare-specs-from-db.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        left_id: randomResult.id,
        right_id: aiResult.id
      })
    });

    const json = await res.json();
    console.log('API Response from compare-specs-from-db.php:', json);

    if (json.status === 'success') {
      const transformedData = {
        left_spec_name: json.result.left_spec_name,
        right_spec_name: json.result.right_spec_name,
        left_price: json.result.left_price,
        right_price: json.result.right_price,
        left: {},
        right: {}
      };

      const parts = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'];
      parts.forEach(part => {
        transformedData.left[part] = json.result.comparison[part]?.left || '-';
        transformedData.right[part] = json.result.comparison[part]?.right || '-';
      });

      console.log('Transformed Data:', transformedData);

      setCompareData(transformedData);

      // ✅ ดึงผล AI เปรียบเทียบให้เสร็จก่อน
      await fetchAIComparison();

      // ✅ หน่วงเวลาเล็กน้อยให้ state render เสร็จ
      setTimeout(() => {
        setShowCompareModal(true);
      }, 300);

    } else {
      Alert.alert('เกิดข้อผิดพลาด', json.message || 'ไม่สามารถเปรียบเทียบได้');
    }
  } catch (error) {
    console.error('Error fetching comparison:', error);
    Alert.alert('เชื่อมต่อผิดพลาด', 'กรุณาลองใหม่ภายหลัง');
  }
};


  const priceRanges = [
    { id: '0-10000', label: '0 - 10,000 บาท' },
    { id: '10000-20000', label: '10,000 - 20,000 บาท' },
    { id: '20000-30000', label: '20,000 - 30,000 บาท' },
    { id: '30000-40000', label: '30,000 - 40,000 บาท' },
    { id: '40000+', label: 'มากกว่า 40,000 บาท' }
  ];
  
  const cpuTypes = [
    { id: 'AMD', label: 'AMD' }, 
    { id: 'Intel', label: 'Intel' }
  ];
  
  const usageTypes = [
    { id: 'work', label: 'ทำงาน' },
    { id: 'gaming', label: 'เล่นเกม' },
    { id: 'graphic', label: 'กราฟฟิก' }
  ];

  const renderResultBox = (data, onClose, labelColor = '#173B7A', isAI = false) => {
    if (!data) return null;
  
    return (
      <View style={styles.resultCard}>
        <Text style={[styles.resultTitle, { color: labelColor }]}>
          {isAI ? 'พบสเปค AI ที่ตรงตามเงื่อนไข 🧠✨' : 'พบสเปคที่เข้ากับเงื่อนไข'}
        </Text>
        <TouchableOpacity onPress={() => handleLike(data.id, isAI)} style={{ alignSelf: 'flex-end', marginBottom: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ 
              color: data.likedBy?.includes(username) ? 'red' : '#999', 
              fontSize: 16,
              marginRight: 4 
            }}>
              ❤️
            </Text>
            <Text style={{ 
              color: '#333', 
              fontSize: 16 
            }}>
              {data.likes !== undefined ? data.likes : 0}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.resultInfo}>
          <Text style={styles.specName}>{data.spec_name}</Text>
          <Text style={styles.specPrice}>ราคา: ฿{Number(data.price).toLocaleString()}</Text>
          <Text style={styles.specCompatibility}>ความเข้ากันได้: {data.compatibility}%</Text>
        </View>
        
        <View style={styles.buttonRow}>
  <TouchableOpacity 
    style={styles.closeButton} 
    onPress={onClose}
  >
    <Text style={styles.closeButtonText}>ปิด</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.detailButton}
    onPress={() => {
      if (isAI) {
        navigation.navigate('SpecDetail', {
          isAI: true,
          spec: data,
          spec_id: data.id
        });
      } else {
        navigation.navigate('RandomSpecDetail', {
          spec_name: data.spec_name   
        });
      }
    }}
  >
    <Text style={styles.detailButtonText}>ดูรายละเอียด</Text>
  </TouchableOpacity>
</View>
      </View>
    );
  };

  const shakeStyle = {
    transform: [{
      translateX: shakeAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-10, 10]
      })
    }]
  };

  const ComparisonModal = () => (
    <Modal
      visible={showComparisonModal}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.comparisonModalContainer}>
        <ScrollView>
          <Text style={styles.comparisonTitle}>ผลการเปรียบเทียบสเปค</Text>
          <Text style={styles.comparisonText}>{comparisonResult}</Text>
          <TouchableOpacity 
            style={styles.closeComparisonButton}
            onPress={() => setShowComparisonModal(false)}
          >
            <Text style={styles.closeComparisonText}>ปิด</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  const selectedLeftName = () => compareData?.left_spec_name || 'สเปคซ้าย';
  const selectedRightName = () => compareData?.right_spec_name || 'สเปคขวา';

  const getAdvantages = () => {
    const advantages = {};
    Object.entries(comparisonResults).forEach(([key, value]) => {
      if (value.result === 'ชุดที่ 2 ดีกว่า') {
        advantages[key] = 'ดีกว่า';
      }
    });
    return advantages;
  };

  const renderComparisonTable = () => {
    if (!compareData) return null;
  
    const specs = [
      {
        id: 'spec1',
        name: compareData.left_spec_name || 'Spec 1',
        components: {
          cpu: compareData.left?.cpu || '-',
          mainboard: compareData.left?.mainboard || '-',
          gpu: compareData.left?.gpu || '-',
          ram: compareData.left?.ram || '-',
          storage: compareData.left?.ssd || '-',
          psu: compareData.left?.psu || '-',
          case: compareData.left?.case || '-',
          cooler: compareData.left?.cooler || '-',
          price: compareData.left_price || 0
        }
      },
      {
        id: 'spec2',
        name: compareData.right_spec_name || 'Spec 2',
        components: {
          cpu: compareData.right?.cpu || '-',
          mainboard: compareData.right?.mainboard || '-',
          gpu: compareData.right?.gpu || '-',
          ram: compareData.right?.ram || '-',
          storage: compareData.right?.ssd || '-',
          psu: compareData.right?.psu || '-',
          case: compareData.right?.case || '-',
          cooler: compareData.right?.cooler || '-',
          price: compareData.right_price || 0
        },
        advantages: getAdvantages()
      }
    ];

    const allComponents = [
      { key: 'cpu', label: 'CPU' },
      { key: 'mainboard', label: 'MAINBOARD' },
      { key: 'gpu', label: 'GPU' },
      { key: 'ram', label: 'RAM' },
      { key: 'storage', label: 'STORAGE' },
      { key: 'psu', label: 'PSU' },
      { key: 'case', label: 'CASE' },
      { key: 'cooler', label: 'COOLER' },
      { key: 'price', label: 'ราคา' }
    ];

    return (
      <ScrollView horizontal={true} style={tableStyles.tableContainer}>
        <View>
          <View style={tableStyles.headerRow}>
            <View style={tableStyles.componentCell}>
              <Text style={tableStyles.headerText}>ส่วนประกอบ</Text>
            </View>
            {specs.map((spec) => (
              <View key={spec.id} style={tableStyles.specCell}>
                <Text style={tableStyles.headerText}>{spec.name}</Text>
              </View>
            ))}
            <View style={tableStyles.compareCell}>
              <Text style={tableStyles.headerText}>เปรียบเทียบ</Text>
            </View>
          </View>

          {allComponents.map((component) => {
            const result = comparisonResults[component.key.toLowerCase()];
            const betterSpecIndex = result?.result === 'ชุดที่ 2 ดีกว่า' ? 1 : (result?.result === 'ชุดที่ 1 ดีกว่า' ? 0 : -1);
            
            return (
              <View key={component.key} style={tableStyles.row}>
                <View style={tableStyles.componentCell}>
                  <Text style={tableStyles.componentText}>{component.label}</Text>
                </View>
                
                {specs.map((spec, index) => (
                  <View 
                    key={`${spec.id}-${component.key}`} 
                    style={[
                      tableStyles.dataCell, 
                      betterSpecIndex === index && tableStyles.betterCell
                    ]}
                  >
                    <Text style={tableStyles.dataText}>
                      {component.key === 'price' 
                        ? `฿${parseInt(spec.components[component.key] || 0).toLocaleString()}`
                        : spec.components[component.key] || '-'}
                    </Text>
                  </View>
                ))}
                
                <View style={tableStyles.compareDataCell}>
                  <Text 
                    style={[
                      betterSpecIndex === -1 
                        ? tableStyles.neutralText 
                        : tableStyles.advantageText
                    ]}
                  >
                    {result?.reason || 'เท่ากัน'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>ตัวกรอง</Text>
        </View>

        <View style={styles.filterContainer}>
          <View style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Ionicons name="cash-outline" size={20} color="#173B7A" style={styles.categoryIcon} />
              <Text style={styles.categoryTitle}>ราคา</Text>
            </View>
            
            <View style={styles.optionsGrid}>
              {priceRanges.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionButton,
                    selectedPrice === item.id && styles.optionButtonSelected
                  ]}
                  onPress={() => handlePriceSelect(item.id)}
                >
                  <View style={[
                    styles.checkbox,
                    selectedPrice === item.id && styles.checkboxSelected
                  ]}>
                    {selectedPrice === item.id && (
                      <Ionicons 
                        name="checkmark" 
                        size={14} 
                        color="#FFFFFF" 
                      />
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Ionicons name="hardware-chip-outline" size={20} color="#173B7A" style={styles.categoryIcon} />
              <Text style={styles.categoryTitle}>CPU</Text>
            </View>
            
            <View style={styles.optionsRow}>
              {cpuTypes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.cpuButton,
                    selectedCPU === item.id && styles.cpuButtonSelected
                  ]}
                  onPress={() => handleCPUSelect(item.id)}
                >
                  <View style={[
                    styles.checkbox,
                    selectedCPU === item.id && styles.checkboxSelected
                  ]}>
                    {selectedCPU === item.id && (
                      <Ionicons 
                        name="checkmark" 
                        size={14} 
                        color="#FFFFFF" 
                      />
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Ionicons name="apps-outline" size={20} color="#173B7A" style={styles.categoryIcon} />
              <Text style={styles.categoryTitle}>ประเภท</Text>
            </View>
            
            <View style={styles.optionsRow}>
              {usageTypes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.typeButton,
                    selectedType === item.id && styles.typeButtonSelected
                  ]}
                  onPress={() => handleTypeSelect(item.id)}
                >
                  <View style={[
                    styles.checkbox,
                    selectedType === item.id && styles.checkboxSelected
                  ]}>
                    {selectedType === item.id && (
                      <Ionicons 
                        name="checkmark" 
                        size={14} 
                        color="#FFFFFF" 
                      />
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Animated.View style={[shakeStyle, { flex: 1 }]}>
            <TouchableOpacity style={styles.randomButton} onPress={handleRandom} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : 
                <Text style={styles.randomButtonText}>กดสุ่ม</Text>
              }
            </TouchableOpacity>
          </Animated.View>
          <View style={{ width: 1 }} /> 
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={[styles.aiRandomButton, { flex: 1 }]} onPress={handleAIRandom} disabled={loading}>
              <Text style={styles.randomButtonText}>สุ่มด้วย AI</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shakeHintContainer}>
          <Text style={styles.shakeHintText}>เขย่ามือถือเพื่อสุ่มสเปคอัตโนมัติ 🎲</Text>
        </View>

        {showResult &&
          renderResultBox({ ...randomResult }, () => {
            setShowResult(false);
            setRandomResult(null);
          })
        }

        {(showAIResult && showResult) && (
          <View style={styles.compareSpecContainer}>
            <TouchableOpacity 
              style={styles.compareSpecButton}
              onPress={handleComparePopup}
            >
              <View style={styles.compareSpecButtonContent}>
                <View style={styles.compareSpecIconContainer}>
                </View>
                <Text style={styles.compareSpecButtonText}>เปรียบเทียบสเปค</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {showAIResult &&
          renderResultBox({ ...aiResult }, () => {
            setShowAIResult(false);
            setAiResult(null);
          }, '#FF8800', true)
        }

        <ComparisonModal />

        <Modal visible={showCompareModal} animationType="fade" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {isComparing ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#2196F3" />
                  <Text style={styles.loadingText}>กำลังวิเคราะห์...</Text>
                </View>
              ) : (
                <ScrollView style={styles.modalScroll}>
                 <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#173B7A', textAlign: 'center', marginBottom: 10 }}>
  เปรียบเทียบสเปค (ตาราง)
</Text>
                  
                  {showCompareTable ? (
                    renderComparisonTable()
                  ) : (
                    <View style={styles.modalTableContainer}>
                      <View style={[styles.modalTableRow, styles.modalHeaderRow]}>
                        <Text style={styles.modalHeaderCell}>ส่วนประกอบ</Text>
                        <Text style={styles.modalHeaderCell}>{selectedLeftName()}</Text>
                        <Text style={styles.modalHeaderCell}>{selectedRightName()}</Text>
                        <Text style={styles.modalHeaderCell}>เปรียบเทียบ</Text>
                      </View>
                      {['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'].map((key, index) => (
                        <View style={[styles.modalTableRow, index % 2 === 0 ? styles.modalTableRowEven : styles.modalTableRowOdd]} key={key}>
                          <Text style={styles.modalFirstCell}>{key.toUpperCase()}</Text>
                          <Text
                            style={[
                              styles.modalDataCell,
                              comparisonResults[key]?.result === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                            ]}
                          >
                            {compareData?.left?.[key] || '-'}
                          </Text>
                          <Text
                            style={[
                              styles.modalDataCell,
                              comparisonResults[key]?.result === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                            ]}
                          >
                            {compareData?.right?.[key] || '-'}
                          </Text>
                          <Text
                            style={[
                              styles.modalDataCell,
                              comparisonResults[key]?.result === 'เท่ากัน' && styles.neutralText,
                            ]}
                          >
                            {comparisonResults[key]?.reason || 'เท่ากัน'}
                          </Text>
                        </View>
                      ))}
                      <View style={[styles.modalTableRow, styles.modalTableRowOdd]}>
                        <Text style={styles.modalFirstCell}>ราคา</Text>
                        <Text
                          style={[
                            styles.modalPriceCell,
                            comparisonResults['ราคา']?.result === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                          ]}
                        >
                          ฿{parseInt(compareData?.left_price || 0).toLocaleString()}
                        </Text>
                        <Text
                          style={[
                            styles.modalPriceCell,
                            comparisonResults['ราคา']?.result === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                          ]}
                        >
                          ฿{parseInt(compareData?.right_price || 0).toLocaleString()}
                        </Text>
                        <Text
                          style={[
                            styles.modalDataCell,
                            comparisonResults['ราคา']?.result === 'เท่ากัน' && styles.neutralText,
                          ]}
                        >
                          {comparisonResults['ราคา']?.reason || 'เท่ากัน'}
                        </Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.aiResultContainer}>
                    <View style={styles.aiResultHeader}>
                      <Ionicons name="bulb-outline" size={24} color="#2196F3" style={styles.aiResultIcon} />
                      <Text style={styles.aiResultTitle}>คำแนะนำจาก AI</Text>
                    </View>
                    <Text style={styles.aiResultText}>
                      {aiComparisonResult || 'กำลังวิเคราะห์...'}
                    </Text>
                  </View>
                </ScrollView>
              )}

              <TouchableOpacity onPress={() => setShowCompareModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>ปิด</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Keep existing container styles
  container: { 
    flex: 1, 
    backgroundColor: '#f5f5f7' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    paddingBottom: 30 
  },
  
  // Keep existing header styles
  headerBox: { 
    backgroundColor: '#173B7A', 
    padding: 16, 
    alignItems: 'center', 
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  
  // Keep existing filter container
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  
  // Enhanced category container with better spacing
  categoryContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  // Enhanced category header with improved visual style
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    marginRight: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#173B7A',
    letterSpacing: 0.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 6,
  },
  
  // Enhanced option grids with better spacing
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginTop: 4,
  },
  
  // Improved checkbox filter buttons
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginHorizontal: 6,
    marginBottom: 12,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  optionButtonSelected: {
    backgroundColor: '#EDF5FF',
    borderColor: '#173B7A',
  },
  
  // Improved CPU selection buttons
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginTop: 4,
  },
  cpuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginHorizontal: 6,
    marginBottom: 12,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  cpuButtonSelected: {
    backgroundColor: '#EDF5FF',
    borderColor: '#173B7A',
  },
  
  // Enhanced type selection buttons
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginHorizontal: 6,
    marginBottom: 12,
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  typeButtonSelected: {
    backgroundColor: '#EDF5FF',
    borderColor: '#173B7A',
  },
  
  // Modern checkbox design
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#BBBBBB',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#173B7A',
    borderColor: '#173B7A',
  },
  
  // Enhanced text for the options
  optionText: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  
  // Keep other existing styles
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  
  randomButton: {
    flex: 1.2,
    backgroundColor: '#173B7A',
    paddingVertical: 14,  
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,  
    elevation: 3
  },
  aiRandomButton: {
    flex: 1,
    backgroundColor: '#FF8800',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 4,
    elevation: 3  
  },
  randomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // Keep all other existing styles unchanged
  shakeHintContainer: {
    padding: 12, 
    backgroundColor: '#fff8e1', 
    margin: 16, 
    marginTop: 0,
    borderRadius: 4,
    borderLeftWidth: 4, 
    borderLeftColor: '#FFB800',
  },
  shakeHintText: { 
    fontSize: 14, 
    color: '#333' 
  },
  comparisonModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'center', 
    padding: 20
  },
  comparisonTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15
  },
  comparisonText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24
  },
  closeComparisonButton: {
    backgroundColor: '#FF4500', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 20
  },
  closeComparisonText: {
    color: '#FFFFFF', 
    fontWeight: 'bold'
  },
  compareSpecContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 10
  },
  compareSpecButton: {
    backgroundColor: '#FFFFFF', 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF8800',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  compareSpecButtonContent: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  compareSpecIconContainer: {
    marginRight: 10,
    backgroundColor: '#FFF8E1',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  compareSpecButtonText: {
    color: '#FF8800', 
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  
  resultCard: { 
    backgroundColor: '#fff', 
    margin: 16, 
    padding: 16, 
    borderRadius: 8 
  },
  resultTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  resultInfo: { 
    padding: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 8, 
    marginBottom: 10 
  },
  specName: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  specPrice: { 
    fontSize: 15, 
    color: '#22a45d', 
    fontWeight: 'bold' 
  },
  specCompatibility: { 
    fontSize: 14, 
    color: '#173B7A'

  },
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  closeButton: { 
    width: '30%',
    height: 50,
    borderWidth: 1,
    borderColor: '#173B7A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    marginRight: 8,
  },
  detailButton: { 
    width: '70%',
    height: 50,
    backgroundColor: '#173B7A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: { 
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  detailButtonText: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalScroll: {
    flexGrow: 1,
  },
  modalTableContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  modalTableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalHeaderRow: {
    backgroundColor: '#173B7A',
  },
  modalTableRowEven: {
    backgroundColor: '#f9f9f9',
  },
  modalTableRowOdd: {
    backgroundColor: '#ffffff',
  },
  modalHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  modalFirstCell: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'left',
    color: '#333',
    fontSize: 16,
  },
  modalDataCell: {
    flex: 1,
    textAlign: 'left',
    color: '#555',
    fontSize: 14,
  },
  modalPriceCell: {
    flex: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#4CAF50',
    fontSize: 16,
  },
  highlightWinner: {
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  neutralText: {
    color: '#888',
  },
  aiResultContainer: {
    padding: 16,
    backgroundColor: '#e8f0fe',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d3e2ff',
  },
  aiResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiResultIcon: {
    marginRight: 8,
  },
  aiResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#173B7A',
  },
  aiResultText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#173B7A',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  viewToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#173B7A',
    marginHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  viewToggleActive: {
    backgroundColor: '#173B7A',
  },
  viewToggleText: {
    color: '#173B7A',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

const tableStyles = StyleSheet.create({
  tableContainer: {
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#173B7A',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  componentCell: {
    width: 120,
    padding: 12,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    backgroundColor: '#F5F5F5',
  },
  specCell: {
    width: 170,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  compareCell: {
    width: 180,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCell: {
    width: 170,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  compareDataCell: {
    width: 180,
    padding: 12,
    justifyContent: 'center',
  },
  betterCell: {
    backgroundColor: '#E8F5E9',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  componentText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dataText: {
    fontSize: 14,
  },
  advantageText: {
    color: '#4CAF50',
    fontSize: 14,
  },
  neutralText: {
    color: '#757575',
    fontSize: 14,
  },
});