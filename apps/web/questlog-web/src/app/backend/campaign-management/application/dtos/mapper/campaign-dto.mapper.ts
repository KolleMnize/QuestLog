import { Campaign } from "../../../domain/aggregates/campaign.aggregate";
import { CampaignChapter } from "../../../domain/entities/campaign-chapter.entitie";
import { CampaignChapterDto } from "../campaign-chapter-dto.interface";
import { CampaignDto } from "../campaign-dto.interface";

export class CampaignDtoMapper {

    public static CampaignToCampaignDto(champaign: Campaign): CampaignDto {
        return {
            id: champaign.Id.Value,
            name: champaign.Name,
            chapters: champaign.Chapters.map(chapter => this.mapCampaignChapterToDto(chapter))
        }
    }

    private static mapCampaignChapterToDto(chapter: CampaignChapter): CampaignChapterDto {
        return {
            id: chapter.Id.Value,
            name: chapter.Name,
            subChapters: chapter.SubChapters.map((subChapter: CampaignChapter) => this.mapCampaignChapterToDto(subChapter))
        };
    }
}