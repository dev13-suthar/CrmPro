-- CreateTable
CREATE TABLE "WorkSpace" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "peopleId" INTEGER NOT NULL,

    CONSTRAINT "WorkSpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "People" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "city" TEXT,
    "jobTitle" TEXT,
    "workSpaceId" INTEGER NOT NULL,

    CONSTRAINT "People_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkSpace_adminId_key" ON "WorkSpace"("adminId");

-- AddForeignKey
ALTER TABLE "WorkSpace" ADD CONSTRAINT "WorkSpace_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "People" ADD CONSTRAINT "People_workSpaceId_fkey" FOREIGN KEY ("workSpaceId") REFERENCES "WorkSpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
