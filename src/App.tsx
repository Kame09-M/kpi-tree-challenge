import { useEffect } from 'react';
import { useGameStore } from './store/gameStore';
import { LearnScreen } from './screens/LearnScreen';
import { StartScreen } from './screens/StartScreen';
import { ScenarioScreen } from './screens/ScenarioScreen';
import { TreeScreen } from './screens/TreeScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';

function App() {
  const { screen, loadResults } = useGameStore();

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <>
      {screen === 'learn' && <LearnScreen />}
      {screen === 'start' && <StartScreen />}
      {screen === 'scenario' && <ScenarioScreen />}
      {screen === 'tree' && <TreeScreen />}
      {screen === 'feedback' && <FeedbackScreen />}
    </>
  );
}

export default App;
