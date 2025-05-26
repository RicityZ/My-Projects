import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function CustomHeader({ name }) {
  return (
    <View style={styles.header}>
        
      <TouchableOpacity>
        <Text style={styles.menuIcon}>≡</Text>
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <Text style={styles.username}>{name}</Text>
        <Image source={require('../assets/user.png')} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#173B7A',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: { color: '#fff', fontSize: 24 },
  username: { color: '#fff', fontSize: 16, marginRight: 8 },
  avatar: { width: 35, height: 35, borderRadius: 18 },
});
