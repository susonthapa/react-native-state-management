import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';

export default function TabOneScreen() {
  const [count, setCount] = useState(0)
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Button title='Decrement' onPress={() => {
          setCount((count) => count - 1)
        }} />
        <Text>The Count is {count}</Text>
        <Button title='Increment' onPress={() => {
          setCount((count) => count + 1)
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
