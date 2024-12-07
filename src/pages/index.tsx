import React, { useState } from 'react';

const Home = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handlePlayClick = () => {
        setIsGameStarted(true);
    };

    return (
        <div className="relative">
            <div 
                className="min-h-screen w-full"
                style={{
                    backgroundImage: `url('/assets/${isGameStarted ? 'final_bg' : 'final_bg_with_text'}.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            {isGameStarted ? (
    <div className="absolute top-1/4 left-0 w-full flex justify-center gap-32">  {/* Changed bottom-20 to top-1/4 and gap-8 to gap-32 */}
        <button 
            className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
            style={{
                backgroundImage: "url('/assets/join_button.svg')",
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'transparent'
            }}
        />
        <button 
            className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
            style={{
                backgroundImage: "url('/assets/create_button.svg')",
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: 'transparent'
            }}
        />
    </div>
) : (
    <button 
        onClick={handlePlayClick}
        className="absolute bottom-0 left-0 w-full h-1/5 transform scale-[0.2]"
        style={{
            backgroundImage: "url('/assets/play_game.svg')",
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: 'transparent'
        }}
    />
)}
        </div>
    );
};

export default Home;