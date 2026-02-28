// Components
import { QuickStats, SalesPerformance, TrafficSources, Transactions } from "./components";

export const Dashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <QuickStats />
        <div className="grid grid-cols-12 gap-4">
          <SalesPerformance />
          <TrafficSources />
        </div>
        <Transactions />
      </div>
    </>
  );
}
