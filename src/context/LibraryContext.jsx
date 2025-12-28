import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [folders, setFolders] = useState(() => {
    const stored = localStorage.getItem('prisma_folders');
    return stored ? JSON.parse(stored) : [
      { id: 'f1', name: 'AP Human Geography', kitIds: ['1'] },
      { id: 'f2', name: 'AP Biology', kitIds: ['2'] },
      { id: 'f3', name: 'Fall Semester - AP US History', kitIds: ['3'] }
    ];
  });

  const [kits, setKits] = useState(() => {
    const stored = localStorage.getItem('prisma_kits');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        title: 'Population Transitions',
        folderId: 'f1',
        lastAccessed: new Date('2025-12-27T10:00:00'),
        sources: ['curriculum'],
        progress: 65,
        content: {
          textData: '',
          unitMapping: { subject: 'AP Human Geography', unit: 'Unit 2: Population and Migration Patterns and Processes' },
          videoUrls: []
        }
      },
      {
        id: '2',
        title: 'Cellular Energetics Master',
        folderId: 'f2',
        lastAccessed: new Date('2025-12-27T14:30:00'),
        sources: ['curriculum', 'youtube'],
        progress: 82,
        content: {
          textData: '',
          unitMapping: { subject: 'AP Biology', unit: 'Unit 3: Cellular Energetics' },
          videoUrls: ['https://youtube.com/watch?v=0001']
        }
      },
      {
        id: '3',
        title: 'The Cold War Era',
        folderId: 'f3',
        lastAccessed: new Date('2025-12-26T09:00:00'),
        sources: ['manual'],
        progress: 42,
        content: {
          textData: 'Analysis of geopolitical tensions post-WWII...',
          unitMapping: null,
          videoUrls: []
        }
      }
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('prisma_folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('prisma_kits', JSON.stringify(kits));
  }, [kits]);

  const addFolder = (name) => {
    const newFolder = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      kitIds: []
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  };

  const addKit = (kitData, folderId) => {
    const newKit = {
      ...kitData,
      id: Math.random().toString(36).substr(2, 9),
      folderId,
      lastAccessed: new Date(),
      progress: 0,
      sources: kitData.sources || []
    };
    
    setKits(prev => [newKit, ...prev]);
    setFolders(prev => prev.map(f => f.id === folderId ? { ...f, kitIds: [...f.kitIds, newKit.id] } : f));
    return newKit;
  };

  const addMaterialToKit = (kitId, source, materialData) => {
    setKits(prev => prev.map(k => {
      if (k.id === kitId) {
        const newSources = k.sources.includes(source) ? k.sources : [...k.sources, source];
        const newContent = { ...k.content };
        
        if (source === 'youtube') newContent.videoUrls = [...newContent.videoUrls, materialData.url];
        if (source === 'manual') newContent.textData += `\n${materialData.text}`;
        if (source === 'curriculum') newContent.unitMapping = materialData.unitMapping;

        return {
          ...k,
          sources: newSources,
          content: newContent,
          lastAccessed: new Date()
        };
      }
      return k;
    }));
  };

  const moveKitToFolder = (kitId, newFolderId) => {
    setKits(prev => prev.map(k => k.id === kitId ? { ...k, folderId: newFolderId } : k));
    setFolders(prev => prev.map(f => {
      const removedKit = f.kitIds.filter(id => id !== kitId);
      const addedKit = f.id === newFolderId ? [...f.kitIds, kitId] : f.kitIds;
      return { ...f, kitIds: f.id === newFolderId ? addedKit : removedKit };
    }));
  };

  const deleteKit = (id) => {
    setKits(prev => prev.filter(k => k.id !== id));
    setFolders(prev => prev.map(f => ({ ...f, kitIds: f.kitIds.filter(kid => kid !== id) })));
  };

  const filteredKits = useMemo(() => {
    return kits.filter(kit => {
      const folder = folders.find(f => f.id === kit.folderId);
      const folderName = folder ? folder.name : '';
      const matchesSearch = kit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          folderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (kit.content.unitMapping?.subject?.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    }).sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed));
  }, [kits, folders, searchQuery]);

  const recentKits = useMemo(() => {
    return [...kits].sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)).slice(0, 3);
  }, [kits]);

  return (
    <LibraryContext.Provider value={{
      folders,
      kits,
      filteredKits,
      recentKits,
      searchQuery,
      setSearchQuery,
      addFolder,
      addKit,
      addMaterialToKit,
      moveKitToFolder,
      deleteKit
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
