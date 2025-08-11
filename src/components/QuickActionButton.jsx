/* eslint-disable no-unused-vars */import { Button } from "./ui/button";

 
export function QuickActionButton({ icon: Icon, label }) {
  return (
    <Button className="flex flex-col items-center justify-center h-32 w-40 bg-gray-800 text-white hover:bg-gray-700 rounded-lg shadow-md">
      <Icon className="h-8 w-8 mb-2" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  );
}
