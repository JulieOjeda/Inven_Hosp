export interface Gear {
  name: string;
  deviceModel: string;
  serialNumber: string;
  areaAssigned: string;
  manufacturer: string;
  description: string;

  screenResolution: string;
  powerSupply: string;
  weight: number;
  connectivity: string;

  manufacturingYear: number;
  warranty: string;
  extraData: string;
  photo?: string;

  startingDate: number;
  descriptionMaintenance: string;
  responsible: string;
}
