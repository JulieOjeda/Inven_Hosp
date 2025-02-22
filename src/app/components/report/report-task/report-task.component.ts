import {Component, Input, OnInit} from '@angular/core';
import {Report, ReportStatus} from '../../../interfaces/models/report.model';
import {Gear} from '../../../interfaces/models/gear.model';
import {GearApiService} from '../../../api/gear.api.service';
import {ReportApiService} from '../../../api/report.api.service';

@Component({
  selector: 'app-report-task',
  standalone: false,
  templateUrl: './report-task.component.html',
  styleUrls: ['./report-task.component.scss'],
})
export class ReportTaskComponent implements OnInit{
  @Input() reportTask !: Report;
  public gear!: Gear
  isEditable: boolean = true;

  public isModalOpen: boolean = false;

  constructor(private gearApiService: GearApiService,
              private reportApiService: ReportApiService) {

  }

  ngOnInit(): void {
    this.gearApiService.getGearById(this.reportTask.gear).subscribe((gear: Gear) =>{
      this.gear = gear
      this.isEditable = this.reportTask.resume === "" ? true : false
    })
  }

  getStatusClass(status: ReportStatus): string {
    switch (status) {
      case ReportStatus.PENDING:
        return 'status-pending';
      case ReportStatus.COMPLETED:
        return 'status-completed';
      case ReportStatus.EXPIRED:
        return 'status-expired';
      default:
        return '';
    }
  }

  openResumeModal() {
    this.isModalOpen = true;
  }
  // Método para cerrar el modal
  closeResumeModal() {
    this.isModalOpen = false;
  }

  saveResume(newResume: string): void {
    this.reportTask.resume = newResume;
    this.closeResumeModal();
    this.reportApiService.updateReport(this.reportTask).subscribe()
  }
}
