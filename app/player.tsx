import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import { useEvent } from 'expo';

import ImageViewer from "@/components/ImageViewer";
import MovieSection from "@/components/MovieSection";
import { type Movie, fallbackMovie } from "@/utils/mock-data";
import { useCallback, useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import YoutubePlayer from "react-native-youtube-iframe";

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function MovieDetails() {
const { id } = useLocalSearchParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie>(fallbackMovie);

  useEffect(() => {
    Storage.getData().then((data) => {
      const foundMovie = data.find((movie: Movie) => movie.id === parseInt(id));
      setMovie(foundMovie);
    });
    
  }, [id]);

  
  const onStateChange = useCallback((state:any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);
  const [playing, setPlaying] = useState(true);
  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={movie.videoSource}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
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
