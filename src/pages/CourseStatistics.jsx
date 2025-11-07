import React, { memo } from "react";
import StatisticsBox from "../Components/Statistics/StatisticsBox";
import RecordClasses from "../Components/Statistics/RecordClasses";
import BarCharts from "../Components/Statistics/BarCharts";

function CourseStatistics() {
  return (
    <main className="w-full flex flex-col gap-y-8">
      <div className="w-full flex flex-col gap-y-8">
        <StatisticsBox />
        <RecordClasses />
        <BarCharts />
      </div>
    </main>
  );
}

export default memo(CourseStatistics);
