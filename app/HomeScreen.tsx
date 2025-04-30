import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useEffect, useState, useLayoutEffect } from 'react';
import { getAllMeals } from '../src/api/mealDB';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [meals, setMeals] = useState<{ idMeal: string; strMeal: string; strMealThumb: string }[]>([]);
  const router = useRouter();
  const navigation = useNavigation();

  // Set header style
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Meal App',
      headerStyle: { backgroundColor: '#32cd32' }, // light green
      headerTintColor: '#000', // text color in header
    });
  }, [navigation]);

  useEffect(() => {
    async function fetchMeals() {
      const data = await getAllMeals();
      setMeals(data);
    }
    fetchMeals();
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push({ pathname: '/details/[idMeal]', params: { idMeal: item.idMeal } })}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{item.strMeal}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderItem}
      />

      <Link href="/AboutScreen" asChild>
        <TouchableOpacity style={styles.aboutLink}>
          <Ionicons name="information-circle-outline" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.aboutText}>About App</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#808000', 
    padding: 10 
  },
  card: { 
    marginBottom: 20, 
    backgroundColor: '#808000', 
    borderRadius: 10, 
    overflow: 'hidden' 
  },
  image: { 
    width: '100%', 
    height: 200 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    padding: 10 
  },
  aboutLink: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B5320',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  aboutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
