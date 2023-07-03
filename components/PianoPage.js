import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Platform } from 'react-native';

const PianoPage = ({ navigation }) => {
  const [activeKeys, setActiveKeys] = useState([]);
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
    "%2BC",
    "%2BDb",
    "%2BD",
    "%2BEb",
    "%2BE"
  ];


  const renderPianoKey = (key, isBlackKey) => {
    const {
      blackKey, activeKey, whiteKey
    } = styles;
    const keyStyle = isBlackKey ? blackKey : whiteKey;
    const isActive = activeKeys.includes(key);

    const touchEvents = Platform.OS === 'web'
      ? {
          onMouseDown: () => handleKeyPressIn(key),
          onMouseUp: () => handleKeyPressOut(key),
          onMouseEnter: () => handleMouseEnter(key),
          onMouseLeave: () => handleMouseLeave(key),
        }
      : {
          onPressIn: () => handleKeyPressIn(key),
          onPressOut: () => handleKeyPressOut(key),
        };

    return (
      <TouchableHighlight
        key={key}
        style={[keyStyle, isActive && activeKey]}
        {...touchEvents}
      >
        <Text style={styles.keyText}>{key}</Text>
      </TouchableHighlight>
    );
  };

  const activateKey = (key) => {

  }

  const deactivateKey = (key) => {

  }

  const handleKeyPressIn = (key) => {
    console.log("PRESS")
    setActiveKeys((prevKeys) => [...prevKeys, key]);
  };

  const handleKeyPressOut = () => {
    console.log("PRESS OUT")
    setActiveKeys([]);
  };

  const handleMouseEnter = (key) => {
    if (activeKeys.length === 1 && activeKeys[0] !== key) {
      setActiveKeys([key]);
    }
  };

  const handleMouseLeave = (key) => {
    if (activeKeys.length === 1 && activeKeys[0] === key) {
      setActiveKeys([]);
    }
  };

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
      <View style={styles.pianoContainer}>
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
  whiteKey: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderTopWidth: 2,
    borderRightWidth: 1,
  },
  blackKey: {
    flex: 1,
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
  },
});

export default PianoPage;
