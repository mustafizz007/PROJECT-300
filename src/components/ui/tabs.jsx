import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({
  children,
  className,
  value,
  onValueChange,
  defaultValue,
}) {
  const [activeTab, setActiveTab] = useState(value || defaultValue || "");

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <TabsContext.Provider
      value={{ activeTab: value || activeTab, setActiveTab: handleTabChange }}
    >
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, className, ...props }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={className}
      onClick={() => setActiveTab(value)}
      data-state={activeTab === value ? "active" : "inactive"}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
}
