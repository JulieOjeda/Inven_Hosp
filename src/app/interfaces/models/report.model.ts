export interface Report {
  _id: string;
  resume: string;
  gear: string; // mongoose.Types.ObjectId se maneja como string en el frontend
  createdAt: Date;
  resolvedAt: Date;
  status: ReportStatus;
}

export enum ReportStatus {
  EXPIRED = "caducado",
  COMPLETED = "completado",
  PENDING = "pendiente"
}
