import { useState } from "react";
import { Navigate } from "../../Navigate";
import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllReportsQuery } from "../redux/api/manageApi";
import UserReportTable from "./UserReportTable";
import useDebounce from "../../hooks/useDebounce";

const UserReport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({ searchQuery, setCurrentPage });
  const { data, isLoading, isFetching } = useGetAllReportsQuery({
    searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const reports = data?.data || [];
  const meta = data?.meta || {};

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="bg-white p-3 h-[87vh]">
      <div className="flex justify-between">
        <div className="flex">
          <Navigate title={"User Report"} />
          <h1 className="font-semibold text-xl">
            {`(${meta?.total || 0})`}
          </h1>
        </div>
        <div>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            className="w-44 px-4 py-4 rounded-lg bg-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UserReportTable
        reports={reports}
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
  );
};

export default UserReport;
