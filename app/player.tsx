import { Link } from "expo-router";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

import ImageViewer from "@/components/ImageViewer";
import MovieSection from "@/components/MovieSection";

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function MovieDetails() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });


  return (
    <View style={styles.contentContainer}>
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
        <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
