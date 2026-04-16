"use client";

import { useEffect, useState, use } from "react";
import { ProjectForm } from "@/components/projects/project-form";
import { Skeleton } from "@/components/ui/skeleton";

function formatDate(d: string | null) {
  if (!d) return "";
  return d.split("T")[0];
}

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.json())
      .then(setProject);
  }, [id]);

  if (!project) {
    return (
      <div className="space-y-4 max-w-4xl">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-[400px] rounded-2xl" />
      </div>
    );
  }

  return (
    <ProjectForm
      isEdit
      initialData={{
        id: project.id as string,
        name: project.name as string,
        contractNo: (project.contractNo as string) ?? "",
        contractAmount: project.contractAmount
          ? String(project.contractAmount)
          : "",
        clientName: project.clientName as string,
        clientContact: (project.clientContact as string) ?? "",
        projectType: (project.projectType as string) ?? "",
        phase: project.phase as string,
        status: project.status as string,
        startDate: formatDate(project.startDate as string | null),
        endDate: formatDate(project.endDate as string | null),
        leadId: project.leadId as string,
        description: (project.description as string) ?? "",
        address: (project.address as string) ?? "",
        buildingArea: project.buildingArea
          ? String(project.buildingArea)
          : "",
      }}
    />
  );
}
