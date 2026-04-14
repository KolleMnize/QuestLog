import { Guid } from "../../../shared-kernel/guid.value-object";

export class CampaignChapterId {
   readonly Value: Guid;

   constructor(value: Guid) {
      this.Value = value;
   }

   equals(other: CampaignChapterId): boolean {
      {
         return other.Value.equals(this.Value);
      }
   }

}