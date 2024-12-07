import React, { useState } from 'react';

interface JoinRoomProps {
    initialRoomCode?: string;
    onJoinRoom: (roomCode: string) => void;
}

const JoinRoom: React.FC<JoinRoomProps> = ({ 
    initialRoomCode = '00000000000', 
    onJoinRoom 
}) => {
    const [roomCode, setRoomCode] = useState<string[]>(initialRoomCode.split(''));

    const handleInputChange = (index: number, value: string) => {
        // Skip changes for hyphen positions
        if (index === 3 || index === 7 || index === 11) return;

        const newRoomCode = [...roomCode];
        newRoomCode[index] = value.slice(0, 1) || '0';
        setRoomCode(newRoomCode);
    };

    const handleJoinRoom = () => {
        const code = roomCode.join('');
        onJoinRoom(code);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Satoshi',
            gap: '48px'
        }}>
            <img 
                src="/assets/enter_code.svg" 
                alt="Enter Code"
                style={{
                    width: '600px',
                    objectFit: 'contain'
                }}
            />
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '18.65px'
            }}>
                {roomCode.map((digit, index) => (
                    <div 
                        key={index}
                        style={{
                            width: '109.59px',
                            height: '109.59px',
                            border: '6.22px solid #1F2B17',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {(index === 3 || index === 7 || index === 11) ? (
                            <div style={{
                                color: '#1F2B17',
                                fontSize: '37.31px',
                                fontFamily: 'Satoshi',
                                fontWeight: '900',
                                textAlign: 'center',
                                width: '100%'
                            }}>
                                -
                            </div>
                        ) : (
                            <input 
                                type="text" 
                                pattern="[0-9]"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'center',
                                    color: '#1F2B17',
                                    fontSize: '37.31px',
                                    fontFamily: 'Satoshi',
                                    fontWeight: '900',
                                    border: 'none',
                                    background: 'transparent',
                                    outline: 'none'
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
            
            <button 
                onClick={handleJoinRoom}
                style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                }}
            >
                <img 
                    src="/assets/join_game.svg" 
                    alt="Join Game"
                    style={{
                        width: '486px',
                        height: '122px',
                        objectFit: 'contain'
                    }}
                />
            </button>
        </div>
    );
};

export default JoinRoom;
