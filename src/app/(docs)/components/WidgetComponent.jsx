import { Tabs } from '@/components/ui/tabs';
import React, { useEffect, useState } from 'react';
import ChatWidget from './ChatWidget';
import TestComponent from './TestComponent';
import CodeComponent from './CodeComponent';
import { getAllSessionAction } from '@/actions/docAction';

function WidgetComponent({ projectId,apiKey}) {
    const [session, setSession] = useState(null);
      // Fetch session data on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getAllSessionAction(apiKey);
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSession();
  }, [apiKey]);

  const earliestSession = session?.payload?.reduce((prev, current) =>
    new Date(prev.created_at) < new Date(current.created_at) ? prev : current
  );
    console.log("widgetId",earliestSession?.id);
    const tabs = [
        {
            title: "Preview",
            value: "preview",
            content: (
                <div className="w-full overflow-hidden relative h-full p-10 text-xl md:text-4xl font-bold bg-gradient-to-br bg-blue-100 dark:bg-primary dark:text-gray-200 flex justify-center items-center">
                    <ChatWidget />
                </div>
            ),
        },
        {
            title: "Code",
            value: "code",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-sm font-normal bg-gradient-to-br bg-gray-50 dark:bg-gray-800 dark:text-gray-200">
                    <CodeComponent projectId={projectId} apiKey={apiKey} sessionId={earliestSession?.id}/>
                </div>
            ),
        },
        {
            title: "Playground",
            value: "playground",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold bg-gradient-to-br bg-white dark:bg-gray-900 dark:text-gray-200">
                    <TestComponent projectId={projectId} apiKey={apiKey}/>
                </div>
            ),
        },
    ];

    return (
        <div className="dark:text-gray-200">
            <div className="text-base font-normal">
                Simply select your preferred chatbot model, upload your document, and start chatting with the AI assistant to retrieve information effortlessly.
            </div>
            <a
                className="text-primary mt-2 text-lg font-semibold inline-block"
                href="https://www.npmjs.com/package/@kshrd/chatbotwidget"
                target="_blank"
            >
                Read detailed documentation
            </a>
            <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-5">
                <Tabs tabs={tabs} />
            </div>
        </div>
    );
}

export default WidgetComponent;
