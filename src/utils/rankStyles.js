export const getRankStyle = (rank) => {
  if (!rank) return 'text-zinc-500 font-bold';
  const r = rank.toLowerCase();
  
  const baseStyled = 'bg-clip-text text-transparent italic font-black inline-block';

  // High Fidelity Rank Styles
  if (r.includes('prismatic')) {
    return 'text-shimmer brand-font italic inline-block font-black';
  }
  
  if (r.includes('chromatic')) {
    return `${baseStyled} bg-gradient-to-r from-red-500 via-green-500 via-blue-500 to-purple-500 animate-gradient-slow`;
  }

  if (r.includes('diamond')) {
    return `${baseStyled} bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500`;
  }

  if (r.includes('amethyst')) {
    return `${baseStyled} bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-600`;
  }

  if (r.includes('ruby')) {
    return `${baseStyled} bg-gradient-to-r from-red-400 via-rose-500 to-red-600`;
  }

  if (r.includes('emerald')) {
    return `${baseStyled} bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600`;
  }

  if (r.includes('platinum')) {
    return `${baseStyled} bg-gradient-to-r from-slate-200 via-white to-slate-400`;
  }

  if (r.includes('gold')) {
    return `${baseStyled} bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600`;
  }

  if (r.includes('silver')) {
    return `${baseStyled} bg-gradient-to-r from-slate-400 via-zinc-200 to-slate-500`;
  }

  if (r.includes('bronze')) {
    return `${baseStyled} bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800`;
  }

  if (r.includes('copper')) {
    return `${baseStyled} bg-gradient-to-r from-orange-700 via-red-800 to-stone-900`;
  }

  if (r.includes('scholar')) {
    return 'text-cyan-bright font-black inline-block';
  }
  
  return 'text-white font-black inline-block';
};
