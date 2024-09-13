import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import backendURL from '../config';
import Job from '../Components/Job';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // const token = useSelector((state) => state.access);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTU1OTk5LCJpYXQiOjE3MjU5NTExOTksImp0aSI6ImFlNGIzMjY4NjIwYTRjNzk5YTAwNDg2OGUxZjhmMWIzIiwidXNlcl9pZCI6Mn0._alqhZCoO3IGOIGDdoOPIpX7cltQIkUgt-tPMtJILmE';
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
      'Accept': 'application/json',
    },
  };

  // Fetch history data
  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendURL}/app/history/`, config);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchHistory()
    });

    return unsubscribe
  }, [navigation])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0e2064" style={styles.loadingIndicator} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {history.map((value, index) => (
          <Job
            key={index}
            job={value}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
    padding: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 100,
    height: 100,
  },
});
