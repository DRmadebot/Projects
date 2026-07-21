import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { clearArticles, getAllArticles } from "../db/articles";
import { getBookmarks } from "../db/bookmarks";

export default function DebugScreen() {
  if (!__DEV__) {
    return null; // or redirect: <Redirect href="/" />
  }
  const [articles, setArticles] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const refresh = useCallback(() => {
    setArticles(getAllArticles());
    setBookmarks(getBookmarks());
  }, []);

  useFocusEffect(refresh);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Articles ({articles.length})</Text>
      {articles.map((a) => (
        <Text key={a.pageid} style={styles.row}>
          {a.pageid} — {a.title} ({a.cached_date}){a.image ? " 🖼️" : ""}
        </Text>
      ))}

      <Text style={styles.heading}>Bookmarks ({bookmarks.length})</Text>
      {bookmarks.map((b) => (
        <Text key={b.pageid} style={styles.row}>
          {b.pageid} — {b.title}
        </Text>
      ))}

      <View style={styles.buttonRow}>
        <Button
          title="Wipe database"
          color="crimson"
          onPress={() => {
            clearArticles();
            refresh();
          }}
        />
        <View style={{ height: 12 }} />
        <Button title="Refresh" onPress={refresh} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  heading: { fontSize: 20, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  row: { fontSize: 13, marginBottom: 4, color: "#333" },
  buttonRow: { marginTop: 24, marginBottom: 48 },
});