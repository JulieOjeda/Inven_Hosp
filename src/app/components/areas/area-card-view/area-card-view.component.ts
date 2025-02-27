import {Component, Input, OnInit} from '@angular/core';
import { Areas } from '../../../interfaces/models/areas.model';
import {AreaApiService} from '../../../api/area.api.service';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-area-card-view',
  standalone: false,
  templateUrl: './area-card-view.component.html',
  styleUrls: ['./area-card-view.component.scss']
})
export class AreaCardViewComponent implements OnInit{
  @Input() area: Areas = {
    name: '',
    description: '',
    imageId: '',
    itemsCount: 0,
    createdAt : new Date()
  }; // Inicializa con un objeto vacío

  defaultImage = '/assets/images/health-report.png'; // Ruta a tu archivo SVG
  imagePreview = environment.storageApiUrl
  isEditingDescription = false; // Controla si se está editando la descripción
  tempDescription = ''; // Almacena temporalmente la descripción editada

  constructor(private areaApiService: AreaApiService,
              private _router: Router) {}

  ngOnInit(): void {
    this.imagePreview = this.imagePreview + this.area.imageId
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.defaultImage; // Cambia la fuente de la imagen al SVG por defecto
  }

  goToItemsEvent(event: MouseEvent) {
    let target = event.target as HTMLElement
    if(target.className != "material-icons" && target.parentElement?.className != "card-image" && !this.isEditingDescription){
      this._router.navigate(['board/gear/'], { queryParams: { filter: this.area.name } });
    }
  }

  triggerImageUpload(event: Event): void {
    event.stopImmediatePropagation(); // Evita que el clic se propague a la tarjeta
    const fileInput = document.getElementById('imageUpload') as HTMLInputElement;
    fileInput.click(); // Simula el clic en el input de archivo
  }
  // Método para manejar la subida de la imagen

  handleImageUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Crear FormData para enviar al backend
      const formData = new FormData();
      formData.append('file', file);

      // Enviar la imagen al backend
      this.areaApiService.sendImage(formData).subscribe( data => {
        this.area.imageId = data.file.filename;
        this.areaApiService.updateArea(this.area).subscribe()
      })
    }
  }
  // Método para iniciar la edición de la descripción

  startEditingDescription(event: Event): void {
    event.preventDefault(); // Evita que el clic se propague a la tarjeta
    this.tempDescription = this.area.description || ''; // Copia la descripción actual
    this.isEditingDescription = true; // Activa el modo edición
  }
  // Método para guardar la descripción

  saveDescription(): void {
    if (this.tempDescription.trim()) {
      this.area.description = this.tempDescription.trim();
      this.areaApiService.updateArea(this.area).subscribe()
    } else {
      this.area.description = ''; // Si está vacío, limpia la descripción
    }
    this.isEditingDescription = false; // Desactiva el modo edición
  }

  onDescriptionInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.tempDescription = textarea.value; // Actualiza tempDescription

    // Ajusta la altura del textarea
    textarea.style.height = 'auto'; // Restablece la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura según el contenido
  }
}
