import { View, Text, StyleSheet, FlatList,Button, ActivityIndicator  } from "react-native";
import { useEffect,useRef, useState } from "react";
import ArticleCard from "../../components/ArticleCard";
import type {Article} from "../../services/types/article"
import { fetchRandomArticle } from "../../services/wikipedia";
import { fetchArticles } from "../../services/wikipedia";



const HomeScreen = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [buffer, setBuffer] = useState<Article[]>([]);
  const loadingRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      try {
        const [initialArticles, initialBuffer] = await Promise.all([
          fetchArticles(5),
          fetchArticles(5),
        ]);

        setArticles(initialArticles);
        setBuffer(initialBuffer);

      } catch (error) {
        console.log(error);
      } finally {
        setInitialLoading(false);
      }
    };

    getArticle();
  }, []);



  const loadAnotherArticle = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const articlesToAdd = buffer.length
        ? buffer
        : await fetchArticles(5);

      const newBufferPromise = fetchArticles(5);

      setArticles((prev) => [
        ...prev,
        ...articlesToAdd,
      ]);

      const newBuffer = await newBufferPromise;
      setBuffer(newBuffer);
    } catch (error) {
      console.log(error);
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  };


  if (initialLoading) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.logo}>Tangent</Text>
      <ActivityIndicator size="large" />
      <Text>Loading knowledge...</Text>
    </View>
  );
  }
  else{
    return (
      <View style={styles.container}>

        <FlatList
          data={articles}
          renderItem={({ item }) => <ArticleCard article={item} />}
          keyExtractor={(item) => item.pageid?.toString() ?? item.title}
          onEndReachedThreshold={0.8}
          onEndReached={loadAnotherArticle}
          ListFooterComponent={loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  loadingContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f3f4f6",
  },

  logo: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
});


export default HomeScreen;