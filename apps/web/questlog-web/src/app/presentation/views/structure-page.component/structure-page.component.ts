import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AppStore } from '../../presentation-services/app.store';
import { FormsModule } from '@angular/forms';
import { CampaignDto } from '../../../backend/campaign-management/application/dtos/campaign-dto.interface';
import { CommonModule } from '@angular/common';
import { CampaignChapterDto } from '../../../backend/campaign-management/application/dtos/campaign-chapter-dto.interface';

@Component({
  selector: 'app-structure-page.component',
  standalone: true,
  imports: [FormsModule, NgTemplateOutlet, CommonModule],
  templateUrl: './structure-page.component.html',
  styleUrl: './structure-page.component.scss',
})
export class StructurePageComponent implements OnInit {
  private appStore = inject(AppStore);
  campaigns = this.appStore.campaigns;
  inputCampaignName = '';

  ngOnInit(): void {
  }

  async AddCampaign() {
    await this.appStore.addCampaign(this.inputCampaignName);
    this.inputCampaignName = '';
  }

  async AddChapterToCampaign(Campaign: CampaignDto) {
    await this.appStore.addChapterToCampaign(Campaign.id, 'New Chapter');
  }

  async AddSubChapterToChapter(Campaign: CampaignDto, ParentChapter: CampaignChapterDto) {
    await this.appStore.addSubChapterToChapter(Campaign.id, ParentChapter.id, 'New SubChapter');
  }

  async Save(Grund: string) {
    console.log("Save-Funktion aufgerufen weil: " + Grund);
  }

  async UpdateCampaignName(Campaign: CampaignDto, NewName: string) {
    await this.appStore.updateCampaignName(Campaign.id, NewName);
  }

  editingId = signal<Record<string, boolean>>({});
  editing = signal(false);
  cancelEdit = false;

  startEdit(id: string) {
    console.log("Edit Started for ID:", id);
    this.editing.set(true);
    this.editingId.update(m => ({ ...m, [id]: true }));
  }

  stopEdit() {
    console.log("Edit Stopped for ID:", this.editingId());
    this.editing.set(false);
    this.editingId.set({});
  }

  async onEnter(event: Event, campaign: any) {
    const e = event as KeyboardEvent;
    e.preventDefault();
    (event.target as HTMLInputElement).blur();
  }

  async onEscape(event: Event) {
    this.cancelEdit = true;
    const input = event.target as HTMLInputElement;
    console.log("erst hier")
    input.blur();
    console.log("dann hier")
  }

  async onBlur(event: FocusEvent, campaign: any) {
    console.log("danach hier" , this.cancelEdit)
    if (this.cancelEdit) {
      this.cancelEdit = false;
      this.stopEdit();
      return;
    }

    const elementId = 'input-' + campaign.id;
    const element = document.getElementById(elementId) as HTMLInputElement | null;
    var input = element?.value || '';
    await this.UpdateCampaignName(campaign, input);
    this.stopEdit();
  }

  onCheckboxChange(event: Event, id: string) {
    const checked = (event.target as HTMLInputElement).checked;
    this.startEdit(id);

    if (checked) {
      const elementId = 'input-' + id;
      setTimeout(() => {
        const element = document.getElementById(elementId) as HTMLInputElement | null;
        element?.focus();
        element?.select();
      });
    }
  }
}
