import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState } from "react";
import { useGetBarberOwnerQuery } from "../redux/api/manageApi";
import useDebounce from "../../hooks/useDebounce";
import BarberOwnerTable from "./BarberOwnerTable";

const BarberOwner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({ searchQuery, setCurrentPage });

  // API queries
  const { data, isLoading, isFetching } = useGetBarberOwnerQuery({
    status: status,
    searchTerm: searchTerm,
    page: currentPage,
    limit: pageSize,
  });
  const barberOwners = data?.data || [];
  const meta = data?.meta || {};

  const handleStatusChange = (e) => {
    setStatus(e.target.value || ""); // Set status or clear it
    setCurrentPage(1); // Reset to first page when status changes
  };
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="p-1">
      <div className="flex ">
        <Navigate title={"Barber Owner"} />
      </div>

      {/* Filter and Search */}
      <div className="p-2">
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
            <option value="BLOCKED">Inactive</option>
          </select>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-64 px-4 py-2 rounded-lg bg-white"
          />
        </div>

        <BarberOwnerTable
          barberOwners={barberOwners}
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

export default BarberOwner;
