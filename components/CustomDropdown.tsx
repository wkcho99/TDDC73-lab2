import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ListRenderItem, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  Text,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export interface DropdownProps {
  items: DropdownItemProps[];
  onSelect: (item: string) => void;
  initialDisplay?: string;
}
export interface DropdownItemProps {
  title?: string;
  id: string;
}

export const CustomDropdown = ({
  onSelect,
  items,
  initialDisplay,
}: DropdownProps) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<DropdownItemProps>();
  const onPress = (item: DropdownItemProps) => {
    onSelect(item.id);
    setSelected(item);
    setShow(false);
  };
  const renderItem: ListRenderItem<DropdownItemProps> = useCallback(
    ({ item, index }) => {
      return (
        <View
          style={StyleSheet.flatten([
            styles.dropdownItem,
            {
              borderTopWidth: index === 0 ? 0 : 1,
              borderBottomWidth: index === items.length - 1 ? 0 : 1,
            },
          ])}
        >
          <Pressable onPress={() => onPress(item)}>
            <Text>{item.title ?? item.id}</Text>
          </Pressable>
        </View>
      );
    },
    []
  );
  return (
    <View style={styles.container}>
      {show && (
        <View style={styles.list}>
          <FlatList<DropdownItemProps>
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, indx) => `${item.id}-${indx}`}
            extraData={selected}
          ></FlatList>
        </View>
      )}
      <View style={styles.dropdownButton}>
        <Pressable
          onPress={() => setShow((prev) => !prev)}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text>
            {(selected && (selected.title || selected.id)) || initialDisplay}
          </Text>
          <FontAwesome
            name={show ? "chevron-up" : "chevron-down"}
            color={"#444"}
            size={18}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    flexDirection: "column",
  },
  list: {
    borderColor: "black",
    borderWidth: 1,
    maxHeight: 250,
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    bottom: "100%",
  },
  dropdownButton: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  dropdownItem: {
    borderColor: "black",
    padding: 10,
  },
});
