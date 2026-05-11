import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Navigate } from "../../Navigate";
import { useState } from "react";
import { useGetAllPaymentQuery } from "../redux/api/manageApi";
import useDebounce from "../../hooks/useDebounce";
import PaymentTable from "./PaymentTable";

const Payment = () => {
  const [status, setStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { searchTerm } = useDebounce({ searchQuery, setCurrentPage });

  const {
    data: paymentData,
    isLoading,
    isFetching,
  } = useGetAllPaymentQuery([
    { name: "searchTerm", value: searchTerm },
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
  ]);

  // const {
  //   data: customerData,
  //   isLoading,
  //   isFetching,
  // } = useGetAllPaymentQuery({
  //   status,
  //   searchTerm: searchTerm,
  //   page: currentPage,
  //   limit: pageSize,

  // });

  const payments = paymentData?.data || [];
  const meta = paymentData?.meta || {};

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
          <Navigate title={"Payment"} />
        </div>
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-4">
            <select
              className="rounded p-2 px-4 border border-[#C79A88]"
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
            <Input
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              prefix={<SearchOutlined />}
              className="w-64 px-4 py-2 rounded-lg bg-white"
            />
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className=" p-2">
        {/* Table */}
        <PaymentTable
          payments={payments}
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

export default Payment;
