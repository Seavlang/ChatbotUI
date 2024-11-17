import React, { useState } from 'react';

function TestComponent() {
    const [input, setInput] = useState('');

    return (
        <div className="dark:text-gray-200">
            <div className="text-sm font-medium">
                Inputs
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message"
                className="flex-1 focus:outline-none border-2 dark:border-gray-700 my-5 w-full py-3 px-5 rounded-xl text-sm font-normal focus:ring-none bg-white dark:bg-gray-800 text-black dark:text-gray-200"
            />
            <div className="text-sm font-medium">
                Output
            </div>
            <div className="w-full my-5 h-auto max-h-80 overflow-y-auto text-sm font-normal rounded-xl border py-3 px-5 bg-white dark:bg-gray-800 dark:border-gray-700 text-black dark:text-gray-200">
                asdfd
            </div>
        </div>
    );
}

export default TestComponent;
