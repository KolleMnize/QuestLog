export interface AddSubChapterToChapterCommand {
    readonly campaignId: string;
    readonly parentChapterId: string;
    readonly subChapterName: string;
}