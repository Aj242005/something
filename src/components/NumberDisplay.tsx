import React from 'react';

interface NumberDisplayProps {
    numbers: string;
    onComplete?: () => void;
}

const NumberDisplay: React.FC<NumberDisplayProps> = ({ numbers, onComplete }) => {
    const numberArray = numbers.split('');

    const renderNumberGroup = (start: number, end: number) => {
        return (
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 18.65, display: 'flex'}}>
                {numberArray.slice(start, end).map((num, index) => (
                    <div key={start + index} style={{
                        width: 109.59,
                        height: 109.59,
                        paddingLeft: 38.86,
                        paddingRight: 38.86,
                        paddingTop: 31.87,
                        paddingBottom: 31.87,
                        border: '6.22px #1F2B17 solid',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 7.77,
                        display: 'inline-flex'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            color: '#1F2B17',
                            fontSize: 37.31,
                            fontFamily: 'Satoshi',
                            fontWeight: '900',
                            wordWrap: 'break-word'
                        }}>
                            {num}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 18.65,
            display: 'inline-flex'
        }}>
            {renderNumberGroup(0, 3)}
            <div style={{
                width: 109.59,
                height: 109.59,
                paddingLeft: 38.86,
                paddingRight: 38.86,
                paddingTop: 31.87,
                paddingBottom: 31.87,
                border: '6.22px solid',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 7.77,
                display: 'inline-flex'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: '#1F2B17',
                    fontSize: 37.31,
                    fontFamily: 'Satoshi',
                    fontWeight: '900',
                    wordWrap: 'break-word'
                }}>-</div>
            </div>
            {renderNumberGroup(3, 6)}
            <div style={{
                width: 109.59,
                height: 109.59,
                paddingLeft: 38.86,
                paddingRight: 38.86,
                paddingTop: 31.87,
                paddingBottom: 31.87,
                border: '6.22px solid',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 7.77,
                display: 'inline-flex'
            }}>
                <div style={{
                    textAlign: 'center',
                    color: '#1F2B17',
                    fontSize: 37.31,
                    fontFamily: 'Satoshi',
                    fontWeight: '900',
                    wordWrap: 'break-word'
                }}>-</div>
            </div>
            {renderNumberGroup(6, 9)}
        </div>
    );
};

export default NumberDisplay;
