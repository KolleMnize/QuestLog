import { Aggregate } from "../../../shared-kernel/aggregate";
import { Guid } from "../../../shared-kernel/guid.value-object";
import { CampaignChapter } from "../entities/campaign-chapter.entitie";

export class Campaign extends Aggregate {
    private _name: string;
    private _chapters: CampaignChapter[] = []; 


    get Name(): string { return this._name; }
    get Chapters(): readonly CampaignChapter[] { return this._chapters; }

    constructor(id: Guid, name: string) {
        super();
        this.Id = id;
        this._name = name;
    }

    addChapter(chapterName: string)
    {
        var newChapter = new CampaignChapter(Guid.newGuid(), chapterName);
        this._chapters.push(newChapter);
    }

}