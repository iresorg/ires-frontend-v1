"use client";

import { useParams } from "next/navigation";
import AccountIncidentDetail from "@/components/sections/AccountIncidentDetail";

export default function OrganizationIncidentDetailPage() {
  const params = useParams<{ id: string }>();
  return (
    <AccountIncidentDetail
      incidentId={params.id}
      listPath="/dashboard/organization/incidents"
    />
  );
}
