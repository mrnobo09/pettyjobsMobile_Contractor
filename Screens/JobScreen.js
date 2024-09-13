import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Image, ScrollView, Alert, TouchableOpacity, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import backendURL from '../config';
import axios from 'axios';

export default function JobScreen() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [jobType, setJobType] = useState('')
  const [criticality, setCriticality] = useState('')
  const [images, setImages] = useState([])

  const [loading, setLoading] = useState(false)

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!')
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const source = { uri: result.assets[0].uri }
      setImages([...images, source])
    }
  }

  const validateFields = () => {
    if (!title || !location || !description || !jobType || !criticality) {
      Alert.alert('Validation Error', 'All fields are required.')
      return false
    }
    if (images.length === 0) {
      Alert.alert('Validation Error', 'At least one photo is required.')
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setLoading(true);
      const formData = new FormData();

      formData.append('title', title)
      formData.append('location', location)
      formData.append('description', description)
      formData.append('jobType', jobType)
      formData.append('criticality', criticality)

      images.forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `job_image_${index}.jpg`,
        })
      })

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTU1OTk5LCJpYXQiOjE3MjU5NTExOTksImp0aSI6ImFlNGIzMjY4NjIwYTRjNzk5YTAwNDg2OGUxZjhmMWIzIiwidXNlcl9pZCI6Mn0._alqhZCoO3IGOIGDdoOPIpX7cltQIkUgt-tPMtJILmE'
        },
      };

      try {
        await axios.post(`${backendURL}/app/postJob/`, formData, config)

        setTitle('')
        setLocation('')
        setDescription('')
        setJobType('')
        setCriticality('')
        setImages([])

        Alert.alert('Success', 'Job created successfully!', [{ text: 'OK' }])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Job Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter job title"
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter location"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline={true}
        />

        <Text style={styles.label}>Job Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setJobType(value)}
          items={[
            { label: 'Civil', value: 'civil' },
            { label: 'Electrical', value: 'electrical' },
            { label: 'Mechanical', value: 'mechanical' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select job type', value: '' }}
        />

        <Text style={styles.label}>Criticality</Text>
        <RNPickerSelect
          onValueChange={(value) => setCriticality(value)}
          items={[
            { label: 'Low', value: 'low' },
            { label: 'Medium', value: 'medium' },
            { label: 'High', value: 'high' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select criticality', value: '' }}
        />

        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        <View style={styles.imagesContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={image} style={styles.image} />
              <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit Job</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    backgroundColor: '#ffffffe6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'black',
    fontSize: 12,
    lineHeight: 12,
  },
  button: {
    backgroundColor: '#0e2064',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});
