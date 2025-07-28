"use client";

import Link from "next/link";
import {
  Menu,
  FileText,
  NotebookPen,
  History,
  LogOut,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const menuItems = [
    { icon: FileText, href: "/persuratan", label: "Persuratan" },
    { icon: Users, href: "/penandatangan", label: "Pejabat Penanda Tangan" },
    { icon: NotebookPen, href: "/input-warga", label: "Input Warga" },
    { icon: History, href: "/letter-history", label: "Riwayat" },
    { icon: LogOut, href: "/#beranda", label: "Keluar" },
  ];

  return (
    <div
      className={`
        ${expanded ? "w-60" : "w-16"}
        bg-white border-r border-gray-200 flex flex-col py-4
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex justify-center mb-4">
        <Menu
          className="h-6 w-6 text-gray-600 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        />
      </div>

      <div className="flex-1 flex flex-col space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname.startsWith(item.href);

          const handleClick = () => {
            if (item.icon === FileText) {
              setExpanded(!expanded);
            }
          };

          return (
            <Link key={index} href={item.href}>
              <button
                onClick={handleClick}
                className={`
                  w-full px-3 py-3 rounded-lg transition-colors duration-200
                  flex items-center
                  ${expanded ? "justify-start gap-3" : "justify-center"}
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }
                `}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span
                  className={`
                    overflow-hidden transition-all duration-300
                    ${expanded ? "opacity-100 ml-1 w-auto" : "opacity-0 w-0"}
                    whitespace-nowrap text-sm
                  `}
                >
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import {
//   Menu,
//   Grid3X3,
//   Heart,
//   Bookmark,
//   FileText,
//   Settings,
//   HelpCircle,
//   Users,
//   Mail,
//   LogOut,
//   History,
//   NotebookPen,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { Input } from "postcss";

// export function Sidebar() {
//   const pathname = usePathname();

//   const menuItems = [
//     // { icon: Grid3X3, active: false },
//     // { icon: Heart, active: false },
//     // { icon: Bookmark, active: false },
//     { icon: FileText, href: "/persuratan" },
//     // { icon: Settings, active: false },
//     // { icon: HelpCircle, active: false },
//     // { icon: Users, active: false },
//     // { icon: Mail, active: false },
//     { icon: NotebookPen, href: "/input-warga" },
//     { icon: History, href: "/history" },
//     { icon: LogOut, href: "/#beranda" },
//   ];

//   return (
//     <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-4">
//       <div className="p-2">
//         <Menu className="h-6 w-6 text-gray-600" />
//       </div>

//       <div className="flex-1 flex flex-col space-y-2">
//         {menuItems.map((item, index) => {
//           const isActive = pathname.startsWith(item.href);

//           return (
//             <Link key={index} href={item.href}>
//               <button
//                 className={`w-full p-3 rounded-lg transition-colors flex justify-center ${
//                   isActive
//                     ? "bg-blue-100 text-blue-600"
//                     : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 <item.icon className="h-5 w-5" />
//               </button>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
