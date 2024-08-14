import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RacesScreen = ({ route }: any) => {
  const { driverId } = route.params;
  const [races, setRaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get(`https://ergast.com/api/f1/drivers/${driverId}/results.json`);
        setRaces(response.data.MRData.RaceTable.Races);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [driverId]);

  const renderRace = ({ item }: { item: any }) => {

    return (
      <View style={styles.raceItem}>
        <Text style={styles.raceName}>{item.raceName}</Text>
        <Text style={styles.raceDate}>Date: {item.date}</Text>
        <Text style={styles.circuitName}>Circuit: {item.Circuit.circuitName}</Text>
        <Text style={styles.circuitLocation}>
          Location: {item.Circuit.Location.locality}, {item.Circuit.Location.country}
        </Text>
        
        <Text style={styles.resultHeader}>Results:</Text>
        {item.Results.map((result: any, index: number) => (
          <View key={index} style={styles.resultItem}>
            <Text style={styles.resultText}>Position: {result.position} (Grid: {result.grid})</Text>
            <Text style={styles.resultText}>Laps: {result.laps}</Text>
            <Text style={styles.resultText}>Status: {result.status}</Text>
            <Text style={styles.resultText}>Points: {result.points}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.linkText}>More Info: {item.url}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={races}
        renderItem={renderRace}
        keyExtractor={(item) => item.round.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  raceItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#282846',
    borderRadius: 5,
  },
  raceName: {
    color: '#d3d3d3',
    fontSize: 22,
    fontWeight: 'bold',
  },
  raceDate: {
    color: '#d3d3d3',
    fontSize: 18,
    marginTop: 5,
  },
  circuitName: {
    color: '#a9a9a9',
    fontSize: 18,
    marginTop: 5,
  },
  circuitLocation: {
    color: '#a9a9a9',
    fontSize: 16,
    marginTop: 5,
  },
  resultHeader: {
    color: '#d3d3d3',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  resultItem: {
    marginTop: 5,
  },
  resultText: {
    color: '#a9a9a9',
    fontSize: 16,
  },
  linkText: {
    color: '#1e90ff',
    fontSize: 16,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default RacesScreen;
