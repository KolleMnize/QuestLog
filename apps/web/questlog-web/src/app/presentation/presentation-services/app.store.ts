import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { CampaignManagementController } from '../../backend/campaign-management/application/controller/campaign-management.controller';
import { inject } from '@angular/core';
import { CampaignDto } from '../../backend/campaign-management/application/dtos/campaign-dto.interface';

type AppState = {
    status: string;
    campaigns: CampaignDto[];
};

const initialState: AppState = {
    status: "nicht initialisiert",
    campaigns: []
};

export const AppStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods(
        (
            store,
            manageCampaignController = inject(CampaignManagementController)
        ) => ({
            async init(): Promise<void> {
                const campaigns = await manageCampaignController.Get({});
                patchState(store, { campaigns: campaigns.Campaigns });
                console.log("AppStore erfolgreich initialisiert");
                patchState(store, { status: "initialisierung abgeschlossen" });
            },
            async addCampaign(campaignName: string): Promise<void> {
                await manageCampaignController.PostCreateCampaign({ name: campaignName });
                const campaigns = await manageCampaignController.Get({});
                patchState(store, { campaigns: campaigns.Campaigns });
            },
            async addChapterToCampaign(campaignId: string, chapterName: string): Promise<void> {
                await manageCampaignController.PostAddChapterToCampaign({ campaignId, chapterName });
                const campaigns = await manageCampaignController.Get({});
                patchState(store, { campaigns: campaigns.Campaigns });
            },
            async addSubChapterToChapter(campaignId: string, parentChapterId: string, subChapterName: string): Promise<void> {
                await manageCampaignController.PostAddSubChapterToChapter({ parentChapterId, subChapterName });
                const campaigns = await manageCampaignController.Get({});
                patchState(store, { campaigns: campaigns.Campaigns });
            },
            async updateCampaignName(campaignId: string, newName: string): Promise<void> {
                const result = await manageCampaignController.UpdateCampaignName({ campaignId, newName });                
                patchState(store, 
                    { 
                        campaigns: store.campaigns().map(campaign => campaign.id === result.id ? result : campaign)
                    });
            }

        })
    )
);