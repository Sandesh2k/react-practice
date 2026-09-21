import { NavLink } from "react-router-dom";

const tabs = [
  {
    label: "All",
    to: "/",
  },
  {
    label: "Active",
    to: "/active",
  },
  {
    label: "Completed",
    to: "/completed",
  },
] as const;

export function FilterTabs() {
  return (
    <nav
      className="filter-tabs"
      aria-label="Todo filters"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === "/"}
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}