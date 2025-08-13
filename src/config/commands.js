// File: src/config/commands.js

import {
  faUsers,
  faPlus,
  faClipboardList,
  faTachometerAlt,
  faFileInvoice,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

// This is our static "database" of searchable actions in the application.
export const COMMANDS = [
  {
    title: "View All Customers",
    path: "/customers",
    module: "Customers",
    icon: faUsers,
  },
  {
    title: "Add a New Customer",
    path: "/customers/new",
    module: "Customers",
    icon: faPlus,
  },
  {
    title: "View All Jobs",
    path: "/jobs",
    module: "Jobs",
    icon: faClipboardList,
  },
  {
    title: "Add a New Job",
    path: "/jobs/new",
    module: "Jobs",
    icon: faPlus,
  },
  {
    title: "View All RFQs",
    path: "/rfqs",
    module: "RFQs",
    icon: faFileInvoice,
  },
  {
    title: "Create New RFQ",
    path: "/rfqs/new",
    module: "RFQs",
    icon: faPlus,
  },
  {
    title: "View Job Calendar",
    path: "/calendar",
    module: "Calendar",
    icon: faCalendarAlt,
  },
  {
    title: "Go to Dashboard",
    path: "/",
    module: "General",
    icon: faTachometerAlt,
  },
];
