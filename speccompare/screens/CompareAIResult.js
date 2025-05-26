import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CompareAIResult() {
    const navigation = useNavigation();
    const route = useRoute();
    const { spec1, spec2, specName1, specName2 } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [comparisonResults, setComparisonResults] = useState({});

    // ฟังก์ชันส่งข้อมูลไปยัง Gemini API
    const fetchAIComparison = async () => {
        try {
            const spec1Text = Object.entries(spec1)
                .filter(([key]) => key !== 'price')
                .map(([key, value]) => `${key.toUpperCase()}: ${value.name || '-'}`)
                .join('\n');
            const spec2Text = Object.entries(spec2)
                .filter(([key]) => key !== 'price')
                .map(([key, value]) => `${key.toUpperCase()}: ${value.name || '-'}`)
                .join('\n');

            const prompt = `เปรียบเทียบสเปคคอมสองชุดต่อไปนี้ และบอกว่าในแต่ละส่วนประกอบ อุปกรณ์ชิ้นไหนดีกว่ากัน (ถ้าเหมือนกันให้บอกว่า "เท่ากัน"):

Spec 1 (${specName1}):
${spec1Text}
Price: ฿${spec1.price.toLocaleString()}

Spec 2 (${specName2}):
${spec2Text}
Price: ฿${spec2.price.toLocaleString()}

ให้ผลลัพธ์ในรูปแบบ:
- CPU: เท่ากัน
- MAINBOARD: เท่ากัน
- GPU: เท่ากัน
- (ต่อไปเรื่อยๆ)
- ราคา: เท่ากัน

และเพิ่มคำแนะนำว่าชุดไหนเหมาะกับการใช้งานแบบไหน`;

            // เรียก Gemini API
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer AIzaSyBrT-hycuVyoRpWU-TL0979bXtzAGHeDTk', // แทนที่ด้วย API Key จริง
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
                            maxOutputTokens: 500,
                        },
                    }),
                }
            );

            const data = await response.json();
            const resultText = data.candidates[0]?.content?.parts[0]?.text || 'ไม่สามารถวิเคราะห์ได้';

            // แยกคำแนะนำและผลการเปรียบเทียบ
            const lines = resultText.split('\n');
            const comparison = {};
            let recommendation = '';

            lines.forEach(line => {
                if (line.startsWith('- ')) {
                    const [component, result] = line.replace('- ', '').split(': ');
                    comparison[component.toLowerCase()] = result.trim();
                } else if (line && !line.startsWith('Spec')) {
                    recommendation += line + '\n';
                }
            });

            setComparisonResults(comparison);
            setAiResult(recommendation.trim());
        } catch (error) {
            console.error('Error fetching AI comparison:', error);
            setAiResult('เกิดข้อผิดพลาดในการวิเคราะห์');
            const keys = ['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler', 'ราคา'];
            const comparison = {};
            keys.forEach(key => {
                comparison[key] = 'เท่ากัน';
            });
            setComparisonResults(comparison);
        }
    };

    // เรียก fetchAIComparison และแสดง Popup อัตโนมัติเมื่อเข้าไปที่หน้า
    useEffect(() => {
        setModalVisible(true);
        fetchAIComparison();
    }, []);

    return (
        <View style={styles.container}>
            {/* ปุ่มย้อนกลับ */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>ผลลัพธ์การเปรียบเทียบด้วย AI</Text>

            {/* ตารางเปรียบเทียบหลัก */}
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.headerCell}>ชิ้นส่วน</Text>
                        <Text style={styles.headerCell}>{specName1}</Text>
                        <Text style={styles.headerCell}>{specName2}</Text>
                    </View>
                    {['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'].map(key => (
                        <View style={styles.tableRow} key={key}>
                            <Text style={styles.firstCell}>{key.toUpperCase()}</Text>
                            <Text style={styles.dataCell}>{spec1?.[key]?.name || '-'}</Text>
                            <Text style={styles.dataCell}>{spec2?.[key]?.name || '-'}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.firstCell}>ราคา</Text>
                        <Text style={styles.priceCell}>฿{parseInt(spec1.price || 0).toLocaleString()}</Text>
                        <Text style={styles.priceCell}>฿{parseInt(spec2.price || 0).toLocaleString()}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Popup */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView style={styles.modalScroll}>
                            {/* ตารางเปรียบเทียบใน Popup */}
                            <View style={styles.modalTableContainer}>
                                <View style={styles.modalTableRow}>
                                    <Text style={styles.modalHeaderCell}>ส่วนประกอบ</Text>
                                    <Text style={styles.modalHeaderCell}>{specName1}</Text>
                                    <Text style={styles.modalHeaderCell}>{specName2}</Text>
                                    <Text style={styles.modalHeaderCell}>เปรียบเทียบ</Text>
                                </View>
                                {['cpu', 'mainboard', 'gpu', 'ram', 'ssd', 'hdd', 'psu', 'case', 'cooler'].map(key => (
                                    <View style={styles.modalTableRow} key={key}>
                                        <Text style={styles.modalFirstCell}>{key.toUpperCase()}</Text>
                                        <Text
                                            style={[
                                                styles.modalDataCell,
                                                comparisonResults[key] === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                                            ]}
                                        >
                                            {spec1?.[key]?.name || '-'}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.modalDataCell,
                                                comparisonResults[key] === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                                            ]}
                                        >
                                            {spec2?.[key]?.name || '-'}
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
                                <View style={styles.modalTableRow}>
                                    <Text style={styles.modalFirstCell}>ราคา</Text>
                                    <Text
                                        style={[
                                            styles.modalPriceCell,
                                            comparisonResults['ราคา'] === 'ชุดที่ 1 ดีกว่า' && styles.highlightWinner,
                                        ]}
                                    >
                                        ฿{parseInt(spec1.price || 0).toLocaleString()}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.modalPriceCell,
                                            comparisonResults['ราคา'] === 'ชุดที่ 2 ดีกว่า' && styles.highlightWinner,
                                        ]}
                                    >
                                        ฿{parseInt(spec2.price || 0).toLocaleString()}
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

                            {/* คำแนะนำจาก AI */}
                            <View style={styles.aiResultContainer}>
                                <Text style={styles.aiResultTitle}>คำแนะนำจาก AI</Text>
                                <Text style={styles.aiResultText}>
                                    {aiResult || 'กำลังวิเคราะห์...'}
                                </Text>
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>ปิด</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 4000,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        marginTop: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    tableContainer: {
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    firstCell: {
        flex: 1,
        fontWeight: 'bold',
    },
    dataCell: {
        flex: 1,
        textAlign: 'left',
    },
    priceCell: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'green',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        maxHeight: '80%',
    },
    modalScroll: {
        flexGrow: 1,
    },
    modalTableContainer: {
        marginBottom: 20,
    },
    modalTableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalHeaderCell: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalFirstCell: {
        flex: 1,
        fontWeight: 'bold',
    },
    modalDataCell: {
        flex: 1,
        textAlign: 'left',
    },
    modalPriceCell: {
        flex: 1,
        textAlign: 'left',
        fontWeight: 'bold',
        color: 'green',
    },
    highlightWinner: {
        backgroundColor: '#e0f7fa',
    },
    neutralText: {
        color: '#666',
    },
    aiResultContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        marginBottom: 16,
    },
    aiResultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    aiResultText: {
        fontSize: 14,
        lineHeight: 22,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});