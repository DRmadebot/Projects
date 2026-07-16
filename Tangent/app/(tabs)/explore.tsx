import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import ArticleCard from "../../components/ArticleCard";
import { getBookmarks, removeBookmark } from "../../db/bookmarks";

import type { Article } from "../../services/types/article";

export default function ExploreScreen() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);

  useFocusEffect(
    useCallback(() => {
      setBookmarks(getBookmarks());
    }, [])
  );

  const handleToggleBookmark = (article: Article) => {
    removeBookmark(article.pageid);

    setBookmarks((prev) =>
      prev.filter((item) => item.pageid !== article.pageid)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bookmarks</Text>

      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.pageid.toString()}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            isBookmarked={true}
            onToggleBookmark={handleToggleBookmark}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
});