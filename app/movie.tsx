import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function MovieDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage}/>
      </View>
      <View style={styles.footerContainer}>
        <Button href="./player" theme="primary" label='Play movie'/>
        <Button href="./player" label='Add to library'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex:1
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
});