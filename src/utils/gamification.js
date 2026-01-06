export const RANKS = [
    'Copper', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald',
    'Ruby', 'Amethyst', 'Diamond', 'Chromatic', 'Prismatic', 'Scholar'
];

export const XP_PER_LEVEL = 500;
export const LEVELS_PER_RANK = 20;

export const calculateRankAndLevel = (totalXp) => {
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
    const rankIndex = Math.min(
        Math.floor((level - 1) / LEVELS_PER_RANK),
        RANKS.length - 1
    );

    const xpInCurrentLevel = totalXp % XP_PER_LEVEL;
    const xpToNextLevel = XP_PER_LEVEL - xpInCurrentLevel;
    const progressToNextLevel = (xpInCurrentLevel / XP_PER_LEVEL) * 100;

    return {
        rank: RANKS[rankIndex],
        level,
        xpToNextLevel,
        progressToNextLevel
    };
};

export const getRankSequence = () => RANKS;
