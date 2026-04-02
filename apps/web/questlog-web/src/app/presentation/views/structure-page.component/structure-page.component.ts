import { Component, inject, input, OnInit } from '@angular/core';
import { AppStore } from '../../presentation-services/app.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-structure-page.component',
  imports: [FormsModule],
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
}
