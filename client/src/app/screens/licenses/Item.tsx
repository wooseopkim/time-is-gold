import React from 'react';
import { StyleSheet, TextStyle, View } from 'react-native';
import openUrl from '../../linking/openUrl';
import { Body, Heading } from '../../primitives/typography';
import { fontSizeUnit } from '../../responsiveness';
import { Data } from './data';

export default function Item({ name, licenses, repository }: Data) {
  const onRepositoryPress = () => openUrl(repository);

  return (
    <View style={styles.container}>
      <Heading wordBreak="all" level={6} style={styles.name}>
        {name} ({licenses})
      </Heading>
      <Body
        wordBreak="all"
        style={styles.repository}
        onPress={onRepositoryPress}>
        {repository}
      </Body>
    </View>
  );
}

const text: TextStyle = {
  fontSize: fontSizeUnit * 1,
};
const styles = StyleSheet.create({
  container: {},
  name: {
    ...text,
  },
  repository: {
    ...text,
  },
  licenseUrl: {
    ...text,
  },
  licenses: {
    ...text,
  },
});
