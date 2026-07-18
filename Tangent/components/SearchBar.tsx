import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Colors } from "../constants/theme";
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
container: { paddingHorizontal: 16, paddingTop: 12,paddingBottom:12, backgroundColor: Colors.light.background },
input: {
  backgroundColor: Colors.light.surface,
  borderWidth: 1,
  borderColor: Colors.light.border,
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 10,
  fontSize: 16,
  fontFamily: "Karla_400Regular",
  color: Colors.light.text,
},
});

export default SearchBar;