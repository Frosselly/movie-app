import { Link, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { useEvent } from "expo";

import ImageViewer from "@/components/ImageViewer";
import MovieSection from "@/components/MovieSection";
import { type Movie, fallbackMovie } from "@/utils/mock-data";
import { useCallback, useEffect, useState } from "react";
import { Storage } from "@/utils/storage";
import YoutubePlayer from "react-native-youtube-iframe";
import LoadingScreen from "@/components/LoadingScreen";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export default function MovieDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [movie, setMovie] = useState<Movie>(fallbackMovie);

  useEffect(() => {
    Storage.getData(id).then((data) => {
      setMovie(data);
    });
  }, [id]);

  if (!movie) {
    return (
      <View>
        <LoadingScreen />
      </View>
    );
  }

  const onStateChange = useCallback((state: any) => {
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
    <View style={styles.contentContainer}>
      {movie.videoSource ? (
        <>
          <YoutubePlayer
            height={200}
            play={playing}
            videoId={movie.videoSource}
            onChangeState={onStateChange}
          />
          <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
        </>
      ) : (
        <ImageViewer imgSource={fallbackMovie.imgSource} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    gap: 20,
    backgroundColor: "#25292e",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
