import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Dimensions, Button } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';
import JobStatusProgress from '../../Components/JobStatusProgress';
import axios from 'axios'
import { TouchableOpacity } from 'react-native';
import backendURL from '../../config';
import getJob from '../../Actions/getJob'
import { useNavigation } from '@react-navigation/native';

const getImage = (images) => {
    return images.map((value) => `data:image/jpeg;base64,${value.image_data}`);
};

const ViewJobScreen = () => {
  const jobData = useSelector((state)=>state.getJob);
  const navigation = useNavigation()
  const jobDetails = {
    id: jobData.id,
    title: jobData.title,
    images: getImage(jobData.images),
    status: jobData.status,
    description: jobData.description,
    approvedBy: jobData.approved_by ? jobData.approved_by.full_name : false,
    acceptedBy: jobData.accepted_by ? jobData.approved_by.full_name : false,
    dateUploaded: jobData.uploaded_at,
    dateApproved: jobData.approved_at,
    dateAccepted: jobData.accepted_at,
  };
  

  //const conditionalMargin = (jobDetails.status == 'review') ? marginBottom = 200:marginBottom = 0
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = useState(0);
  const len = jobDetails.images.length;

  const handleJobApproval = (approved) => {
    navigation.navigate('Rating')
}


  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{jobDetails.title}</Text>

        <View style={styles.carouselContainer}>
          <Carousel
            width={width}
            height={250}
            data={jobDetails.images}
            loop={false}
            pagingEnabled
            scrollAnimationDuration={500}
            onSnapToItem={(index) => setCurrentIndex(index)}
            renderItem={({ index, item }) => (
              <View style={styles.carouselItem}>
                <Image source={{ uri: item }} style={styles.image} />
                <Text style={styles.index}>{index + 1} / {jobDetails.images.length}</Text>
              </View>
            )}
          />
        </View>

        {/* Job Status Section */}
        <View style={styles.statusBox}>
          <Text style={styles.label}>Status:</Text>
          <JobStatusProgress currentStatus={jobDetails.status} />
        </View>

        {/* Job Description Section */}
        <View style={styles.descriptionBox}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{jobDetails.description}</Text>
        </View>

        {/* Approved by and Contractor Section */}
        {(jobDetails.approvedBy || jobDetails.acceptedBy) && (
          <View style={styles.approvalBox}>
            {jobDetails.approvedBy && (
              <View style={styles.splitBox}>
                <Text style={styles.label}>Approved by:</Text>
                <Text style={styles.text}>{jobDetails.approvedBy}</Text>
              </View>
            )}
            {jobDetails.acceptedBy && (
              <View style={styles.splitBox}>
                <Text style={styles.label}>Contractor:</Text>
                <Text style={styles.text}>{jobDetails.acceptedBy}</Text>
              </View>
            )}
          </View>
        )}

        {/* Uploaded at and Accepted at Section */}
        <View style={styles.approvalBox}>
          <View style={styles.splitBox}>
            <Text style={styles.label}>Uploaded at:</Text>
            <Text style={styles.text}>{new Date(jobDetails.dateUploaded).toLocaleString()}</Text>
          </View>
          <View style={styles.splitBox}>
            <Text style={styles.label}>Accepted at:</Text>
            <Text style={styles.text}>{new Date(jobDetails.dateAccepted).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Box for Accept/Reject Buttons (visible only if status is "review") */}
      {jobDetails.status === 'review' && (
        <View style={styles.bottomBox}>
        <Text>Satisfied By The Job?</Text>
            <View style={{flex:1,flexDirection:'row',gap:5,}}>
                <TouchableOpacity style={[styles.bottomBoxButton,{backgroundColor:'#002667'}]} onPress={()=>handleJobApproval()}><Text style={{color:'#ffffff'}}>Review</Text></TouchableOpacity>
            </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageIndex: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
    position: 'absolute',
    alignSelf: 'center',
    top: 230,
  },
  carouselContainer: {
    flex: 1,
    alignSelf: 'center',
    margin: 10,
  },
  carouselItem: {
    alignItems: 'center',
  },
  image: {
    width: '98%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  index: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 15,
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#606160',
    color: '#ffffff',
    borderRadius: 25,
  },
  statusBox: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginVertical: 10,
  },
  descriptionBox: {
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginVertical: 10,
  },
  approvalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginVertical: 10,
  },
  splitBox: {
    flex: 1,
    paddingRight: 10,
  },
  bottomBox: {
    flex:1,
    gap:15,
    position: 'absolute',
    alignItems:"center",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 16,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    backgroundColor: '#ffffff',
    elevation:5,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
  },
  bottomBoxButton:{
    alignItems:"center",
    gap:1,
    justifyContent:'center',
    width:155,
    height:40,
    borderRadius:10,
  }
});

export default ViewJobScreen;
