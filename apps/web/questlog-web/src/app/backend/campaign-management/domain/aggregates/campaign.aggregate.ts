import { Aggregate } from "../../../shared-kernel/aggregate";
import { Guid } from "../../../shared-kernel/guid.value-object";
import { CampaignChapter } from "../entities/campaign-chapter.entitie";
import { CampaignId } from "../value-objects/campaign-id.value-object";

export class Campaign extends Aggregate {
    private _name: string;
    private _chapters: CampaignChapter[] = [];


    get Name(): string { return this._name; }
    get Chapters(): readonly CampaignChapter[] { return this._chapters; }

    private constructor(id: CampaignId, name: string) {
        super();
        this.Id = id.Value;
        this._name = name;
    }

    static create(campaignId: CampaignId, name:string)
    {
       return new Campaign(campaignId, name);
    }

    static rehydrate(campaignId: CampaignId, name:string)
    {
        return new Campaign(campaignId,name)
    }

    addChapter(chapterName: string) {
        var newChapter = new CampaignChapter(Guid.newGuid(), chapterName);
        this._chapters.push(newChapter);
    }

    addSubChapter(parentChapterId: Guid, subChapterName: string) {
        const parentChapter = this.finderecursive(this._chapters, parentChapterId);
        if (!parentChapter)
            throw new Error("Parent chapter not found");
        parentChapter.addSubChapter(new CampaignChapter(Guid.newGuid(), subChapterName));
    }

    updateName(newName: string) {
        if (!newName || newName === '') {
            throw new Error('Campaign name cannot be empty.');
        }
        this._name = newName;
    }

    private finderecursive(chapters: readonly CampaignChapter[], id: Guid): CampaignChapter | undefined {
        for (const chapter of chapters) {
            if (chapter.Id.equals(id))
                return chapter;
            else {
                const result = this.finderecursive(chapter.SubChapters, id);
                if (result) return result;
            }
        }
        return undefined;
    }
}