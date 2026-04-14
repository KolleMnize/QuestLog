import { Entity } from "../../../shared-kernel/entity";
import { Guid } from "../../../shared-kernel/guid.value-object";
import { CampaignChapterId } from "../value-objects/campaign-chapter-id.value-object";

export class CampaignChapter extends Entity {

    private _id: CampaignChapterId;
    private _parent?: CampaignChapter;
    private _name: string;
    readonly _subChapters: CampaignChapter[] = [];

    get Id(): CampaignChapterId {return this._id}
    get Name(): string { return this._name }
    get Parent(): CampaignChapter | undefined { return this._parent; }
    get SubChapters(): readonly CampaignChapter[] { return this._subChapters; }

    private constructor(id: CampaignChapterId, name: string) {
        super();
        this._id = id;
        this._name = name;
    }

    static create(id: CampaignChapterId, name: string) {
        return new CampaignChapter(id, name);
    }

    static rehydrate(id: CampaignChapterId, name: string) {
        return new CampaignChapter(id, name);
    }

    addSubChapter(subChapter: CampaignChapter) {
        subChapter._parent = this;
        this._subChapters.push(subChapter);
    }

    findSubChapterById(subChapterId: CampaignChapterId): CampaignChapter | undefined {
        return this.finderecursive(this.SubChapters, subChapterId)
    }

    private finderecursive(chapters: readonly CampaignChapter[], id: CampaignChapterId): CampaignChapter | undefined {
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
