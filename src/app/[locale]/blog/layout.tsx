import React from "react";

import SideBar from "@/components/sidebar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;
