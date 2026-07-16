import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import logo from "../../assets/images/logoTangent.png";
import ArticleCard from "../../components/ArticleCard";
import { addBookmark, getBookmarkedIds, removeBookmark } from "../../db/bookmarks";
import { getInitialFeed, loadMore } from "../../services/feed";
import type { Article } from "../../services/types/article";



const HomeScreen = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [buffer, setBuffer] = useState<Article[]>([]);
  const loadingRef = useRef(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  useFocusEffect(
    useCallback(() => {
      setBookmarkedIds(getBookmarkedIds());
    }, [])
  );

  useEffect(() => {
    const getArticle = async () => {
      try {
        const [initialArticles, initialBuffer] = await Promise.all([
          getInitialFeed(20),
          loadMore(20),
        ]);

        const initialIds = new Set(initialArticles.map((a) => a.pageid));
        const cleanBuffer = initialBuffer.filter((a) => !initialIds.has(a.pageid));

        setArticles(initialArticles);
        setBuffer(cleanBuffer);

      } catch (error) {
        console.log(error);
      } finally {
        setInitialLoading(false);
      }
    };

    getArticle();
  }, []);


  const MAX_ARTICLES = 1000;

  const handleToggleBookmark = useCallback((article: Article) => {
    const isCurrentlyBookmarked = bookmarkedIds.has(article.pageid);

    if (isCurrentlyBookmarked) {
      removeBookmark(article.pageid);

      setBookmarkedIds((prev) => {
        const updated = new Set(prev);
        updated.delete(article.pageid);
        return updated;
      });
    } else {
      addBookmark(article);

      setBookmarkedIds((prev) => {
        const updated = new Set(prev);
        updated.add(article.pageid);
        return updated;
      });
    }
  },[]);



  const loadAnotherArticle = async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const articlesToAdd = buffer.length
        ? buffer
        : await loadMore(10);

      const newBufferPromise = loadMore(10);

      setArticles(prev => {
        const updated = [...prev, ...articlesToAdd];

        if (updated.length <= MAX_ARTICLES) {
          return updated;
        }

        // Remove the oldest articles
        return updated.slice(updated.length - MAX_ARTICLES);
      });

      const newBuffer = await newBufferPromise;
      setBuffer(newBuffer);
    } catch (error) {
      console.log(error);
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  };


  const renderItem = useCallback(
    ({ item }: { item: Article }) => (
      <ArticleCard
        article={item}
        isBookmarked={bookmarkedIds.has(item.pageid)}
        onToggleBookmark={handleToggleBookmark}
      />
    ),
    [bookmarkedIds, handleToggleBookmark]
  );

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={logo}
          style={styles.logo}
        />
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
          renderItem={ renderItem }
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
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
});


export default HomeScreen;