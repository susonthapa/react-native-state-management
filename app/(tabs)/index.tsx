import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Provider, atom, useAtom, useAtomValue } from 'jotai';

const countAtom = atom(0)
const multiplierAtom = atom((get) => {
  const count = get(countAtom)
  return count * 10
})

const Counter = () => {
  const [count, setCount] = useAtom(countAtom)
  const multiplierCount = useAtomValue(multiplierAtom)
  return (
      <View>
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
        <Text>Multiplied Count: {multiplierCount}</Text>
      </View>
  )
}

const CounterWithProvider = () => {
  return (
    <Provider>
      <Counter />
    </Provider>
  )
}

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <CounterWithProvider />
      <CounterWithProvider />
      <CounterWithProvider />
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
