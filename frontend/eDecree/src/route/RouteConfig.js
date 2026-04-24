import { lazy } from "react";
import {
  HomeIcon,
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  EnvelopeIcon,
  ServerIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import ExamineDecree from "../pages/decree/ExamineDecree";
import SearchDecree from "../pages/decree/SearchDecree";
import DecreeCaseStatus from "../pages/decree/DecreeCaseStatus";
import SendSmsForDecree from "../pages/decree/SendSmsForDecree";
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Case = lazy(() => import("../pages/case/CaseFile"));

export const RouteConfig = [
  //  ADMIN MENU
  {
    name: "Home",
    icon: Squares2X2Icon,
    roles: ["admin"],
    children: [
      {
        path: "/admin/home",
        component: Dashboard,
        label: "Dashboard",
        icon: HomeIcon,
        roles: ["admin"],
      },
      {
        path: "/pdms/searchfileDestructed",
        external: true,
        url: "http://192.168.0.178/pdms/searchfileDestructed",
        label: "Digitize File",
        icon: ServerIcon,
        roles: ["admin"],
      },
    ],
  },

  //  USER MENU
  {
    name: "Transaction",
    icon: ClipboardDocumentCheckIcon,
    roles: ["user", "admin"],
    children: [
      {
        path: "/search/decree/case",
        component: SearchDecree,
        label: "Search Decree",
        icon: DocumentMagnifyingGlassIcon,
        roles: ["user", "admin"],
      },
      {
        path: "/decree/case/status",
        component: DecreeCaseStatus,
        label: "Decree Case Status",
        icon: ChartBarIcon,
        roles: ["user", "admin"],
      },
      {
        path: "/examine/decree",
        component: ExamineDecree,
        label: "Examine Decree",
        icon: ClipboardDocumentCheckIcon,
        roles: ["user", "admin"],
      },
      {
        path: "/send/decree/sms",
        component: SendSmsForDecree,
        label: "Send Sms for Decree",
        icon: EnvelopeIcon,
        roles: ["user", "admin"],
      },
    ],
  },
];
