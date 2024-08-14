import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { useNavigation } from '@react-navigation/native';
import { fetchDrivers } from '../store/actions/driverActions';

const DriversScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { drivers, error } = useSelector((state: RootState) => state.drivers);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    loadDrivers();
  }, [page]);

  useEffect(() => {
    console.log('Current Page:', page);
    console.log('Loaded Drivers:', drivers);
  }, [page, drivers]);

  const loadDrivers = () => {
    setLoading(true);
    dispatch(fetchDrivers(page)).finally(() => setLoading(false));
  };

  const handleDriverPress = (driverId: string) => {
    navigation.navigate('DriverDetails', { driverId });
  };

  const loadMoreDrivers = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderDriver = useCallback(
    ({ item, index }: { item: any, index: number }) => {
      return (
        <TouchableOpacity onPress={() => handleDriverPress(item.driverId)} style={styles.driverItem}>
          <Text style={styles.driverText}>
            #{index + 1} - {item.givenName} {item.familyName} ID:{item.driverId}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleDriverPress]
  );

  const MemoizedRenderDriver = React.memo(renderDriver);

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drivers}
        renderItem={renderDriver}
        keyExtractor={(item) => item.driverId}
        onEndReached={loadMoreDrivers}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#ffffff" /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 10,
  },
  driverItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#282846',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverText: {
    color: '#d3d3d3',
    fontSize: 22,
  },
  errorText: {
    color: '#ff6666',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DriversScreen;
