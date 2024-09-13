import { AirbnbRating } from "react-native-ratings";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import axios from "axios";
import backendURL from "../../config";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function RatingScreen() {
    const job_id = useSelector((state) => state.getJob.id);
    const navigation = useNavigation()
    const [ratings, setRatings] = useState({
        overall_satisfaction: 0,
        cleanliness: 0,
        functionality: 0,
        safety: 0,
        appearance: 0
    });
    
    const [loading, setLoading] = useState(false);

    const updateRating = (value, key) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        setLoading(true);
        Alert.alert(
            "Confirm Submission",
            "Are you sure you want to submit your ratings?",
            [
                { text: "No", onPress: () => setLoading(false), style: "cancel" },
                { text: "Yes", onPress: submitRatings }
            ]
        );
    };

    const submitRatings = async () => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NTU1OTk5LCJpYXQiOjE3MjU5NTExOTksImp0aSI6ImFlNGIzMjY4NjIwYTRjNzk5YTAwNDg2OGUxZjhmMWIzIiwidXNlcl9pZCI6Mn0._alqhZCoO3IGOIGDdoOPIpX7cltQIkUgt-tPMtJILmE';
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            };
    
            const body = {
                job_id: job_id,
                rating: ratings,
                approved: true,
            };
    
            // Send POST request
            const response = await axios.post(`${backendURL}/app/accept_or_reject_reviewed_job_as_worker/`, body, config);
    
            if (response.status === 202) {
                Alert.alert("Success", "Job Successfully Approved!");
                navigation.navigate('History')
            } else {
                Alert.alert("Error", "There was an issue approving the job.");
            }
            
        } catch (error) {
            console.error("Error submitting ratings:", error);
            Alert.alert("Error", "Job Approval Failed");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <ScrollView style={style.container}>
            <View style={[style.ratingContainer, { marginTop: 20 }]}>
                <Text style={{ fontSize: 20 }}>Overall Satisfaction</Text>
                <AirbnbRating
                    size={40}
                    reviewSize={20}
                    reviewColor="#002667"
                    selectedColor="#002667"
                    onFinishRating={(value) => updateRating(value, "overall_satisfaction")}
                />
                <Text>How satisfied are you with the finished work?</Text>
            </View>
            <View style={style.ratingContainer}>
                <Text style={{ fontSize: 20 }}>Cleanliness</Text>
                <AirbnbRating
                    size={40}
                    reviewSize={20}
                    reviewColor="#002667"
                    selectedColor="#002667"
                    onFinishRating={(value) => updateRating(value, "cleanliness")}
                />
                <Text>Was the work area left clean and tidy?</Text>
            </View>
            <View style={style.ratingContainer}>
                <Text style={{ fontSize: 20 }}>Functionality</Text>
                <AirbnbRating
                    size={40}
                    reviewSize={20}
                    reviewColor="#002667"
                    selectedColor="#002667"
                    onFinishRating={(value) => updateRating(value, "functionality")}
                />
                <Text>Is the job functioning as expected?</Text>
            </View>
            <View style={style.ratingContainer}>
                <Text style={{ fontSize: 20 }}>Safety</Text>
                <AirbnbRating
                    size={40}
                    reviewSize={20}
                    reviewColor="#002667"
                    selectedColor="#002667"
                    onFinishRating={(value) => updateRating(value, "safety")}
                />
                <Text>Does the work adhere to safety protocols?</Text>
            </View>
            <View style={style.ratingContainer}>
                <Text style={{ fontSize: 20 }}>Appearance</Text>
                <AirbnbRating
                    size={40}
                    reviewSize={20}
                    reviewColor="#002667"
                    selectedColor="#002667"
                    onFinishRating={(value) => updateRating(value, "appearance")}
                />
                <Text>Does the work look aesthetically pleasing?</Text>
            </View>
            <View style={{ margin: 20 }}>
                <TouchableOpacity style={style.button} onPress={handleSubmit}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={style.buttonText}>Submit</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    ratingContainer: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#ffffff",
        borderRadius: 20,
        elevation: 4,
        margin: 10,
        gap: 2,
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
