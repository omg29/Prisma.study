import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [kits, setKits] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load user-specific data whenever user changes
  useEffect(() => {
    if (user?.id) {
      const storedFolders = localStorage.getItem(`prisma_folders_${user.id}`);
      const storedKits = localStorage.getItem(`prisma_kits_${user.id}`);

      setFolders(storedFolders ? JSON.parse(storedFolders) : []);
      setKits(storedKits ? JSON.parse(storedKits) : []);
    } else {
      setFolders([]);
      setKits([]);
    }
  }, [user?.id]);

  // Persist folders to user-specific storage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`prisma_folders_${user.id}`, JSON.stringify(folders));
    }
  }, [folders, user?.id]);

  // Persist kits to user-specific storage
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`prisma_kits_${user.id}`, JSON.stringify(kits));
    }
  }, [kits, user?.id]);

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
        (kit.content?.unitMapping?.subject?.toLowerCase().includes(searchQuery.toLowerCase()));
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
