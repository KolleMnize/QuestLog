import { Aggregate } from "../../../shared-kernel/aggregate";
import { Guid } from "../../../shared-kernel/guid.value-object";
import { CampaignChapter } from "../entities/campaign-chapter.entitie";
import { CampaignChapterId } from "../value-objects/campaign-chapter-id.value-object";
import { CampaignId } from "../value-objects/campaign-id.value-object";

export class Campaign extends Aggregate {
    private _id: CampaignId;
    private _name: string;
    private _chapters: CampaignChapter[] = [];

    get Id(): CampaignId { return this._id }
    get Name(): string { return this._name; }
    get Chapters(): readonly CampaignChapter[] { return this._chapters; }

    private constructor(id: CampaignId, name: string) {
        super();
        this._id = id;
        this._name = name;
    }

    static create(campaignId: CampaignId, name: string) {
        return new Campaign(campaignId, name);
    }

    static rehydrate(campaignId: CampaignId, name: string) {
        return new Campaign(campaignId, name)
    }

    addChapter(chapterId: CampaignChapterId, chapterName: string) {
        var newChapter = CampaignChapter.create(chapterId, chapterName);
        this._chapters.push(newChapter);
    }

    addSubChapter(parentChapterId: CampaignChapterId, subChapterId: CampaignChapterId, subChapterName: string) {
        var parentChapter: CampaignChapter | undefined;

        for (const chapter of this.Chapters) {
            if (chapter.Id.equals(parentChapterId)) {
                parentChapter = chapter;
                break;
            }
            const searchresult = chapter.findSubChapterById(parentChapterId);
            if (searchresult) {
                parentChapter = searchresult;
                break;
            }
        }
        if (!parentChapter)
            throw new Error("Parent chapter not found");
        parentChapter.addSubChapter(CampaignChapter.create(subChapterId, subChapterName));
    }

    updateName(newName: string) {
        if (!newName || newName === '') {
            throw new Error('Campaign name cannot be empty.');
        }
        this._name = newName;
    }


}