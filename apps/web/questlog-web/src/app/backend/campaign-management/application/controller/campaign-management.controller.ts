import { inject, Injectable } from '@angular/core';
import {CampaignManagementService} from "../application-services/campaign-management.service";
import { CreateCampaignCommand } from '../commands/create-campaign.command';
import { GetCampaignsQuery, GetCampaignsQueryResult } from '../queries/get-campaigns.query';
import { AddChapterToCampaignCommand } from '../commands/add-chapter-to-campaign.command';
import { AddSubChapterToChapterCommand } from '../commands/add-subchapter-to-chapter.command';
import { CampaignDto } from '../dtos/campaign-dto.interface';
import { UpdateCampaignNameCommand } from '../commands/update-campaign-name.command';

@Injectable({
    providedIn: 'root',
})
    

export class CampaignManagementController {

    private _campaignManagementService: CampaignManagementService = inject(CampaignManagementService);

    public async PostCreateCampaign(command: CreateCampaignCommand): Promise<void> {
        await this._campaignManagementService.HandleCreateCommand(command);}

    public async PostAddChapterToCampaign(command: AddChapterToCampaignCommand): Promise<void> {
        await this._campaignManagementService.HandleAddChapterToCampaignCommand(command);}

    public async PostAddSubChapterToChapter(command: AddSubChapterToChapterCommand): Promise<void> {
        await this._campaignManagementService.HandleAddSubChapterToChapterCommand(command);}

    public async UpdateCampaignName(command: UpdateCampaignNameCommand): Promise<CampaignDto> {
        const result = await this._campaignManagementService.HandleUpdateCampaignNameCommand(command);
        return result;
    }

    public async Get(query: GetCampaignsQuery): Promise<GetCampaignsQueryResult> {
        return await this._campaignManagementService.HandleGetCampaigns(query);}

    constructor() {}
}