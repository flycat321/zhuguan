import { Card, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">用户管理</h1>
        <p className="text-muted-foreground mt-1">管理系统用户与权限</p>
      </div>
      <Card className="shadow-soft rounded-2xl">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-12">
            用户管理将在后续阶段实现
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
