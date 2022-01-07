import React from 'react';
import { FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from './data';
import Item from './Item';

export default function LicensesScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={props => <Item {...props.item} />}
        keyExtractor={x => x.name}
      />
    </SafeAreaView>
  );
}
