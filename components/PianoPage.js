import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import Sound from 'react-native-sound';

const PianoPage = ({ navigation }) => {
  const [activeKeys, setActiveKeys] = useState([]);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const dataNotes = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
    "+C",
    "+Db",
    "+D",
    "+Eb",
    "+E"
  ];

  const playKeySound = (key) => {
    const soundFilePath = `assets/sounds/${key}.wav`;
    const keySound = new Sound(soundFilePath, Sound.MAIN_BUNDLE);
    keySound.play((success) => {
      if (success) {
        // Playback successful
        keySound.release();
      } else {
        // Error occurred during playback
        console.warn('Error playing key sound');
      }
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const key = getKeyFromEvent(evt);
      activateKey(key);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const key = getKeyFromEvent(evt);
      deactivateKey(key);
    },
    onPanResponderMove: (evt, gestureState) => {
      const key = getKeyFromEvent(evt);
      const isPressing = isPressingKey(evt);
      if (isPressing) {
        activateKey(key);
      } else {
        deactivateKey(key);
      }
    },
  });

  const getKeyFromEvent = (evt) => {
    // Get the key from the event
    // Modify this based on your actual implementation
    return evt.target.getAttribute('data-key');
  };

  const isPressingKey = (evt) => {
    // Check if the user is pressing on the key
    // Modify this based on your actual implementation
    return evt.target.getAttribute('data-pressing') === 'true';
  };

  const renderPianoKey = (key, isBlackKey) => {
    const {
      blackKey, activeKey, whiteKey, keyBase
    } = styles;
    const keyStyle = isBlackKey ? blackKey : whiteKey;
    const isActive = activeKeys.includes(key);

    const touchEvents = {
      onMouseDown: () => handleMouseDown(key),
      onMouseUp: () => handleMouseUp(key),
      onMouseEnter: () => handleMouseEnter(key),
      onMouseLeave: () => handleMouseLeave(key),
      onPressIn: () => activateKey(key),
      onPressOut: () => deactivateKey(key),
    };

    return (
      <TouchableOpacity
        key={key}
        {...touchEvents}
        style={[keyBase, keyStyle, isActive && activeKey]}
        activeOpacity={1}
        >
          <Text style={styles.keyText}>{key}</Text>
      </TouchableOpacity>
    );
  };

  const activateKey = (key) => {
    if (activeKeys.includes(key)) return;
    setActiveKeys((prevKeys) => [...prevKeys, key]);
    playKeySound(key);
  }

  const deactivateKey = (key) => {
    setActiveKeys((prevKeys) => prevKeys.filter((k) => k !== key));
  }
  const handleMouseDown = (key) => {
    setMouseIsDown(true);
    activateKey(key);
  }

  const handleMouseUp = (key) => {
    setMouseIsDown(false);
    deactivateKey(key);
  }

  const handleMouseEnter = (key) => {
    if (mouseIsDown) {
      activateKey(key);
    }
  };

  const handleMouseLeave = (key) => {
    if (mouseIsDown) {
      deactivateKey(key);
    }
  }

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.navigationButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Add friend')}>
          <Text style={styles.navigationButton}>Add friend</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Menu')}>
          <Text style={styles.navigationButton}>Menu</Text>
        </TouchableOpacity>
      </View>

      {/* Piano Keyboard */}
      <View style={styles.pianoContainer} {...panResponder.panHandlers}>
        {dataNotes.map(note =>
          renderPianoKey(note, note.includes('b'))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  navigationButton: {
    color: '#FF7A00',
    fontSize: 16,
  },
  pianoContainer: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
  },
  keyBase: {
    flex: 1,
  },
  whiteKey: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 2,
    borderRightWidth: 1,
    backgroundColor: "#FFF"
  },
  blackKey: {
    backgroundColor: '#000',
    zIndex: 1,
  },
  activeKey: {
    backgroundColor: '#FF7A00',
  },
  keyText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    pointerEvents: 'none'
  },
});

export default PianoPage;
