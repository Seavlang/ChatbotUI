"use client";;
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (<>
    <div
      className={cn(
        "flex flex-row justify-end [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full ",
        containerClassName
      )}>
      <div className="flex flex-row justify-center items-center rounded-md bg-[#D9D9D9] bg-opacity-35 py-1 px-2">
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-3 py-1 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}>
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-white dark:bg-zinc-800 rounded-md ]",
                  activeTabClassName
                )} />
            )}

            <span className="relative block text-black dark:text-white text-sm font-medium">
              {
                active.value === tab.value ? 
                  <div className="text-[#68ADF0]">{tab.title}</div>
                  :
                  <div>{tab.title}</div>
              }
            </span>
          </button>
        ))}
      </div>

    </div>
    <FadeInDiv
      tabs={tabs}
      active={active}
      key={active.value}
      hovering={hovering}
      className={cn("mt-14 rounded-2xl ", contentClassName)} />
  </>);
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering
}) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    (<div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0 border-2 bg-gray-200 ", className)}>
          {tab.content}
        </motion.div>
      ))}
    </div>)
  );
};
