import { inject, Injectable } from '@angular/core';
import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/aggregates/campaign.aggregate";
import { CampaignDbContextService } from '../../infrastructure/campaign-db-context.service';
import { CreateCampaignCommand } from '../commands/create-campaign.command';
import { GetCampaignsQuery, GetCampaignsQueryResult, CampaignDto } from '../queries/get-campaigns.query';
import { CampaignRepository } from '../../infrastructure/repositories/campaign.respsitory';
import { AddChapterToCampaignCommand } from '../commands/add-chapter-to-campaign.command';

@Injectable({
    providedIn: 'root',
})

export class CampaignManagementService {
    private _campaignDbContextService: CampaignDbContextService = inject(CampaignDbContextService);
    private _campaignRepository: CampaignRepository = this._campaignDbContextService.CampaignRepository;

    async HandleCreateCommand(command: CreateCampaignCommand): Promise<void> {
        if (!command.name || command.name === '') {
            throw new Error('Campaign name cannot be empty.');
        }
        const newCampaign = new Campaign(Guid.newGuid(), command.name);
        await this._campaignRepository.saveAsync(newCampaign);
    }

    async HandleAddChapterToCampaignCommand(command: AddChapterToCampaignCommand): Promise<void> {
        if (!command.campaignId || command.campaignId === '') {
            throw new Error('Campaign ID cannot be null or empty.');
        }
        if (!command.chapterName || command.chapterName === '') {
            throw new Error('Chapter name cannot be  null or empty.');
        }
        const campaing = await this._campaignRepository.getCampaignById(new Guid(command.campaignId));
        if (!campaing) {
            throw new Error(`Campaign with ID ${command.campaignId} not found.`);
        }
        campaing.addChapter(command.chapterName);
        await this._campaignRepository.saveAsync(campaing);
    }


    async HandleGetCampaigns(query: GetCampaignsQuery): Promise<GetCampaignsQueryResult> {
        const campaigns = this._campaignRepository.getCampaigns();
        const result: CampaignDto[] = [];
        campaigns.forEach(element => {
            result.push({
                id: element.Id.Value,
                name: element.Name,
                chapters: element.Chapters.map(chapter => ({
                    id: chapter.Id.Value,
                    name: chapter.Name
                }))
            });
        });
        return { Campaigns: result };
    }
}