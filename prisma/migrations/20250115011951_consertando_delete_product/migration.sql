-- DropForeignKey
ALTER TABLE "PlanHistory" DROP CONSTRAINT "PlanHistory_productId_fkey";

-- AddForeignKey
ALTER TABLE "PlanHistory" ADD CONSTRAINT "PlanHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
