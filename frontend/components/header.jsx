import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search"
          className="border-none shadow-none focus-visible:ring-0 text-gray-600"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            2
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium text-gray-900">Moni Roy</div>
            <div className="text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
}
