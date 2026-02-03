-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "xMin" INTEGER NOT NULL,
    "xMax" INTEGER NOT NULL,
    "yMin" INTEGER NOT NULL,
    "yMax" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonToPlayer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PersonToPlayer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PersonToPlayer_B_index" ON "_PersonToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_PersonToPlayer" ADD CONSTRAINT "_PersonToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonToPlayer" ADD CONSTRAINT "_PersonToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
