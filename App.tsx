import React, { useState, createContext, useMemo } from 'react';
import type { Notebook } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import StudyView from './components/StudyView';

interface AppContextType {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<React.SetStateAction<Notebook[]>>;
  activeNotebookId: string | null;
  setActiveNotebookId: React.Dispatch<React.SetStateAction<string | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | null>(null);

const App: React.FC = () => {
  const [notebooks, setNotebooks] = useLocalStorage<Notebook[]>('range-rider-notebooks', []);
  const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const contextValue = useMemo(() => ({
    notebooks,
    setNotebooks,
    activeNotebookId,
    setActiveNotebookId,
    searchTerm,
    setSearchTerm,
  }), [notebooks, setNotebooks, activeNotebookId, setActiveNotebookId, searchTerm, setSearchTerm]);

  return (
    <AppContext.Provider value={contextValue}>
      <div className="flex h-screen font-sans bg-gray-900 text-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <StudyView />
        </main>
      </div>
    </AppContext.Provider>
  );
};

export default App;
