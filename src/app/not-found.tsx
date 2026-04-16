import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="shadow-soft-lg rounded-2xl max-w-md w-full border-0">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-primary">
            404
          </div>
          <h1 className="text-2xl font-bold mb-2">页面未找到</h1>
          <p className="text-muted-foreground text-sm mb-8">
            您访问的页面不存在或已被移除
          </p>
          <Link href="/dashboard">
            <Button className="gradient-primary text-white shadow-primary rounded-xl px-8">
              返回看板
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
