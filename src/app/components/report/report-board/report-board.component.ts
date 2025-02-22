import {ChangeDetectorRef, Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Report, ReportStatus} from '../../../interfaces/models/report.model';
import {ReportService} from '../../../services/report.service';
import {ReportApiService} from '../../../api/report.api.service';

@Component({
  selector: 'app-report-board',
  standalone: false,
  templateUrl: './report-board.component.html',
  styleUrls: ['./report-board.component.scss'],
})
export class ReportBoardComponent {
  public pendienteTasks: Report[] = []
  public completadoTasks: Report[] = []
  public caducadoTasks: Report[] = []
  errorMensaje: string = "";

  constructor(private reportService: ReportService,
              private reportApiService: ReportApiService) {
    reportService.list$.subscribe((reports: Report[]) => {
      this.pendienteTasks = reports.filter(report => report.status === ReportStatus.PENDING);
      this.completadoTasks = reports.filter(report => report.status === ReportStatus.COMPLETED);
      this.caducadoTasks = reports.filter(report => report.status === ReportStatus.EXPIRED);
    });
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateStatus(event.container.data[0] as Report, event.container.id as ReportStatus)
    }
  }

  updateStatus(report: Report, to: ReportStatus){
    report.status = to
    if (report.status === ReportStatus.COMPLETED){
      report.resolvedAt = new Date()
    }
    this.reportApiService.updateReport(report).subscribe()
  }

  canDrop = (item: CdkDrag<Report>, list: CdkDropList): boolean => {
    if (item.dropContainer.id === ReportStatus.COMPLETED && list.id !== ReportStatus.COMPLETED) return false;
    if (item.dropContainer.id !== ReportStatus.COMPLETED && list.id !== ReportStatus.COMPLETED) return false;

    if (item.data.resume === "") {
      this.setErrorMensaje("Tiene que llenar el report primero. Ir a 'Leer más'.");
      return false;
    }

    this.clearErrorMensaje(); // Limpiar el mensaje de error si no hay problemas
    return true;
  }

  setErrorMensaje(mensaje: string): void {
    this.errorMensaje = mensaje;
  }

  private clearErrorMensaje() {
    this.errorMensaje = ""
  }
}
