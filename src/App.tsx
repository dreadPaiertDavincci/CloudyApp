import { Dashboard } from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="app-main">
        <Dashboard />
      </div>
    </ErrorBoundary>
  );
}

export default App;
