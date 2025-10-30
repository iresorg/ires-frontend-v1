import DashboardLayout from "@/components/layout/DashboardLayout";

export default function TransactionHistory() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-full text-center text-white py-20">
        <p className="text-white/80 text-base font-bold">
          No history to show, You are not subscribed to a plan yet.
        </p>
      </div>
    </DashboardLayout>
  );
}
