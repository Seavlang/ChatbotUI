import React, { useEffect, useState } from 'react'

function Typewriter({ text1, speed = 10 }) {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const text = "Ensure that the SMTP port is passed as an integer, not a string. Your code currently shows '465' as a string, which could cause issues. Change it to an integer:\n ```with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:``` 2. Less Secure App Access If you're using a Gmail account, you need to allow \"less secure app access\" or use an app-specific password (if two-factor authentication is enabled).```with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:```"
    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    const renderText = () => {
        const parts = [];
        let currentText = '';
        let isCodeBlock = false;

        for (let i = 0; i < displayedText.length; i++) {
            if (displayedText.slice(i, i + 3) === '```') {
                // Push current text
                if (currentText) {
                    parts.push({ text: currentText, isCode: isCodeBlock });
                    currentText = '';
                }
                // Toggle code block state
                isCodeBlock = !isCodeBlock;
                i += 2; // Skip the backticks
            } else {
                currentText += displayedText[i];
            }
        }

        // Push remaining text
        if (currentText) {
            parts.push({ text: currentText, isCode: isCodeBlock });
        }

        return parts.map((part, index) =>
            part.isCode ? (
                <pre key={index} className='w-full pb-5 my-5 rounded-2xl bg-[#004655] overflow-x-auto whitespace-pre-wrap'>
                    <div className="bg-[#004655] border-b-[1px] mb-5 border-[#EBFF00] px-4 py-2 flex justify-between items-center">
                        <div className='w-[75px] flex justify-between'>
                            <div className='p-2 bg-[#DD0035] rounded-2xl'></div>
                            <div className='p-2 bg-[#EBFF00] rounded-2xl'></div>
                            <div className='p-2 bg-[#00C508] rounded-2xl'></div>
                        </div>
                        <div className="text-white px-4 py-2 flex justify-between items-center">
                            <span className="font-semibold">REQUEST</span>
                            {/* Copy Button (optional for style, not functional here) */}
                        </div>
                        {/* Copy Button (optional for style, not functional here) */}
                        <div className=" text-white px-4 py-2 flex justify-between items-center">
                            {/* Copy Button (optional for style, not functional here) */}
                            <button className="text-gray-400 hover:text-white">📋</button>
                        </div>

                    </div>
                    <code className=' text-white mx-5 code'>{part.text}</code>
                </pre>
            ) : (
                <span key={index} className=''>{part.text}</span>
            )
        );

    };

    return <div className='w-full '>{renderText()}</div>;
};

export default Typewriter