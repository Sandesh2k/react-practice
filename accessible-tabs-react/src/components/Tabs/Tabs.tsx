import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

type TabsValue = string;
interface TabsContextValue {
  value: TabsValue;
  setValue: (value: TabsValue) => void;
  getTriggerId: (value: TabsValue) => string;
  getPanelId: (value: TabsValue) => string;
}
const TabsContext = createContext<TabsContextValue | null>(null);
function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs components must be used inside <Tabs>.");
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultValue?: TabsValue;
  value?: TabsValue;
  onValueChange?: (value: TabsValue) => void;
}
function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const baseId = useId();
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = (nextValue: TabsValue) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };
  const getTriggerId = (v: TabsValue) =>
    `${baseId}-trigger-${encodeURIComponent(v)}`;
  const getPanelId = (v: TabsValue) =>
    `${baseId}-panel-${encodeURIComponent(v)}`;
  return (
    <TabsContext.Provider value={{ value, setValue, getTriggerId, getPanelId }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  "aria-label"?: string;
}
function List({ children, "aria-label": ariaLabel = "Tabs" }: TabsListProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className="tabs-list">
      {children}
    </div>
  );
}

interface TriggerProps {
  children: ReactNode;
  value: TabsValue;
  disabled?: boolean;
}
function Trigger({
  children,
  value: triggerValue,
  disabled = false,
}: TriggerProps) {
  const { value, setValue, getTriggerId, getPanelId } = useTabsContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isSelected = value === triggerValue;
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const tabList = buttonRef.current?.closest('[role="tablist"]');
    const tabs = Array.from(
      tabList?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]:not([disabled])',
      ) ?? [],
    );
    const currentIndex = tabs.indexOf(buttonRef.current!);
    if (currentIndex === -1 || tabs.length === 0) return;
    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    const nextValue = nextTab.dataset.value;
    if (nextValue) setValue(nextValue);
  };
  return (
    <button
      ref={buttonRef}
      id={getTriggerId(triggerValue)}
      role="tab"
      type="button"
      data-value={triggerValue}
      aria-selected={isSelected}
      aria-controls={getPanelId(triggerValue)}
      tabIndex={isSelected ? 0 : -1}
      disabled={disabled}
      className="tabs-trigger"
      onClick={() => setValue(triggerValue)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}

interface PanelProps {
  children: ReactNode;
  value: TabsValue;
}
function Panel({ children, value: panelValue }: PanelProps) {
  const { value, getTriggerId, getPanelId } = useTabsContext();
  const isActive = value === panelValue;
  return (
    <div
      id={getPanelId(panelValue)}
      role="tabpanel"
      aria-labelledby={getTriggerId(panelValue)}
      hidden={!isActive}
      tabIndex={0}
      className="tabs-panel"
    >
      {children}
    </div>
  );
}
Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;
export { Tabs };
