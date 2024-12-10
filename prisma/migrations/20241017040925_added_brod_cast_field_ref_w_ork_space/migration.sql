-- CreateTable
CREATE TABLE "BrodCast" (
    "id" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    "workSpaceId" INTEGER NOT NULL,

    CONSTRAINT "BrodCast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BrodCast_mailId_key" ON "BrodCast"("mailId");

-- AddForeignKey
ALTER TABLE "BrodCast" ADD CONSTRAINT "BrodCast_workSpaceId_fkey" FOREIGN KEY ("workSpaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
