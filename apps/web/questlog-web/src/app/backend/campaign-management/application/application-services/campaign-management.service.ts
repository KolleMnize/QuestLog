import { inject, Injectable } from '@angular/core';
import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/aggregates/campaign.aggregate";
import { CampaignDbContextService } from '../../infrastructure/campaign-db-context.service';
import { CreateCampaignCommand } from '../commands/create-campaign.command';
import { GetCampaignsQuery, GetCampaignsQueryResult} from '../queries/get-campaigns.query';
import { CampaignRepository } from '../../infrastructure/repositories/campaign.repository';
import { AddChapterToCampaignCommand } from '../commands/add-chapter-to-campaign.command';
import { AddSubChapterToChapterCommand } from '../commands/add-subchapter-to-chapter.command';
import { CampaignDto } from '../dtos/campaign-dto.interface';
import { CampaignDtoMapper } from '../dtos/mapper/campaign-dto.mapper';
import { UpdateCampaignNameCommand } from '../commands/update-campaign-name.command';
import { IdFactoryService } from '../../domain/services/id-factory.service';


@Injectable({
    providedIn: 'root',
})

export class CampaignManagementService {
    private _campaignDbContextService: CampaignDbContextService = inject(CampaignDbContextService);
    private _idFactoryService: IdFactoryService = inject(IdFactoryService);
    private _campaignRepository: CampaignRepository = this._campaignDbContextService.CampaignRepository;

    async HandleCreateCommand(command: CreateCampaignCommand): Promise<void> {
        if (!command.name || command.name === '') {
            throw new Error('Campaign name cannot be empty.');
        }
        const newCampaignId = this._idFactoryService.CreateNewCampaignId();
        const newCampaign = Campaign.create(newCampaignId, command.name);
        await this._campaignRepository.saveCampaign(newCampaign);
    }

    async HandleAddChapterToCampaignCommand(command: AddChapterToCampaignCommand): Promise<void> {
        if (!command.campaignId || command.campaignId === '') {
            throw new Error('Campaign ID cannot be null or empty.');
        }
        if (!command.chapterName || command.chapterName === '') {
            throw new Error('Chapter name cannot be  null or empty.');
        }
        const campaignId = this._idFactoryService.CreateCampaignIdFromGuid(new Guid(command.campaignId))
        const campaing = await this._campaignRepository.getCampaignById(campaignId);
        if (!campaing) {
            throw new Error(`Campaign with ID ${command.campaignId} not found.`);
        }

        campaing.addChapter(this._idFactoryService.CreateNewCampaignChapterId(),command.chapterName);
        await this._campaignRepository.saveCampaign(campaing);
    }

    async HandleAddSubChapterToChapterCommand(command: AddSubChapterToChapterCommand): Promise<void> {
        if (!command.parentChapterId || command.parentChapterId === '') {
            throw new Error('Parent chapter ID cannot be null or empty.');
        }
        if (!command.subChapterName || command.subChapterName === '') {
            throw new Error('Sub-chapter name cannot be null or empty.');
        }

        const parentChapterId = this._idFactoryService.CreateCampaignChapterIdFromGuid(new Guid(command.parentChapterId))
        const campaing = await this._campaignRepository.getCampaignByChapterId(parentChapterId);

        campaing.addSubChapter(parentChapterId, this._idFactoryService.CreateNewCampaignChapterId(),command.subChapterName);
        await this._campaignRepository.saveCampaign(campaing);
    }

    async HandleUpdateCampaignNameCommand(command: UpdateCampaignNameCommand): Promise<CampaignDto> {
        if (!command.campaignId || command.campaignId === '') {
            throw new Error('Campaign ID cannot be null or empty.');
        }
        const campaignId = this._idFactoryService.CreateCampaignIdFromGuid(new Guid(command.campaignId))
        const campaign = await this._campaignRepository.getCampaignById(campaignId);
        if (!campaign) {
            throw new Error(`Campaign with ID ${command.campaignId} not found.`);
        }
        campaign.updateName(command.newName);
        await this._campaignRepository.saveCampaign(campaign);
        return CampaignDtoMapper.CampaignToCampaignDto(campaign);
    }

    async HandleGetCampaigns(query: GetCampaignsQuery): Promise<GetCampaignsQueryResult> {
        const campaigns = this._campaignRepository.getCampaigns();
        const result: CampaignDto[] = [];
        campaigns.forEach(element => {
            result.push(CampaignDtoMapper.CampaignToCampaignDto(element));
        });
        return { Campaigns: result };
    }
}