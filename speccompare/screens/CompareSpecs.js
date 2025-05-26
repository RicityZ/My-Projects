import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, ActivityIndicator, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useUser } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function CompareSpecs() {
    const { username } = useUser();
    const navigation = useNavigation();

    const [likedSpecs, setLikedSpecs] = useState([]);
    const [leftOpen, setLeftOpen] = useState(false);
    const [rightOpen, setRightOpen] = useState(false);
    const [selectedLeft, setSelectedLeft] = useState(null);
    const [selectedRight, setSelectedRight] = useState(null);
    const [leftDetail, setLeftDetail] = useState(null);
    const [rightDetail, setRightDetail] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [comparisonResults, setComparisonResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useFocusEffect(
  useCallback(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        const [likedRes, userSpecsRes] = await Promise.all([
          fetch(`http://10.0.2.2/speccompare-api/get-liked-specs.php?username=${username}`),
          fetch(`http://10.0.2.2/speccompare-api/get-user-specs.php?username=${username}`)
        ]);

        const likedData = await likedRes.json();
        const userSpecsData = await userSpecsRes.json();

        const liked = likedData.status === 'success' ? likedData.data : [];
        const userSpecs = userSpecsData.status === 'success' ? userSpecsData.data : [];

        // รวมและลบซ้ำ (ถ้ามี id ซ้ำ)
        const allSpecs = [...liked, ...userSpecs];
        const uniqueSpecs = Object.values(
          allSpecs.reduce((acc, spec) => {
            acc[spec.id] = spec;
            return acc;
          }, {})
        );

        setLikedSpecs(uniqueSpecs);
      } catch (err) {
        console.error('Error fetching specs:', err);
      }
    };

    fetchData();
  }, [username])
);


    const fetchSpecDetail = async (id, setter) => {
        try {
            console.log("กำลังเรียก API ด้วย ID:", id);
            const res = await fetch(`http://10.0.2.2/speccompare-api/get-spec-detail.php?spec_id=${id}`);
            const data = await res.json();
            console.log("ข้อมูลที่ได้จาก API:", data);

            if (data.status === 'success') {
                const specData = data.data.parsedSpec || {};
                specData.price = data.data.price || 0;
                console.log("ข้อมูลที่จะใช้:", specData);
                setter(specData);
            } else {
                console.error("API ส่งสถานะไม่สำเร็จ:", data.message);
                setter(null);
            }
        } catch (e) {
            console.error("โหลด spec ล้มเหลว:", e);
            setter(null);
        }
    };

    useEffect(() => {
        if (selectedLeft) {
            fetchSpecDetail(selectedLeft, setLeftDetail);
        }
    }, [selectedLeft]);

    useEffect(() => {
        if (selectedRight) {
            fetchSpecDetail(selectedRight, setRightDetail);
        }
    }, [selectedRight]);

    const selectedLeftName = () => {
        if (!selectedLeft) return "เลือกสเปคด้านซ้าย";
        const spec = likedSpecs.find(item => item.id == selectedLeft);
        return spec ? spec.spec_name : "เลือกสเปคด้านซ้าย";
    };

    const selectedRightName = () => {
        if (!selectedRight) return "เลือกสเปคด้านขวา";
        const spec = likedSpecs.find(item => item.id == selectedRight);
        return spec ? spec.spec_name : "เลือกสเปคด้านขวา";
    };

    const fetchAIComparison = async () => {
        setIsLoading(true);
        try {
            if (!leftDetail || !rightDetail) {
                throw new Error('ข้อมูลสเปคไม่ครบถ้วน');
            }

            const spec1Text = Object.entries(leftDetail)
                .filter(([key]) => key !== 'price')
                .map(([key, value]) => `${key.toUpperCase()}: ${value?.name || '-'}`)
                .join('\n');
            const spec2Text = Object.entries(rightDetail)
                .filter(([key]) => key !== 'price')
                .map(([key, value]) => `${key.toUpperCase()}: ${value?.name || '-'}`)
                .join('\n');

            const prompt = `เปรียบเทียบสเปคคอมสองชุดต่อไปนี้ และบอกว่าในแต่ละส่วนประกอบ อุปกรณ์ชิ้นไหนดีกว่ากัน (ถ้าเหมือนกันให้บอกว่า "เท่ากัน"):

Spec 1 (${selectedLeftName()}):
${spec1Text}
Price: ฿${leftDetail.price?.toLocaleString() || '0'}

Spec 2 (${selectedRightName()}):
${spec2Text}
Price: ฿${rightDetail.price?.toLocaleString() || '0'}

ให้ผลลัพธ์ในรูปแบบ:
- CPU: เท่ากัน
- MAINBOARD: เท่ากัน
- GPU: เท่ากัน
- (ต่อไปเรื่อยๆ)
- ราคา: เท่ากัน

และเพิ่มคำแนะนำว่าชุดไหนเหมาะกับการใช้งานแบบไหน`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000); // 10s


            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt,
                                    },
                                ],
                            },
                        ],
                        generationConfig: {
                            maxOutputTokens: 2000,
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
            console.log('Gemini API Response:', data);

            if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
                throw new Error('Invalid response structure from Gemini API');
            }

            const resultText = data.candidates[0].content.parts[0].text;
            console.log('Result Text from Gemini API:', resultText);

            const lines = resultText.split('\n');
            console.log('Lines after split:', lines);

            const comparison = {};
            let recommendation = '';

            lines.forEach(line => {
                if (line.startsWith('- ')) {
                    const parts = line.replace('- ', '').split(': ');
                    if (parts.length < 2) {
                        console.warn(`Skipping invalid line: ${line}`);
                        return;
                    }
                    const [component, result] = parts;
                    if (result) {
                        comparison[component.toLowerCase()] = result.trim();
                    } else {
                        comparison[component.toLowerCase()] = 'เท่ากัน';
                    }
                } else if (line && !line.startsWith('Spec')) {
                    recommendation += line + '\n';
                }
            });

            console.log('Parsed Comparison:', comparison);
            console.log('Parsed Recommendation:', recommendation);

            setComparisonResults(comparison);
            setAiResult(recommendation.trim());
        } catch (error) {
            console.error('Error fetching AI comparison:', error);
            setAiResult('เกิดข้อผิดพลาดในการวิเคราะห์: ' + error.message);
            const keys = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler', 'ราคา'];
            const comparison = {};
            keys.forEach(key => {
                comparison[key] = 'เท่ากัน';
            });
            setComparisonResults(comparison);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCompareAI = () => {
        if (!leftDetail || !rightDetail) {
            console.warn('Cannot compare: leftDetail or rightDetail is null');
            return;
        }
        setModalVisible(true);
        fetchAIComparison();
    };

    const renderComparison = () => {
        if (!leftDetail || !rightDetail) {
            console.log('renderComparison: leftDetail or rightDetail is null');
            return null;
        }

        const keys = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'];

        return (
            <View style={styles.tableContainer}>
                <View style={styles.table}>
              
                    <View style={[styles.tableRow, styles.headerRow]}>
                        <Text style={[styles.cell, styles.headerCell]}>ข้อมูล</Text>
                        <Text style={[styles.cell, styles.headerCell]}>{selectedLeftName()}</Text>
                        <Text style={[styles.cell, styles.headerCell]}>{selectedRightName()}</Text>
                    </View>

               
                    {keys.map((key, index) => (
                        <View
                            style={[
                                styles.tableRow,
                                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                                index === keys.length - 1 && styles.lastRow,
                            ]}
                            key={key}
                        >
                            <Text style={[styles.cell, styles.firstCell]}>{key.toUpperCase()}</Text>
                            <Text style={[styles.cell, styles.dataCell]}>{leftDetail?.[key]?.name || '-'}</Text>
                            <Text style={[styles.cell, styles.dataCell]}>{rightDetail?.[key]?.name || '-'}</Text>
                        </View>
                    ))}

                 
                    <View
                        style={[
                            styles.tableRow,
                            keys.length % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
                            styles.lastRow,
                        ]}
                    >
                        <Text style={[styles.cell, styles.firstCell]}>ราคา</Text>
                        <Text style={[styles.cell, styles.priceCell]}>
                            ฿{parseInt(leftDetail?.price || 0).toLocaleString()}
                        </Text>
                        <Text style={[styles.cell, styles.priceCell]}>
                            ฿{parseInt(rightDetail?.price || 0).toLocaleString()}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleCompareAI} style={styles.compareButton}>
                    <Text style={styles.compareButtonText}>เปรียบเทียบด้วย AI</Text>
                </TouchableOpacity>
            </View>

        );
    };

    const getSpecList = () => {
        return likedSpecs;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>เปรียบเทียบสเปคคอม</Text>
            </View>

            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={[styles.scrollContentContainer, { paddingBottom: 150 }]}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
            >
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>เลือกสเปคด้านซ้าย:</Text>
                    <DropDownPicker
                        open={leftOpen}
                        value={selectedLeft}
                        items={getSpecList().map(spec => ({
                            label: `${spec.spec_name} (ID: ${spec.id})`,
                            value: spec.id,
                        }))}
                        setOpen={setLeftOpen}
                        setValue={setSelectedLeft}
                        placeholder="เลือกสเปคด้านซ้าย"
                        zIndex={8000}
                        zIndexInverse={1000}
                        style={styles.dropdown}
                        dropDownContainerStyle={[styles.dropDownContainer, { maxHeight: 200 }]}
                        searchable={true}
                        searchPlaceholder="ค้นหาชื่อสเปค..."
                        onOpen={() => setRightOpen(false)}
                        listMode="MODAL"
                        modalProps={{
                            animationType: "fade"
                        }}
                        dropDownDirection="BOTTOM"
                        containerStyle={{ marginBottom: 16 }}
                    />

                    <Text style={styles.label}>เลือกสเปคด้านขวา:</Text>
                    <DropDownPicker
                        open={rightOpen}
                        value={selectedRight}
                        items={getSpecList().map(spec => ({
                            label: `${spec.spec_name} (ID: ${spec.id})`,
                            value: spec.id,
                        }))}
                        setOpen={setRightOpen}
                        setValue={setSelectedRight}
                        placeholder="เลือกสเปคด้านขวา"
                        zIndex={9000}
                        zIndexInverse={1000}
                        style={styles.dropdown}
                        dropDownContainerStyle={[styles.dropDownContainer, { maxHeight: 200 }]}
                        searchable={true}
                        searchPlaceholder="ค้นหาชื่อสเปค..."
                        onOpen={() => setLeftOpen(false)}
                        listMode="MODAL"
                        modalProps={{
                            animationType: "fade"
                        }}
                        dropDownDirection="BOTTOM"
                        containerStyle={{ marginBottom: 16 }}
                    />
                </View>

                {renderComparison()}
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {isLoading ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#2196F3" />
                                <Text style={styles.loadingText}>กำลังวิเคราะห์...</Text>
                            </View>
                        ) : (
                            <ScrollView style={styles.modalScroll}>
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
                                                    comparisonResults[key] === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                                                ]}
                                            >
                                                {leftDetail?.[key]?.name || '-'}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.modalDataCell,
                                                    comparisonResults[key] === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                                                ]}
                                            >
                                                {rightDetail?.[key]?.name || '-'}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.modalDataCell,
                                                    comparisonResults[key] === 'เท่ากัน' && styles.neutralText,
                                                ]}
                                            >
                                                {comparisonResults[key] || 'กำลังวิเคราะห์...'}
                                            </Text>
                                        </View>
                                    ))}
                                    <View style={[styles.modalTableRow, styles.modalTableRowOdd]}>
                                        <Text style={styles.modalFirstCell}>ราคา</Text>
                                        <Text
                                            style={[
                                                styles.modalPriceCell,
                                                comparisonResults['ราคา'] === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                                            ]}
                                        >
                                            ฿{parseInt(leftDetail?.price || 0).toLocaleString()}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.modalPriceCell,
                                                comparisonResults['ราคา'] === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                                            ]}
                                        >
                                            ฿{parseInt(rightDetail?.price || 0).toLocaleString()}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.modalDataCell,
                                                comparisonResults['ราคา'] === 'เท่ากัน' && styles.neutralText,
                                            ]}
                                        >
                                            {comparisonResults['ราคา'] || 'กำลังวิเคราะห์...'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.aiResultContainer}>
                                    <View style={styles.aiResultHeader}>
                                        <Icon name="bulb-outline" size={24} color="#2196F3" style={styles.aiResultIcon} />
                                        <Text style={styles.aiResultTitle}>คำแนะนำจาก AI</Text>
                                    </View>
                                    <Text style={styles.aiResultText}>
                                        {aiResult || 'กำลังวิเคราะห์...'}
                                    </Text>
                                </View>
                            </ScrollView>
                        )}

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>ปิด</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    backButton: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 4000,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 20,
      padding: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    dropdownContainer: {
      padding: 16,
      backgroundColor: '#F5F7FA',
      zIndex: 5000,
    },
    label: {
      fontWeight: '600',
      marginBottom: 8,
      marginTop: 16,
      color: '#333',
      fontSize: 16,
    },
    dropdown: {
      backgroundColor: '#fff',
      borderRadius: 12,
      borderColor: '#d3d3d3',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    dropDownContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      borderColor: '#d3d3d3',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 6000,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContentContainer: {
      paddingBottom: 20,
    },
    tableContainer: {
      marginBottom: 20,
      marginHorizontal: 16,
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    tableTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#173B7A',
      textAlign: 'center',
      marginVertical: 12,
    },
    table: {
      borderRadius: 15,
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    headerRow: {
      backgroundColor: '#173B7A',
    },
    tableRowEven: {
      backgroundColor: '#f9f9f9',
    },
    tableRowOdd: {
      backgroundColor: '#ffffff',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    cell: {
      flex: 1,
      padding: 12,
      textAlign: 'center',
      fontSize: 14,
    },
    headerCell: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 16,
    },
    firstCell: {
      fontWeight: '600',
      color: '#333',
      textAlign: 'left',
    },
    dataCell: {
      color: '#555',
      textAlign: 'left',
    },
    priceCell: {
      fontWeight: 'bold',
      color: '#4CAF50',
      textAlign: 'left',
    },
    compareButton: {
      backgroundColor: '#173B7A',
      borderRadius: 12,
      padding: 14,
      margin: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    compareButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
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
    closeButton: {
      backgroundColor: '#173B7A',
      borderRadius: 12,
      padding: 14,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
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
  });
  