import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorPage from "../ErrorPage";

const Dashboard = () => {

  const {data: purchasedData, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();
  const {data: allCoursesData, isLoading: isCoursesLoading, isError: isCoursesError} = useGetCreatorCourseQuery();

  const [showSalesModal, setShowSalesModal] = useState(false);

  if(isLoading || isCoursesLoading) return <LoadingSpinner />;
  if(isError || isCoursesError) return <ErrorPage />;

  const purchasedCourse = purchasedData?.purchasedCourse || [];
  console.log('purchasedCourse:', purchasedCourse);
  const allCourses = allCoursesData?.courses || [];

  // For the chart, show all courses with their prices
  const courseData = allCourses.map(course => ({
    name: course.courseTitle,
    price: course.coursePrice
  }));

  const totalRevenue = purchasedCourse
    .filter(item => item.courseId && item.courseId._id)
    .reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.filter(item => item.courseId && item.courseId._id).length;

  // Aggregate sales data by course
  const salesByCourse = {};
  purchasedCourse.forEach((item) => {
    const id = item.courseId?._id;
    if (!id) return;
    if (!salesByCourse[id]) {
      salesByCourse[id] = {
        name: item.courseId.courseTitle,
        price: item.courseId.coursePrice,
        count: 0,
        total: 0,
      };
    }
    salesByCourse[id].count += 1;
    salesByCourse[id].total += item.amount || 0;
  });
  const salesList = Object.values(salesByCourse);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {/* Sales Modal */}
      {showSalesModal && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, minWidth: 600, maxWidth: 900, maxHeight: "80vh", overflow: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>Sales Details</h2>
              <button onClick={() => setShowSalesModal(false)} style={{ fontSize: 24, background: "none", border: "none", cursor: "pointer" }}>&times;</button>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={{ padding: 12, textAlign: "left", fontWeight: 600 }}>Course Name</th>
                    <th style={{ padding: 12, textAlign: "right", fontWeight: 600 }}>Sales Count</th>
                    <th style={{ padding: 12, textAlign: "right", fontWeight: 600 }}>Price</th>
                    <th style={{ padding: 12, textAlign: "right", fontWeight: 600 }}>Total Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {salesList.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: "center", padding: 24 }}>No sales yet.</td></tr>
                  ) : (
                    salesList.map((course, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ padding: 12 }}>{course.name}</td>
                        <td style={{ padding: 12, textAlign: "right" }}>{course.count}</td>
                        <td style={{ padding: 12, textAlign: "right" }}>${Number(course.price).toFixed(2)}</td>
                        <td style={{ padding: 12, textAlign: "right", fontWeight: 600, color: "#16a34a" }}>${course.total.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* End Sales Modal */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
          <button
            onClick={() => setShowSalesModal(true)}
            style={{ marginTop: 12, padding: "8px 18px", background: "#4a90e2", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}
          >
            View Sales Details
          </button>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">${totalRevenue.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div style={{ width: Math.max(700, courseData.length * 90) }}>
              <LineChart
                data={courseData}
                width={Math.max(700, courseData.length * 90)}
                height={540}
                margin={{ top: 10, right: 30, left: 50, bottom: 170 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 13, fontWeight: 500, fill: "#374151", height: 80 }}
                />
                <YAxis
                  stroke="#6b7280"
                  tickFormatter={value => `$${Number(value).toFixed(2)}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    <span style={{ color: "#16a34a", fontWeight: "bold" }}>{`$${Number(value).toFixed(2)}`}</span>,
                    name
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
