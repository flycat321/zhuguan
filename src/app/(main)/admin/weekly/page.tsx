"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock } from "lucide-react";
import type { WeeklyEntry } from "@/app/api/worklogs/weekly/route";

export default function WeeklyPage() {
  const [entries, setEntries] = useState<WeeklyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/worklogs/weekly")
      .then((r) => r.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <Skeleton className="h-9 w-48 rounded-xl" />
          <Skeleton className="h-5 w-64 mt-2 rounded-lg" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">周报汇总</h1>
        <p className="text-muted-foreground mt-1">
          本周全员工作内容汇总（{format(new Date(), "yyyy年第ww周")}）
        </p>
      </div>

      {entries.length === 0 ? (
        <Card className="shadow-soft rounded-2xl">
          <CardContent className="py-16 text-center text-muted-foreground">
            本周暂无工作记录
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {entries.map((entry) => (
            <Card key={entry.userId} className="shadow-soft rounded-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                      {entry.name.charAt(0)}
                    </div>
                    <CardTitle className="text-base">{entry.name}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {entry.totalHours}h
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {entry.logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-muted-foreground w-14 shrink-0 text-xs pt-0.5">
                        {format(new Date(log.date), "MM/dd")}
                      </span>
                      <div className="flex-1">
                        <p>{log.content}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">
                            {log.projectName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {log.hours}h
                          </span>
                          {log.category && (
                            <Badge variant="secondary" className="rounded-full text-[10px] px-1.5 py-0">
                              {log.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
