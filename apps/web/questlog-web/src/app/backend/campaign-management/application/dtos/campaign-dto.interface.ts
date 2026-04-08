import { CampaignChapterDto } from "./campaign-chapter-dto.interface";

export  interface CampaignDto {
    id: string;
    name: string;
    chapters: CampaignChapterDto[];
}