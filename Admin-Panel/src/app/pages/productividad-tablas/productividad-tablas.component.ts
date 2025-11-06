import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importamos cada servicio
import { CuerposAcademicosService } from './cuerpos-academicos.service';
import { SistemaNacionalService } from './sistema-nacional.service';
import { PerfilDeseableService } from './perfil-deseable.service';
import { OtrosReconocimientosService } from './otros-reconocimientos.service';
import { ConveniosFirmadosService } from './convenios-firmados.service';
import { ParticipacionRedesService } from './participacion-redes.service';

@Component({
  selector: 'app-productividad-tablas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productividad-tablas.component.html',
  styleUrls: ['./productividad-tablas.component.css']
})
export class ProductividadTablasComponent implements OnInit {

  cuerposAcademicos: any[] = [];
  sistemaNacional: any[] = [];
  perfilDeseable: any[] = [];
  otrosReconocimientos: any[] = [];
  conveniosFirmados: any[] = [];
  participacionRedes: any[] = [];

  constructor(
    private cuerposService: CuerposAcademicosService,
    private sistemaService: SistemaNacionalService,
    private perfilService: PerfilDeseableService,
    private otrosService: OtrosReconocimientosService,
    private conveniosService: ConveniosFirmadosService,
    private participacionService: ParticipacionRedesService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cuerposService.getAll().subscribe(data => {
      this.cuerposAcademicos = data;
    });

    this.sistemaService.getAll().subscribe(data => {
      this.sistemaNacional = data;
    });

    this.perfilService.getAll().subscribe(data => {
      this.perfilDeseable = data;
    });

    this.otrosService.getAll().subscribe(data => {
      this.otrosReconocimientos = data;
    });

    this.conveniosService.getAll().subscribe(data => {
      this.conveniosFirmados = data;
    });

    this.participacionService.getAll().subscribe(data => {
      this.participacionRedes = data;
    });
  }
}
