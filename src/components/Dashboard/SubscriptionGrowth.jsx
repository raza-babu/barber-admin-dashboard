import React from "react";
import { Skeleton } from "antd";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetDasboardQuery } from "../../page/redux/api/manageApi";

export const SubscriptionGrowth = () => {
  const { data: dashboardData, isLoading } = useGetDasboardQuery();

  const earningGrowth = dashboardData?.data?.earningGrowth || [];
 
  const chartData = earningGrowth.map((item) => ({
    month: item.month.split(" ")[0], 
    value: item.amount,
  }));

  return (
    <div>
      <div className="flex justify-between p-3">
        <p className="text-xl font-medium">Earning Growth</p>
      </div>

      <div className="w-full h-[300px]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : (
          <ResponsiveContainer width="95%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#AB684D" fill="#AB684D" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
