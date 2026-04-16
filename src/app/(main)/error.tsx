"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function MainError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="shadow-soft rounded-2xl max-w-md w-full">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-bold mb-2">出错了</h2>
          <p className="text-muted-foreground text-sm mb-6">
            页面加载时遇到了问题，请重试
          </p>
          <Button
            onClick={reset}
            className="gradient-primary text-white shadow-primary rounded-xl"
          >
            重新加载
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
