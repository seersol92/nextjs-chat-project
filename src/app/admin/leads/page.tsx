"use client";
import React from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";

const Leads: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Leads" />

        <div className="grid grid-cols-1 gap-8">
          <TableThree />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Leads;
