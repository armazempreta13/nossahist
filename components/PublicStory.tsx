import React, { useEffect, useRef, useState } from 'react';
import { Post, SiteConfig } from '../types';
import MusicPlayer from './MusicPlayer';
import { ChevronDown, Fingerprint, Sparkles, Heart } from 'lucide-react';

interface PublicStoryProps {
    posts: Post[];
    config: SiteConfig;
    onAdminClick: () => void;
}

// Sub-component for 3D Tilt Effect on Images (Enhanced for active state)
const TiltCard = ({ children, className, isActive }: { children: React.ReactNode, className?: string, isActive: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isActive || !cardRef.current) return; // Only tilt when active
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
        const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5

        // Calculate rotation (max 10 degrees)
        const rotateY = x * 20; 
        const rotateX = -y * 20;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    };

    return (
        <div 
            ref={cardRef}
            className={`transition-transform duration-700 ease-out will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: isActive ? transform : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)' }}
        >
            {children}
        </div>
    );
};

const introLines = [
    "Antes de ler cada memória, eu queria que você soubesse que",
    "cada detalhe aqui foi guardado com todo o cuidado do mundo.",
    "Porque a nossa história não é só sobre o passado, é sobre o",
    "futuro que a gente começou a construir naquele exato dia."
];

const PublicStory: React.FC<PublicStoryProps> = ({ posts, config, onAdminClick }) => {
    const [activePostId, setActivePostId] = useState<string | null>(null);
    const [proposalHidden, setProposalHidden] = useState(true);
    const [keystrokes, setKeystrokes] = useState('');
    const [scrollY, setScrollY] = useState(0);
    const [introOpacity, setIntroOpacity] = useState(1);
    
    // START SEQUENCE STATE
    const [hasStarted, setHasStarted] = useState(false);
    
    // Create Refs for smooth scrolling
    const postRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    
    // Lock scroll helper
    const isScrollingRef = useRef(false);

    // Start Sequence Handler
    const handleStartStory = () => {
        setHasStarted(true);
        // Initially set focus to first post after a slight delay
        setTimeout(() => {
            if(posts.length > 0) setActivePostId(posts[0].id);
        }, 1000);
    };

    // New handler: Go to first post specifically
    const startJourney = () => {
        if (posts.length > 0) {
            const firstId = posts[0].id;
            const element = postRefs.current[firstId];
            if (element) {
                // Determine layout offset based on screen width (sidebar vs topbar)
                const isMobile = window.innerWidth < 768;
                const offset = isMobile ? 80 : 40;
                
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    };

    // Cinematic Focus System
    // Calculates which post is closest to the center of the viewport
    useEffect(() => {
        const handleScrollFocus = () => {
            if (!hasStarted) return;
            
            const viewportCenter = window.innerHeight / 2;
            let closestId = null;
            let minDistance = Infinity;

            Object.entries(postRefs.current).forEach(([id, element]) => {
                const el = element as HTMLElement | null;
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const elementCenter = rect.top + (rect.height / 2);
                    const distance = Math.abs(viewportCenter - elementCenter);

                    // Threshold for "active" - needs to be reasonably close to center
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestId = id;
                    }
                }
            });

            // Update active post only if it changes
            if (closestId && closestId !== activePostId) {
                setActivePostId(closestId);
            }
        };

        // Throttle slightly for performance
        let timeoutId: any = null;
        const throttledScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScrollFocus();
                timeoutId = null;
            }, 50); // 50ms throttle
        };

        window.addEventListener('scroll', throttledScroll);
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [hasStarted, activePostId]);


    // Mouse Wheel Handler for Auto-Scroll
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!hasStarted) return;
            
            // If user is at the top (intro section) and scrolls down
            if (window.scrollY < 100 && e.deltaY > 0 && !isScrollingRef.current) {
                e.preventDefault(); // Prevent default jerky scroll
                isScrollingRef.current = true;
                startJourney();
                
                // Release lock after animation roughly finishes
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 1000);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, [hasStarted, posts]);

    // Scroll Listener for Intro Opacity and Background
    useEffect(() => {
        if (!hasStarted) return; 

        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrollY(currentScroll);

            // Calculate Intro Opacity: 1 at top, 0 at 60% of viewport height
            const viewportHeight = window.innerHeight;
            const fadePoint = viewportHeight * 0.6;
            const newOpacity = Math.max(0, 1 - (currentScroll / fadePoint));
            setIntroOpacity(newOpacity);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasStarted]);

    // Secret Code Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setKeystrokes(prev => (prev + e.key).slice(-4).toLowerCase());
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (keystrokes === 'love') {
            onAdminClick();
        }
    }, [keystrokes, onAdminClick]);

    return (
        <div className="relative min-h-screen bg-cream selection:bg-lilac/30">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 grain-bg opacity-40"></div>

            {/* Music Player */}
            <MusicPlayer 
                title={config.musicTitle}
                artist={config.musicArtist}
                lyric={config.musicLyric}
                soundcloudUrl={config.soundcloudUrl}
                shouldPlay={hasStarted}
            />

            {/* Intro Section */}
            {!hasStarted ? (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-cream px-6">
                    <div className="max-w-2xl text-center space-y-8 animate-fadeInUp">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-cormorant italic font-light text-text-dark tracking-tight">
                                {config.coupleName}
                            </h1>
                            <p className="text-sm md:text-base font-karla uppercase tracking-[0.3em] text-text-soft">
                                {config.subtitle}
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-center gap-6">
                            <button 
                                onClick={handleStartStory}
                                className="group relative px-12 py-4 overflow-hidden rounded-full transition-all duration-500 hover:shadow-xl hover:shadow-lilac/20"
                            >
                                <div className="absolute inset-0 bg-text-dark transition-transform duration-500 group-hover:scale-105"></div>
                                <span className="relative text-cream font-karla tracking-widest text-sm uppercase flex items-center gap-3">
                                    Começar nossa história <Sparkles size={16} className="animate-pulse" />
                                </span>
                            </button>
                            <p className="text-xs text-text-soft/60 italic font-cormorant">Recomendado com som ligado</p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Hero / Cover */}
                    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ opacity: introOpacity }}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-lilac/20 rounded-full blur-[120px] animate-blob"></div>
                        
                        <div className="relative z-10 space-y-12 max-w-3xl">
                            <div className="space-y-4">
                                <span className="text-4xl animate-bounce inline-block">✨</span>
                                <h2 className="text-6xl md:text-8xl font-cormorant italic font-light text-text-dark">
                                    {config.coupleName}
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {introLines.map((line, i) => (
                                    <p 
                                        key={i} 
                                        className="text-lg md:text-xl font-cormorant text-text-soft leading-relaxed animate-fadeInUp"
                                        style={{ animationDelay: `${i * 0.8}s` }}
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>

                            <button 
                                onClick={startJourney}
                                className="mt-12 animate-bounce p-4 rounded-full border border-text-dark/10 text-text-soft hover:bg-lilac/10 transition-colors"
                            >
                                <ChevronDown size={24} />
                            </button>
                        </div>
                    </section>

                    {/* Story Timeline */}
                    <div className="max-w-4xl mx-auto px-6 pb-32 space-y-32 md:space-y-64">
                        {posts.map((post, index) => (
                            <article 
                                key={post.id}
                                ref={el => postRefs.current[post.id] = el}
                                className={`relative transition-all duration-1000 ease-out ${activePostId === post.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-20 translate-y-12 scale-95 blur-sm'}`}
                            >
                                {/* Post Content */}
                                <div className="space-y-12">
                                    {/* Header */}
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lilac/20 text-3xl mb-4 animate-sway">
                                            {post.emoji}
                                        </div>
                                        <h3 className="text-3xl md:text-5xl font-cormorant italic text-text-dark">
                                            {post.title}
                                        </h3>
                                        <div className="w-12 h-px bg-lilac mx-auto"></div>
                                    </div>

                                    {/* Quote */}
                                    <div className="max-w-2xl mx-auto text-center">
                                        <p className="text-xl md:text-2xl font-cormorant italic text-text-soft leading-relaxed">
                                            {post.quote}
                                        </p>
                                    </div>

                                    {/* Dynamic Content */}
                                    <div className="max-w-2xl mx-auto">
                                        {post.type === 'text' && (
                                            <div className="space-y-8 text-lg md:text-xl font-karla text-text-dark leading-relaxed text-center md:text-left">
                                                {post.content.map((p, i) => (
                                                    <p key={i} className="first-letter:text-4xl first-letter:font-cormorant first-letter:mr-1">
                                                        {p}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {post.type === 'chat' && (
                                            <div className="space-y-4 p-6 md:p-8 bg-warm-white rounded-3xl shadow-inner border border-soft-gray/20">
                                                {post.chatMessages?.map((msg) => (
                                                    <div 
                                                        key={msg.id} 
                                                        className={`flex flex-col ${msg.isRight ? 'items-end' : 'items-start'} animate-fadeInMessage`}
                                                    >
                                                        <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm md:text-base ${msg.isRight ? 'bg-purple text-white rounded-tr-none' : 'bg-lilac/30 text-text-dark rounded-tl-none'}`}>
                                                            {msg.text}
                                                        </div>
                                                        <span className="text-[10px] text-text-soft/50 mt-1 uppercase tracking-tighter">{msg.time}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {post.type === 'image' && (
                                            <TiltCard isActive={activePostId === post.id} className="relative group">
                                                <div className="aspect-[4/5] md:aspect-video overflow-hidden rounded-2xl shadow-2xl">
                                                    <img 
                                                        src={post.imageUrl} 
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                                        <p className="text-white font-cormorant italic text-xl md:text-2xl leading-tight whitespace-pre-line">
                                                            {post.imageCaption}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Decorative elements */}
                                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-lilac/40 rounded-full blur-xl animate-pulse"></div>
                                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
                                            </TiltCard>
                                        )}
                                    </div>

                                    {/* Main Content Paragraphs (if any left after type-specific) */}
                                    {post.type !== 'text' && post.content.length > 0 && (
                                        <div className="max-w-2xl mx-auto space-y-6 text-lg font-karla text-text-soft text-center italic">
                                            {post.content.map((p, i) => <p key={i}>{p}</p>)}
                                        </div>
                                    )}

                                    {/* Interlude */}
                                    {post.interludePhrase && (
                                        <div className="pt-16 text-center">
                                            <p className="font-cormorant italic text-text-soft/40 text-sm md:text-base tracking-widest uppercase">
                                                {post.interludePhrase}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}

                        {/* Final Proposal Section */}
                        <section className="relative py-32 text-center space-y-12">
                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                <div className="w-64 h-64 bg-rose/30 rounded-full blur-[100px] animate-pulse"></div>
                            </div>

                            <div className="space-y-8">
                                <h4 className="text-4xl md:text-6xl font-cormorant italic text-text-dark">
                                    {proposalHidden ? "E agora..." : "Para sempre?"}
                                </h4>
                                
                                {proposalHidden ? (
                                    <button 
                                        onClick={() => setProposalHidden(false)}
                                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-text-dark text-cream rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                                    >
                                        <Fingerprint size={20} className="group-hover:animate-pulse" />
                                        <span className="font-karla tracking-widest uppercase text-xs">Revelar última memória</span>
                                    </button>
                                ) : (
                                    <div className="animate-fadeInUp space-y-12">
                                        <div className="space-y-4">
                                            <p className="text-2xl md:text-4xl font-cormorant italic text-text-dark max-w-2xl mx-auto leading-relaxed">
                                                A gente acabou.
                                            </p>
                                            <p className="text-xl md:text-2xl font-cormorant italic text-text-soft max-w-2xl mx-auto leading-relaxed opacity-80">
                                                Não existe mais "nós".
                                            </p>
                                            <p className="text-lg md:text-xl font-cormorant italic text-text-soft max-w-2xl mx-auto leading-relaxed opacity-60">
                                                Cada um segue seu caminho...
                                            </p>
                                        </div>
                                        <div className="pt-8 flex justify-center gap-4">
                                            <div className="w-2 h-2 bg-soft-gray rounded-full animate-pulse"></div>
                                            <div className="w-2 h-2 bg-soft-gray rounded-full animate-pulse animation-delay-2000"></div>
                                            <div className="w-2 h-2 bg-soft-gray rounded-full animate-pulse animation-delay-4000"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <footer className="py-12 text-center border-t border-soft-gray/10">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-text-soft/30">
                            feito com todo o amor do mundo • {new Date().getFullYear()}
                        </p>
                    </footer>
                </>
            )}
        </div>
    );
};

export default PublicStory;
