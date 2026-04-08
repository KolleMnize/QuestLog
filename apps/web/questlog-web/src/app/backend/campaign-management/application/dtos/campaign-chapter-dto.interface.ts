export interface CampaignChapterDto {
    id: string;
    name: string;
    subChapters: CampaignChapterDto[];
}