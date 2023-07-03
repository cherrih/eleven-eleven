import {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions, Platform } from 'react-native';
import IntroductionPage from './components/IntroductionPage';
import PianoPage from './components/PianoPage';
import * as ScreenOrientation from "expo-screen-orientation";

const App = () => {
  const [currentPage, setCurrentPage] = useState('piano');
  const MIN_WIDTH_HORIZONTAL = 768;
  const [shouldLockLandscape, setShouldLockLandscape] = useState(Dimensions.get("window").width < MIN_WIDTH_HORIZONTAL);

  const handleButtonClick = () => {
    setCurrentPage('piano');
  };


  const handleBackPress = () => {
    setCurrentPage('introduction');
  };

  useEffect(() => {
    if (!Platform.OS === 'web') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      return;
    }
    const handleResize = ({window}) => {
      if (!shouldLockLandscape && window.width < MIN_WIDTH_HORIZONTAL) {
        setShouldLockLandscape(true);
      } else if (shouldLockLandscape && window.width >= MIN_WIDTH_HORIZONTAL) {
        setShouldLockLandscape(false);
      }
    }

    const subscription = Dimensions.addEventListener('change', handleResize);
    return () => subscription?.remove();
  });
  console.log(Platform.OS === 'web' && shouldLockLandscape)
  return (
    <View style={[styles.container, Platform.OS === 'web' && shouldLockLandscape && styles.rotateLandscape]}>
      {currentPage === 'introduction' && <IntroductionPage onButtonClick={handleButtonClick} />}
      {currentPage === 'piano' && <PianoPage onBackPress={handleBackPress} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  rotateLandscape: {
    transform: 'rotate(90deg)',
    transformOrigin: 'right top',
    width: '100vh',
    height: '100vw',
    overflow: 'hidden',
    position: 'absolute',
    top: '100%',
    right: 0,
  },
});

export default App;
