import { Injectable } from '@angular/core';
import { Gear } from '../interfaces/models/gear.model';
import { BaseService } from '../shared/services/base.service';
import { GearApiService } from '../api/gear.api.service';
import {Report} from '../interfaces/models/report.model';
import {ReportApiService} from '../api/report.api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService<Report>{
  constructor(private apiReportService : ReportApiService){
    super()
    this.apiReportService.getReports().subscribe((list : Report[])=>{
      this.updateList(list)
    })
  }
}
