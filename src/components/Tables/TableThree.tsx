"use client";
import React, { useEffect, useState } from "react";
import { Lead } from "@prisma/client";
import * as XLSX from "xlsx";

const TableThree = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads"); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error("Failed to fetch leads");
        }
        const data = await response.json();
        setLeads(data);
      } catch (err) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(leads);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    // Create a downloadable file
    const now = new Date();
    const formattedDateTime = now.toISOString().replace(/T/, "_").slice(0, 19); // Format as YYYY-MM-DD_HH-MM-SS
    const fileName = `leads_${formattedDateTime}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  if (loading) return <div>Loading leads...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-end">
        <button
          onClick={exportToExcel}
          className="mb-4 flex gap-2 rounded bg-blue-600 px-2 py-2 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M12 3v12m0 0l-3-3m3 3l3-3"
            />
          </svg>
          Export Leads
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Type
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Surname
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Email
              </th>
              <th className="min-w-[50px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Operator
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Duration
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Displeasure
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Cost
              </th>
              
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                City
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Street
              </th>
              <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                Postal
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {lead.type}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark xl:pl-11">
                  {lead.name}
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.surname}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {lead.operator}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.duration}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {lead.displeasure}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.cost}</p>
                </td>
               
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.city}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.street}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.postal}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
