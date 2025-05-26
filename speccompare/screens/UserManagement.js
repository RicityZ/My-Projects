import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://10.0.2.2/speccompare-api/get-users-extended.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: searchQuery,
        role: roleFilter
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        } else {
          setUsers([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
        setLoading(false);
      });
  };

  // ✅ โหลดใหม่ทุกครั้งที่เข้าหน้า
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [searchQuery, roleFilter])
  );

  // ✅ กรองตาม role และ search
  React.useEffect(() => {
    let result = users;
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(user =>
        user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  const handleDelete = id => {
    Alert.alert(
      'ยืนยันการลบ',
      'คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?',
      [
        { text: 'ยกเลิก', style: 'cancel' },
        {
          text: 'ลบ',
          style: 'destructive',
          onPress: () => {
            setLoading(true);
            fetch('http://10.0.2.2/speccompare-api/delete-user.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id }),
            })
              .then(res => res.json())
              .then(data => {
                if (data.status === 'success') {
                  fetchUsers(); // รีโหลดหลังลบ
                } else {
                  Alert.alert('ลบไม่สำเร็จ', data.message);
                  setLoading(false);
                }
              })
              .catch(() => {
                Alert.alert('ผิดพลาด', 'ลบไม่สำเร็จ');
                setLoading(false);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEdit = user => {
    navigation.navigate('EditUser', { userData: user });
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? '#FF6B6B' : '#4ECDC4';
  };

  const getRoleName = (role) => {
    return role === 'admin' ? 'แอดมิน' : 'ผู้ใช้';
  };

  const getInitials = (user) => {
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3D8F" />
      <LinearGradient
        colors={['#1E3D8F', '#0F2D6F']}
        style={styles.headerGradient}
      >
        <Text style={styles.header}>จัดการผู้ใช้งาน</Text>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="ค้นหาชื่อหรืออีเมล์"
            placeholderTextColor="#888"
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, roleFilter === 'all' && styles.filterActive]}
            onPress={() => setRoleFilter('all')}
          >
            <Text style={[styles.filterText, roleFilter === 'all' && styles.filterTextActive]}>ทั้งหมด</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, roleFilter === 'admin' && styles.filterActive]}
            onPress={() => setRoleFilter('admin')}
          >
            <Text style={[styles.filterText, roleFilter === 'admin' && styles.filterTextActive]}>แอดมิน</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterButton, roleFilter === 'user' && styles.filterActive]}
            onPress={() => setRoleFilter('user')}
          >
            <Text style={[styles.filterText, roleFilter === 'user' && styles.filterTextActive]}>ผู้ใช้</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FDB813" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>ไม่พบรายการผู้ใช้</Text>
            </View>
          ) : (
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {filteredUsers.map((user, index) => (
                <View key={user.id} style={styles.card}>
                  <View style={styles.cardLeft}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarText}>{getInitials(user)}</Text>
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
                      <Text style={styles.userEmail}>{user.email}</Text>
                      <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                        <Text style={styles.roleText}>{getRoleName(user.role)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity onPress={() => handleEdit(user)} style={styles.editButton}>
                      <Text style={styles.buttonText}>✏️</Text>
                    </TouchableOpacity>
                    {user.role !== 'admin' && (
                      <TouchableOpacity onPress={() => handleDelete(user.id)} style={styles.deleteButton}>
                        <Text style={styles.buttonText}>❌</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
              <View style={styles.footer} />
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerGradient: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  header: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 40,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterActive: {
    backgroundColor: '#FDB813',
  },
  filterText: {
    color: 'white',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#1E3D8F',
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FDB813',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#1E3D8F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 6,
  },
  roleBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 36,
    height: 36,
    backgroundColor: '#1E3D8F',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 36,
    height: 36,
    backgroundColor: '#FF6B6B',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
  footer: {
    height: 20,
  },
});