import React from "react";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center h-full content-center ">
      <ul className="flex flex-row">
        <li className="text-4xl font-bold hover:text-red-700">
          <Link href="/">HOME</Link>
        </li>
      </ul>
      {children}
    </div>
  );
}

export default Layout;
