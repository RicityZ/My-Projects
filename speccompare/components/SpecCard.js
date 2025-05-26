import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useUser } from '../context/UserContext';

export default function SpecCard({ spec }) {
  const { userId } = useUser();
  const [likes, setLikes] = useState(spec.likes);
  const [liked, setLiked] = useState(spec.user_liked === true); // ตรวจสอบว่า user เคยกดไลค์หรือยัง

  const handleLike = async () => {
    try {
      const res = await fetch('http://10.0.2.2/speccompare-api/toggle-like.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_id=${userId}&pc_id=${spec.id}`,
      });

      const result = await res.json();
      if (result.status === 'liked') {
        setLikes((prev) => prev + 1);
        setLiked(true);
      } else if (result.status === 'unliked') {
        setLikes((prev) => prev - 1);
        setLiked(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: spec.image_url }} style={styles.image} />
      <Text style={styles.pcName}>{spec.name}</Text>
      <Text style={styles.tag}>{spec.tag}</Text>
      <Text style={styles.price}>ราคา: {spec.price} บาท</Text>
      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleLike}>
          <Text style={[styles.likeText, liked && styles.liked]}>♡ {likes}</Text>
        </TouchableOpacity>
        <Text>🔖</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  pcName: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  tag: {
    color: '#666',
    marginBottom: 6,
  },
  price: {
    color: '#FF7F00',
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeText: {
    fontSize: 18,
    color: '#000',
  },
  liked: {
    color: 'red',
  },
});
