import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IntroductionPage = ({ onButtonClick }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Introduction Page</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Piano" onPress={onButtonClick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#100130',
  },
  buttonContainer: {
    marginLeft: 20,
  },
});

export default IntroductionPage;
