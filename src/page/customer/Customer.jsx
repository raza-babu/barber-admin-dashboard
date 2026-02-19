import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState } from "react";
import { useGetCustomerQuery } from "../redux/api/manageApi";
import CustomerTable from "./CustomerTable";

const Customer = () => {
  const [status, setStatus] = useState("");
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: customerData,
    isLoading,
    isFetching,
  } = useGetCustomerQuery({
    status,
    searchTerm: searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const customers = customerData?.data || [];
  const meta = customerData?.meta || {};

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="md:flex justify-between">
        <div className="flex ">
          <Navigate title={"Customers"} />
        </div>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          prefix={<SearchOutlined />}
          className="w-64 px-4 py-2 rounded-lg bg-white"
        />
      </div>

      {/* Filter and Search */}
      <div className=" p-2">
        <div className="flex justify-between items-center mb-4">
          <select
            className="rounded p-2 px-4 border border-[#C79A88] mr-11"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="" disabled>
              Filter by status
            </option>
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>

        {/* Table */}
        <CustomerTable
          customers={customers}
          meta={meta}
          isLoading={isLoading}
          isFetching={isFetching}
          pageSize={pageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        {meta?.totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={meta?.total || 0}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer;
