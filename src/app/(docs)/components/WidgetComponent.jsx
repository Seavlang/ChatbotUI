import { Tabs } from '@/components/ui/tabs';
import React from 'react'
import ChatWidget from './ChatWidget';
import TestComponent from './TestComponent';
import CodeComponent from './CodeComponent';

function WidgetComponent({projectId}) {
    const tabs = [
        {
            title: "Preview",
            value: "preview",
            content: (
                <div className="w-full overflow-hidden relative h-full p-10 text-xl md:text-4xl font-bold  bg-gradient-to-br bg-blue-100 flex justify-center items-center">
                    <ChatWidget/>
                </div>
            ),
        },
        {
            title: "Code",
            value: "code",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-sm font-normal  bg-gradient-to-br bg-gray-50 text-black ">
                    <CodeComponent    projectId={projectId}/>
                </div>
            ),
        },
        {
            title: "Playground",
            value: "playground",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold  bg-gradient-to-br bg-white text-black">
                    <TestComponent/>
                </div>
            ),
        }
    ];
    return (
        <div>
            <div className='text-base font-normal'>Simply select your preferred chatbot model, upload your document, and start chatting with the AI assistant to retrieve information effortlessly.</div>
            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-5 ">
                <Tabs tabs={tabs} />
            </div>
        </div>
    )
}

export default WidgetComponent