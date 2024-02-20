import { ReactNode } from "react";

const Card = ({ children }: { children: ReactNode }) => (
  <div className="glow-card bg-gradient-to-br from-gray-800/90 to-gray-900 rounded-2xl p-6 w-full relative ring-1 ring-inset ring-gray-600">
    <div className="flex flex-col justify-between gap-x-16 gap-y-8">
      {children}
    </div>
  </div>
);

export default Card;
