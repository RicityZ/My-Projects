import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Linking
} from 'react-native';

export default function NewsSection() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2/speccompare-api/get-news.php')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'success') {
          setNews(json.data);
        } else {
          console.log('ไม่พบข่าว:', json.message);
        }
      })
      .catch((err) => console.error('โหลดข่าวล้มเหลว:', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ข่าวสารล่าสุด</Text>
      {news.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => Linking.openURL(item.link)}>
          <View style={styles.newsItem}>
            <Image source={{ uri: item.image_url }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.content}>{item.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 70,
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  content: {
    fontSize: 12,
    color: '#555',
  },
});
