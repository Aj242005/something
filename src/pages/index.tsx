import Head from "next/head";
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-twinkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Floating circles decoration */}
            <div className="absolute top-20 -left-10 w-40 h-40 bg-blue-400/30 rounded-full blur-xl animate-float" />
            <div className="absolute bottom-20 -right-10 w-40 h-40 bg-purple-400/30 rounded-full blur-xl animate-float-slow" />
            
            {/* Main content */}
            <div className="relative flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
                {/* Title */}
                <h1 className="text-6xl md:text-7xl font-bold text-white text-center 
                             drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
                             animate-bounce-slow">
                    Star Jumper
                </h1>
                
                {/* Description */}
                <p className="text-xl md:text-2xl text-white/90 text-center max-w-md 
                             drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                    Jump through the stars in this exciting platform adventure!
                </p>
                
                {/* Play button */}
                <button
                    onClick={() => router.push('/game')}
                    className="transform hover:scale-110 transition-all duration-300
                             px-8 py-4 text-xl font-bold text-white
                             bg-gradient-to-r from-yellow-400 to-orange-500
                             rounded-full shadow-[0_0_20px_rgba(251,191,36,0.5)]
                             hover:shadow-[0_0_30px_rgba(251,191,36,0.7)]
                             hover:from-yellow-300 hover:to-orange-400"
                >
                    Play Now!
                </button>
                
                {/* Game features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl w-full px-4">
                    {[
                        { icon: "⭐", title: "Collect Stars" },
                        { icon: "🎮", title: "Fun Gameplay" },
                        { icon: "🚀", title: "Epic Jumps" }
                    ].map((feature, index) => (
                        <div key={index} 
                             className="bg-white/10 backdrop-blur-sm rounded-xl p-4
                                      flex flex-col items-center justify-center gap-2
                                      transform hover:scale-105 transition-all duration-300
                                      hover:bg-white/20 group">
                            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-white font-semibold">{feature.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}