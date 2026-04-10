import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useGetAllBarberQuery } from "../redux/api/manageApi";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import BarberTable from "./BarberTable";

export const Barber = () => {
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({ searchQuery, setCurrentPage });
  const { data, isLoading, isFetching } = useGetAllBarberQuery({
    status,
    searchTerm: searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const barbers = data?.data || [];
  const meta = data?.meta || {};
  

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="md:flex justify-between">
        <div className="flex">
          <Navigate title={"Barbers"} />
          <h1 className="pl-2 font-semibold text-xl">
            {`(${meta?.total || 0})`}
          </h1>
        </div>

        <div className="flex gap-2">
          <select
            className="rounded p-2 px-4 border border-[#C79A88]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>
              Filter by status
            </option>
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLOCKED">Blocked</option>
          </select>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-2 rounded-lg bg-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter */}
      <div className="p-2">
        {/* Table */}
        <BarberTable
          barbers={barbers}
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
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};
