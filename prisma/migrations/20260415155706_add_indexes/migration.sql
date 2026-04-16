-- CreateIndex
CREATE INDEX "milestones_projectId_idx" ON "milestones"("projectId");

-- CreateIndex
CREATE INDEX "milestones_dueDate_idx" ON "milestones"("dueDate");

-- CreateIndex
CREATE INDEX "work_logs_userId_date_idx" ON "work_logs"("userId", "date");

-- CreateIndex
CREATE INDEX "work_logs_projectId_idx" ON "work_logs"("projectId");
