import SidbarLayout from "@/components/layouts/sidbar-layout";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidbarLayout>
      <main>{children}</main>
    </SidbarLayout>
  );
};

export default DashboardLayout;
