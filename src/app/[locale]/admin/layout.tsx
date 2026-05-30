import React, { ReactNode } from "react";

import { TABS } from "@/constants";

import LogoutBtn from "./components/logout-btn";
import { TabBtn } from "./components/tab-button";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <section className="container-prose py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mono text-xs uppercase tracking-widest text-muted-foreground">
            ADMIN
          </p>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight">
            Dashboard.
          </h1>
        </div>
        <LogoutBtn />
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
        {TABS.map((_tab) => (
          <TabBtn id={_tab.id} icon={_tab.icon} key={_tab.id}>
            {_tab.label}
          </TabBtn>
        ))}
      </div>
      {children}
    </section>
  );
};

export default layout;
