import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import ArticleCard from "../../components/ArticleCard";
import { Colors } from "../../constants/theme";
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

  if(bookmarks.length==0){
    return(
      <View style={styles.emptyContainer}>
        <MaterialIcons
          name="bookmark-border"
          size={64}
          color="#22223b"
        />

        <Text style={styles.emptyTitle}>
          No bookmarks yet
        </Text>

        <Text style={styles.emptyText}>
          Articles you bookmark will appear here.
        </Text>
      </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.light.background,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 16,
  },

  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    color: "#666",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
});