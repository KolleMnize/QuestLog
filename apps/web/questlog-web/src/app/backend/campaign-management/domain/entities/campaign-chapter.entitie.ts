import { Entity } from "../../../shared-kernel/entity";
import { Guid } from "../../../shared-kernel/guid.value-object";

export class CampaignChapter extends Entity {

    private _parent? : CampaignChapter;
    private _name? : string;
    readonly _subChapters : CampaignChapter[] = [];

    get Name(): string { return this._name || ''; }
    get Parent(): CampaignChapter | undefined {return this._parent;}
    get SubChapters(): readonly CampaignChapter[] { return this._subChapters; }
    
    constructor(id: Guid, name: string) {
        super();
        this.Id = id;
        this._name = name;
    }

    addSubChapter(subChapter: CampaignChapter) {
        subChapter._parent = this;
        this._subChapters.push(subChapter);
    }
}
