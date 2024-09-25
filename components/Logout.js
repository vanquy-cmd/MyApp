import React, { useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../src/firebase';
import { signOut } from 'firebase/auth';

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn đăng xuất?', [
      {
        text: 'Hủy',
        style: 'cancel',
      },
      {
        text: 'Đăng xuất',
        onPress: async () => {
          setLoading(true);
          try {
            await signOut(auth);
            Alert.alert('Đăng xuất thành công');
          } catch (error) {
            Alert.alert('Lỗi', error.message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title={loading ? "Đang đăng xuất..." : "Đăng xuất"} onPress={handleLogout} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default Logout;