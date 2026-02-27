import React, { useState } from 'react';
import { Post, SiteConfig, PostType } from '../types';
import { ArrowLeft, Edit2, Plus, Trash2, Save, MoveVertical, X, Music, Heart, MessageSquare, Image as ImageIcon, Type, Sparkles } from 'lucide-react';

interface AdminDashboardProps {
    posts: Post[];
    config: SiteConfig;
    onUpdatePosts: (posts: Post[]) => void;
    onUpdateConfig: (config: SiteConfig) => void;
    onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, config, onUpdatePosts, onUpdateConfig, onExit }) => {
    const [activeTab, setActiveTab] = useState<'posts' | 'config'>('posts');
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    // Form handlers
    const handleSavePost = () => {
        if (!editingPost) return;
        
        const newPosts = posts.some(p => p.id === editingPost.id)
            ? posts.map(p => p.id === editingPost.id ? editingPost : p)
            : [...posts, editingPost];
            
        onUpdatePosts(newPosts);
        setEditingPost(null);
    };

    const handleDeletePost = (id: string) => {
        if (window.confirm("Are you sure you want to delete this moment?")) {
            onUpdatePosts(posts.filter(p => p.id !== id));
        }
    };

    const handleCreatePost = () => {
        const newPost: Post = {
            id: `post-${Date.now()}`,
            type: 'text',
            emoji: '✨',
            title: 'New Moment',
            quote: 'Add a beautiful quote here...',
            content: ['Write your story paragraph here...'],
            chatMessages: [],
        };
        setEditingPost(newPost);
    };

    const updateConfig = (key: keyof SiteConfig, value: string) => {
        onUpdateConfig({ ...config, [key]: value });
    };

    return (
        <div className="min-h-screen bg-gray-50 font-karla text-gray-800">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={onExit} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold font-cormorant text-gray-900">Dashboard</h1>
                        <p className="text-xs text-gray-500">Managing "Nossa História"</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setActiveTab('posts')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'posts' ? 'bg-purple text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        Moments
                    </button>
                    <button 
                        onClick={() => setActiveTab('config')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'config' ? 'bg-purple text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'}`}
                    >
                        Site Config
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-6">
                {activeTab === 'posts' ? (
                    <div className="space-y-6">
                         <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-cormorant font-bold">Story Moments</h2>
                            <button onClick={handleCreatePost} className="flex items-center gap-2 bg-text-dark text-white px-4 py-2 rounded-lg hover:bg-black transition-colors shadow-sm">
                                <Plus size={18} /> New Moment
                            </button>
                        </div>

                        {editingPost ? (
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeInUp">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                    <h3 className="font-bold text-lg">Edit Moment</h3>
                                    <button onClick={() => setEditingPost(null)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                                </div>
                                <div className="p-6 space-y-6">
                                    {/* Core Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Title</label>
                                            <input 
                                                type="text" 
                                                value={editingPost.title} 
                                                onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50 font-cormorant text-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Emoji</label>
                                            <input 
                                                type="text" 
                                                value={editingPost.emoji} 
                                                onChange={(e) => setEditingPost({...editingPost, emoji: e.target.value})}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quote</label>
                                        <textarea 
                                            value={editingPost.quote} 
                                            onChange={(e) => setEditingPost({...editingPost, quote: e.target.value})}
                                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50 italic h-20"
                                        />
                                    </div>

                                    {/* Type Selector */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Type</label>
                                        <div className="flex gap-4">
                                            {(['text', 'chat', 'image'] as PostType[]).map(type => (
                                                <button
                                                    key={type}
                                                    onClick={() => setEditingPost({...editingPost, type})}
                                                    className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${editingPost.type === type ? 'border-purple bg-lilac/20 text-purple font-bold' : 'border-gray-100 hover:border-gray-200 text-gray-500'}`}
                                                >
                                                    {type === 'text' && <Type size={18} />}
                                                    {type === 'chat' && <MessageSquare size={18} />}
                                                    {type === 'image' && <ImageIcon size={18} />}
                                                    <span className="capitalize">{type}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Dynamic Content Fields */}
                                    {editingPost.type === 'image' && (
                                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-500">Image URL (Unsplash or direct link)</label>
                                                <input 
                                                    type="text"
                                                    placeholder="https://images.unsplash.com..."
                                                    value={editingPost.imageUrl || ''}
                                                    onChange={(e) => setEditingPost({...editingPost, imageUrl: e.target.value})}
                                                    className="w-full p-2 border border-gray-200 rounded"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                 <label className="text-xs font-bold text-gray-500">Overlay Caption (Optional)</label>
                                                <textarea 
                                                    value={editingPost.imageCaption || ''}
                                                    onChange={(e) => setEditingPost({...editingPost, imageCaption: e.target.value})}
                                                    className="w-full p-2 border border-gray-200 rounded h-20 font-cormorant"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {editingPost.type === 'chat' && (
                                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                            <label className="text-xs font-bold text-gray-500">Chat Messages</label>
                                            {editingPost.chatMessages?.map((msg, idx) => (
                                                <div key={msg.id} className="flex flex-wrap md:flex-nowrap gap-2 items-center p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                                                     <input 
                                                        value={msg.text}
                                                        onChange={(e) => {
                                                            const newChats = [...(editingPost.chatMessages || [])];
                                                            newChats[idx].text = e.target.value;
                                                            setEditingPost({...editingPost, chatMessages: newChats});
                                                        }}
                                                        className="flex-1 min-w-[150px] p-2 border border-gray-200 rounded text-sm"
                                                        placeholder="Message..."
                                                     />
                                                     <div className="flex gap-2 w-full md:w-auto justify-between md:justify-start">
                                                        <input 
                                                            value={msg.time}
                                                            onChange={(e) => {
                                                                const newChats = [...(editingPost.chatMessages || [])];
                                                                newChats[idx].time = e.target.value;
                                                                setEditingPost({...editingPost, chatMessages: newChats});
                                                            }}
                                                            className="w-16 p-2 border border-gray-200 rounded text-sm text-center"
                                                            placeholder="Time"
                                                        />
                                                        <button 
                                                            onClick={() => {
                                                                const newChats = [...(editingPost.chatMessages || [])];
                                                                newChats[idx].isRight = !newChats[idx].isRight;
                                                                setEditingPost({...editingPost, chatMessages: newChats});
                                                            }}
                                                            className={`p-2 rounded text-[10px] font-bold w-14 ${msg.isRight ? 'bg-purple text-white' : 'bg-gray-200 text-gray-600'}`}
                                                        >
                                                            {msg.isRight ? 'Right' : 'Left'}
                                                        </button>
                                                        <button 
                                                            onClick={() => {
                                                                const newChats = (editingPost.chatMessages || []).filter((_, i) => i !== idx);
                                                                setEditingPost({...editingPost, chatMessages: newChats});
                                                            }}
                                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                     </div>
                                                </div>
                                            ))}
                                            <button 
                                                onClick={() => setEditingPost({
                                                    ...editingPost, 
                                                    chatMessages: [...(editingPost.chatMessages || []), { id: Date.now().toString(), text: '', time: '00:00', isRight: false }]
                                                })}
                                                className="text-sm text-purple font-bold flex items-center gap-1"
                                            >
                                                <Plus size={14} /> Add Message
                                            </button>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Main Content (Paragraphs)</label>
                                        <textarea 
                                            value={editingPost.content.join('\n\n')} 
                                            onChange={(e) => setEditingPost({...editingPost, content: e.target.value.split('\n\n')})}
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50 min-h-[200px] leading-relaxed"
                                            placeholder="Separate paragraphs with double enter..."
                                        />
                                        <p className="text-xs text-gray-400">Tip: Use *italic* for emphasis. Use 'QUOTE_BREAK' on a new line to insert the large quote style.</p>
                                    </div>

                                    {/* Interlude Phrase */}
                                    <div className="space-y-2 p-4 bg-purple/5 rounded-lg border border-purple/10">
                                        <label className="text-xs font-bold text-purple uppercase tracking-wider flex items-center gap-2"><Sparkles size={14}/> Interlude Phrase (Following this post)</label>
                                        <input 
                                            type="text" 
                                            value={editingPost.interludePhrase || ''} 
                                            onChange={(e) => setEditingPost({...editingPost, interludePhrase: e.target.value})}
                                            className="w-full p-3 bg-white border border-purple/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple/50 font-cormorant italic"
                                            placeholder="A poetic phrase to transition to the next moment..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                        <button onClick={() => setEditingPost(null)} className="px-6 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                        <button onClick={handleSavePost} className="px-6 py-2 bg-purple text-white rounded-lg shadow-md hover:bg-opacity-90 transition-colors flex items-center gap-2">
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {posts.map((post) => (
                                    <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-lilac/30 flex items-center justify-center text-xl">
                                                {post.emoji}
                                            </div>
                                            <div>
                                                <h3 className="font-bold font-cormorant text-lg text-gray-800">{post.title}</h3>
                                                <p className="text-xs text-gray-500 font-mono uppercase tracking-wide">{post.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setEditingPost(post)} className="p-2 text-gray-400 hover:text-purple hover:bg-lilac/10 rounded-lg">
                                                <Edit2 size={18} />
                                            </button>
                                            <button onClick={() => handleDeletePost(post.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeInUp">
                        <div className="p-6 border-b border-gray-100">
                             <h3 className="font-bold text-lg font-cormorant">Site Configuration</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Couple Name</label>
                                    <input value={config.coupleName} onChange={e => updateConfig('coupleName', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Subtitle</label>
                                    <input value={config.subtitle} onChange={e => updateConfig('subtitle', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Avatar Letter</label>
                                    <input value={config.avatarLetter} onChange={e => updateConfig('avatarLetter', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            
                            <hr className="border-gray-100" />
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Music size={14}/> Music Title</label>
                                    <input value={config.musicTitle} onChange={e => updateConfig('musicTitle', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Music size={14}/> Artist</label>
                                    <input value={config.musicArtist} onChange={e => updateConfig('musicArtist', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Music size={14}/> SoundCloud URL (Song link)</label>
                                    <input 
                                        value={config.soundcloudUrl || ''} 
                                        onChange={e => updateConfig('soundcloudUrl', e.target.value)} 
                                        className="w-full p-2 border rounded font-mono text-sm"
                                        placeholder="https://soundcloud.com/user/song-title"
                                    />
                                    <p className="text-xs text-gray-400">Copy the full link of the song from SoundCloud.</p>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Music size={14}/> Lyric Snippet</label>
                                    <input value={config.musicLyric} onChange={e => updateConfig('musicLyric', e.target.value)} className="w-full p-2 border rounded" />
                                </div>
                            </div>

                             <hr className="border-gray-100" />

                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"><Heart size={14}/> Proposal Text</label>
                                <textarea value={config.proposalText} onChange={e => updateConfig('proposalText', e.target.value)} className="w-full p-2 border rounded h-24" />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;