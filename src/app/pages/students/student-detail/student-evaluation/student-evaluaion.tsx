import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const monthsData = [
  {
    month: "January",
    percentage: 85,
    days: [
      { day: 1, status: "P", date: "2025-01-01" },
      { day: 2, status: "A", date: "2025-01-02" },
      { day: 3, status: "H", date: "2025-01-03" },
      { day: 4, status: "P", date: "2025-01-04" },
      { day: 5, status: "P", date: "2025-01-05" },
    ],
  },
  {
    month: "February",
    percentage: 78,
    days: [
      { day: 1, status: "A", date: "2025-02-01" },
      { day: 2, status: "P", date: "2025-02-02" },
      { day: 3, status: "P", date: "2025-02-03" },
      { day: 4, status: "H", date: "2025-02-04" },
      { day: 5, status: "A", date: "2025-02-05" },
    ],
  },
];

const remarksData = [
  "Shows improvement in class participation.",
  "Needs to work on handwriting.",
  "Great teamwork in group projects.",
];

const complaintsData = [
  "Missed homework on Jan 10.",
  "Talking during lecture.",
];

const StudentEvaluationDetail = () => {
  const navigate = useNavigate();
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "P":
        return "bg-green-500 text-white";
      case "A":
        return "bg-red-500 text-white";
      case "H":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-300 text-black";
    }
  };

  const formatDay = (dateStr: string, day: number) => {
    const date = new Date(dateStr);
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${day} (${weekday})`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <div className="mb-3">
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-4">Student Evaluation Dashboard</h1>

      {/* Attendance Section */}
      <div className="space-y-4">
        {monthsData.map((month, idx) => (
          <Card key={idx} className="shadow-lg">
            <CardContent className="p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  setExpandedMonth(expandedMonth === idx ? null : idx)
                }
              >
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">{month.month}</h2>
                  <LinearProgress
                    variant="determinate"
                    value={month.percentage}
                    className="w-40"
                  />
                  <span className="font-bold">{month.percentage}%</span>
                </div>
                {expandedMonth === idx ? <ChevronUp /> : <ChevronDown />}
              </div>

              <AnimatePresence>
                {expandedMonth === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 grid grid-cols-10 gap-2"
                  >
                    {month.days.map((d, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-center ${getStatusColor(
                          d.status
                        )}`}
                      >
                        {formatDay(d.date, d.day)}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Remarks & Complaints Section */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">
        {/* Remarks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl shadow-xl bg-blue-100"
        >
          <h3 className="text-lg font-bold mb-2">Teacher's Remarks</h3>
          <div className="space-y-2">
            {remarksData.map((r, i) => (
              <div key={i} className="p-2 rounded-md shadow-sm bg-yellow-100">
                {r}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl shadow-xl bg-red-100"
        >
          <h3 className="text-lg font-bold mb-2">Student Complaints</h3>
          <div className="space-y-2">
            {complaintsData.length > 0 ? (
              complaintsData.map((c, i) => (
                <div key={i} className="p-2 rounded-md shadow-sm bg-red-200">
                  {c}
                </div>
              ))
            ) : (
              <p>No complaints registered this month.</p>
            )}
          </div>
        </motion.div>

        {/* Performance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl shadow-xl bg-green-100"
        >
          <h3 className="text-lg font-bold mb-2">Overall Performance</h3>
          <p>Academics: 82% | Behaviour: Excellent</p>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentEvaluationDetail;
