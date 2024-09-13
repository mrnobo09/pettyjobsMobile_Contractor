import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const JobStatusProgress = ({ currentStatus }) => {
    
  const statuses = ['waiting', 'in_progress','review','final','completed'];
  const statusText = ['Waiting', 'In Progress','Review','Final', 'Completed'];

  const statusIndex = statuses.indexOf(currentStatus);

  return (
    <View style={styles.container}>
      {statuses.map((status, index) => {
        const isCompleted = index === statuses.length - 1 && statusIndex === statuses.length - 1;
        const isBlue = index <= statusIndex && !isCompleted; // Blue for waiting and in progress
        const isCompleted_line = index <= statusIndex - 1;
        const isLast = index === statuses.length - 1;

        return (
          <View key={index} style={styles.itemContainer}>
            <View style={[styles.dot, isCompleted ? styles.completedDot : (isBlue && styles.blueDot)]} />
            {!isLast && (
              <View
                style={[
                  styles.line,
                  isCompleted_line ? (isCompleted ? styles.completedLine : styles.blueLine) : styles.incompleteLine,
                ]}
              />
            )}
            <Text style={[styles.statusText, isCompleted ? styles.completedText : (isBlue && styles.blueText)]}>
              {statusText[index]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d3d3d3', // gray for incomplete
  },
  blueDot: {
    backgroundColor: '#002667', // blue for in-progress
  },
  completedDot: {
    backgroundColor: '#4caf50', // green for completed
  },
  line: {
    height: 2,
    width: '100%',
    backgroundColor: '#d3d3d3', // gray for incomplete
    position: 'absolute',
    top: 9, // Align with the center of the dots
    left: '50%',
    right: '50%',
    zIndex: -1,
  },
  blueLine: {
    backgroundColor: '#002667', // blue for in-progress line
  },
  completedLine: {
    backgroundColor: '#4caf50', // green for completed line
  },
  incompleteLine: {
    backgroundColor: '#d3d3d3', // gray for incomplete
  },
  statusText: {
    marginTop: 8,
    fontSize: 12,
    color: '#d3d3d3',
  },
  blueText: {
    color: '#002667', // blue text for in-progress
  },
  completedText: {
    color: '#4caf50', // green for completed
  },
});

export default JobStatusProgress;
