import { getTranslations } from "next-intl/server";
import { portfolioItems } from "@/data/portfolio";
import type { TranslatedPortfolioItem } from "@/components/PortfolioGrid";

export async function getTranslatedPortfolioItems(): Promise<TranslatedPortfolioItem[]> {
  const t = await getTranslations("data.portfolio.items");
  return portfolioItems.map((item) => ({
    ...item,
    title: t(`${item.id}.title`),
    description: t(`${item.id}.description`),
  }));
}
