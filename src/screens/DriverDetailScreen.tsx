import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DriverDetailsScreen = ({ route }: any) => {
  const { driverId } = route.params;
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await axios.get(`https://ergast.com/api/f1/drivers/${driverId}.json`);
        setDriver(response.data.MRData.DriverTable.Drivers[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [driverId]);

  const handlePressUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

  const handlePressRaces = () => {
    navigation.navigate('Races', { driverId }); 
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {driver ? (
        <>
          <Text style={styles.driverName}>{driver.givenName} {driver.familyName}</Text>
          <Text style={styles.driverInfo}>Nationality: {driver.nationality}</Text>
          <Text style={styles.driverInfo}>Date of Birth: {driver.dateOfBirth}</Text>
          <TouchableOpacity onPress={() => handlePressUrl(driver.url)}>
            <Text style={styles.driverUrl}>More Info: {driver.url}</Text>
          </TouchableOpacity>
          <Text style={styles.driverInfo}>Driver ID: {driver.driverId}</Text>

          <TouchableOpacity style={styles.racesButton} onPress={handlePressRaces}>
            <Text style={styles.racesButtonText}>View Races</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>Driver not found</Text>
      )}
    </ScrollView>
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
    flexGrow: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  driverName: {
    color: '#d3d3d3',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  driverInfo: {
    color: '#d3d3d3',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  driverUrl: {
    color: '#1e90ff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff6666',
    fontSize: 18,
    textAlign: 'center',
  },
  racesButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: 'teal',
    borderRadius: 5,
    alignItems: 'center',
  },
  racesButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DriverDetailsScreen;
