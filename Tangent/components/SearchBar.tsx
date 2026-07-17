import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search articles you've seen..."
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          onSearch(text);
        }}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: "#f3f4f6" },
  input: { backgroundColor: "white", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16 },
});

export default SearchBar;