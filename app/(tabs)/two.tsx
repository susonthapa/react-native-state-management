import { Text, View } from '@/components/Themed';
import { createContext, useContext, useRef } from 'react';
import { Button, StyleSheet } from 'react-native';
import { create, useStore } from 'zustand';

interface CounterState {
  count: number,
  increment: () => void,
  decrement: () => void,
}

const createCounterStore = () => create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))

type CounterStore = ReturnType<typeof createCounterStore>
const CounterContext = createContext<CounterStore | null>(null)

function useCounterContext<T>(selector: (state: CounterState) => T): T {
  const store = useContext(CounterContext)
  if (!store) throw new Error('Missing CounterContext.Provider in the tree')
  return useStore(store, selector)
}

const Counter = () => {
  console.log(`Counter Rendering`);
  const count = useCounterContext(state => state.count)
  const increment = useCounterContext(state => state.increment)
  const decrement = useCounterContext(state => state.decrement)
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
      <Button title='Decrement' onPress={decrement} />
      <Text>Counter is {count}</Text>
      <Button title='Increment' onPress={increment} />
    </View>
  )
}

const CounterWithProvider = () => {
  const storeRef = useRef<CounterStore>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore()
  }
  return (
    <CounterContext.Provider value={storeRef.current}>
      <Counter />
    </CounterContext.Provider>
  )
}

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <CounterWithProvider />
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
