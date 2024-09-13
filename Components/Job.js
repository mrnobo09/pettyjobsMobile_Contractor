import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getJob } from '../Actions/getJob';
import { useDispatch } from 'react-redux';

const statusColors = {
  waiting: '#b0b0b0',  // Grey
  rejected: '#9b0000', // Red
  inProgress: '#2b3970', // Blue
  completed: '#00934c', // Green
};

export default function Job(props) {
  const dispatch = useDispatch()
  const statusColor = statusColors[props.job.status] || '#b0b0b0'; // Default to grey if status is unknown
  const navigation = useNavigation()

  const viewJob = async() =>{
    await dispatch(getJob(props.job.id))
    navigation.navigate("View Job")
  }
  
  return (
    <TouchableOpacity onPress={viewJob}>
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri:`data:image/png;base64,${props.job.image}`}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{props.job.title}</Text>
        <Text style={styles.description} numberOfLines={1}>{props.job.description}</Text>
      </View>
      <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{props.job.status.charAt(0).toUpperCase() + props.job.status.slice(1)}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative', // Ensure status pill positioning works
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 2,
    marginRight: 80, // Space for status pill
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    flexShrink: 0, // Allow text to wrap and not overflow
    width:180

  },
  statusContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    minWidth: 100,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
