import React from 'react';

const StudyGuideView = ({ kit }) => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
                <h2 className="text-3xl font-black tracking-tight text-white uppercase">Study Guide</h2>
                <div className="h-1 w-20 bg-cyan-bright rounded-full" />
            </div>

            <div className="prose prose-invert max-w-none">
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm leading-relaxed text-zinc-300 text-lg whitespace-pre-wrap">
                    {kit.content?.textData || "No study guide content available for this unit yet. Try adding some materials!"}
                </div>
            </div>
        </div>
    );
};

export default StudyGuideView;
