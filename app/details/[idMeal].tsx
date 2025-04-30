import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";

export default function DetailScreen() {
  const { idMeal } = useLocalSearchParams();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (idMeal) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then((res) => res.json())
        .then((data) => {
          setMeal(data.meals[0]);
          setLoading(false);
        });
    }
  }, [idMeal]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#808000' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#808000' }}>
        <Text>Data tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#808000' }}>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{ width: "100%", height: 200, borderRadius: 8, marginBottom: 16 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8, color: '#fff' }}>
        {meal.strMeal}
      </Text>
      <Text style={{ fontSize: 16, color: "#ccc", marginBottom: 8 }}>
        {meal.strCategory} - {meal.strArea}
      </Text>
      <Text style={{ fontSize: 18, color: '#fff', marginBottom: 16 }}>
        {meal.strInstructions}
      </Text>
    </ScrollView>
  );
}
