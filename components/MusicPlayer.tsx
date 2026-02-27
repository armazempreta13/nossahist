import React, { useState, useEffect, useRef } from 'react';

interface MusicPlayerProps {
    title: string;
    artist: string;
    lyric: string;
    youtubeId?: string;
    soundcloudUrl?: string;
    shouldPlay?: boolean;
}

declare global {
    interface Window {
        SC: any;
    }
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
    title,
    artist,
    lyric,
    soundcloudUrl = "https://soundcloud.com/yagooproprio/papoulas",
    shouldPlay = false
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [widgetReady, setWidgetReady] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);
    const progressInterval = useRef<any>(null);
    const hasStarted = useRef(false);
    const isFinished = useRef(false);

    const clearProgress = () => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
            progressInterval.current = null;
        }
    };

    const initWidget = () => {
        if (!iframeRef.current || !window.SC) return;

        try {
            const widget = window.SC.Widget(iframeRef.current);
            widgetRef.current = widget;

            widget.bind(window.SC.Widget.Events.READY, () => {
                setWidgetReady(true);
            });

            widget.bind(window.SC.Widget.Events.PLAY, () => {
                setIsPlaying(true);
                isFinished.current = false;

                clearProgress();
                progressInterval.current = setInterval(() => {
                    if (!widgetRef.current) return;
                    widgetRef.current.getDuration((dur: number) => {
                        widgetRef.current.getPosition((pos: number) => {
                            if (dur > 0) {
                                setProgress((pos / dur) * 100);
                            }
                        });
                    });
                }, 300);
            });

            widget.bind(window.SC.Widget.Events.PLAY_PROGRESS, (e: any) => {
                if (e && e.relativePosition !== undefined) {
                    setProgress(e.relativePosition * 100);
                }
            });

            widget.bind(window.SC.Widget.Events.PAUSE, () => {
                if (!isFinished.current) {
                    setIsPlaying(false);
                    clearProgress();
                }
            });

            widget.bind(window.SC.Widget.Events.FINISH, () => {
                widget.getPosition((pos: number) => {
                    widget.getDuration((dur: number) => {
                        const pct = dur > 0 ? (pos / dur) * 100 : 0;
                        if (pct >= 98) {
                            setIsPlaying(false);
                            setProgress(100);
                            clearProgress();
                            isFinished.current = true;
                        } else {
                            // FINISH falso — continua tocando
                            isFinished.current = false;
                            widget.seekTo(pos);
                            widget.play();
                        }
                    });
                });
            });

            widget.bind(window.SC.Widget.Events.ERROR, (e: any) => {
                console.error("SC Widget error:", e);
            });

        } catch (error) {
            console.error("Error initializing SC Widget:", error);
        }
    };

    useEffect(() => {
        if (!window.SC) {
            const script = document.createElement('script');
            script.src = "https://w.soundcloud.com/player/api.js";
            script.async = true;
            script.onload = () => initWidget();
            document.body.appendChild(script);
        } else {
            initWidget();
        }

        return () => clearProgress();
    }, []);

    useEffect(() => {
        if (shouldPlay && widgetReady && !hasStarted.current) {
            hasStarted.current = true;
            isFinished.current = false;
            setProgress(0);
            widgetRef.current?.seekTo(0);
            widgetRef.current?.play();
        }
    }, [shouldPlay, widgetReady]);

    const togglePlay = () => {
        if (!widgetRef.current) return;

        if (isFinished.current) {
            isFinished.current = false;
            setProgress(0);
            widgetRef.current.seekTo(0);
            widgetRef.current.play();
            return;
        }

        if (isPlaying) {
            widgetRef.current.pause();
        } else {
            widgetRef.current.play();
        }
    };

    return (
        <>
            <div className="absolute w-[1px] h-[1px] overflow-hidden opacity-0 pointer-events-none -z-50 top-0 left-0">
                <iframe
                    ref={iframeRef}
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&color=%23d4b5e0&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false&single_active=false`}
                />
            </div>

            <div className={`fixed bottom-[16px] right-[16px] left-[16px] md:left-auto md:right-[24px] md:bottom-[24px] md:w-[280px] bg-warm-white/90 backdrop-blur-xl rounded-2xl p-3 border border-lilac/30 z-[200] shadow-xl transition-all duration-1000 ${shouldPlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="flex gap-3 items-center mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple to-rose rounded-lg shrink-0 shadow-sm relative overflow-hidden flex items-center justify-center">
                        <div className={`text-lg text-white/90 select-none ${isPlaying ? 'animate-pulse' : ''}`}>♪</div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="font-crimson text-sm font-semibold text-text-dark leading-tight truncate">{title}</div>
                        <div className="font-karla text-[11px] text-text-soft truncate">{artist}</div>
                    </div>
                    <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-lilac/20 hover:bg-lilac/40 text-text-dark flex items-center justify-center transition-all cursor-pointer"
                        aria-label={isPlaying ? "Pause music" : "Play music"}
                    >
                        <span className="text-xs">{isPlaying ? '⏸' : '▶'}</span>
                    </button>
                </div>

                <div className="w-full h-1 bg-lilac/10 rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-purple rounded-full transition-[width] duration-300 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="font-cormorant text-xs italic text-text-soft text-center leading-relaxed px-2">
                    {lyric?.replace(/"/g, '') || ''}
                </div>
            </div>
        </>
    );
};

export default MusicPlayer;