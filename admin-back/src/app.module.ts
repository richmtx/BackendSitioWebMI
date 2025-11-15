import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importación del módulo de cada una de las APIs
import { ContactoModule } from './contacto/contacto.module';
import { AsignaturasBasicasModule } from './sintesisPlan/asignaturasBasicas/asignaturasBasicas.module';
import { AsignaturasOptativasModule } from './sintesisPlan/asignaturasOptativas/asignaturasOptativas.modulle';
import { OrientacionProfesionalModule } from './sintesisPlan/orientacionProfesional/orientacionProfesional.module';
import { DistribucionAsignaturasModule } from './sintesisPlan/distribucionAsignaturas/distribucionAsignaturas.module';
import { EventosModule } from './index/eventos/eventos.module';
import { LgyacModule } from './lgyac/lgyac.module';
import { ConveniosFirmadosModule } from './productividadTablas/conveniosFirmados/conveniosFirmados.module';
import { OtrosReconocimientosModule } from './productividadTablas/otrosReconocimientos/otrosReconocimientos.module';
import { ParticipacionRedesModule } from './productividadTablas/participacionRedes/participacionRedes.module';
import { PerfilDeseableModule } from './productividadTablas/perfilDeseable/perfilDeseable.module';
import { SistemaNacionalModule } from './productividadTablas/sistemaNacional/sistemaNacional.module';
import { CuerposAcademicosModule } from './productividadTablas/cuerposAcademicos/cuerposAcademicos.module';
import { PodcastModule } from './index/podcast/podcast.module';
import { RequisitosPermanenciaModule } from './requisitosPermanencia/requisitosPermanencia.module';
import { RequisitosGradoModule } from './requisitosGrado/requisitosGrado.module';
import { RequisitosIngresoModule } from './requisitosIngreso/requisitosIngreso.module';
import { PortadaModule } from './index/portada/portada.module';
import { EgresadosModule } from './egresados/egresados.module';
import { GaleriaModule } from './index/galeria/galeria.module';
import { CohorteModule } from './cohorte/cohorte.module';
import { LgacArticulosModule } from './productividadLGAC/lgacArticulos/lgacArticulos.module';
import { LgacArticulos2Module } from './productividadLGAC/lgacArticulos2/lgacArticulos2.module';
import { LgacArticulos3Module } from './productividadLGAC/lgacArticulos3/lgacArticulos3.module';
import { LgacArticulos4Module } from './productividadLGAC/lgacArticulos4/lgacArticulos4.module';
import { LgacCapitulosModule } from './productividadLGAC/lgacCapitulos/lgacCapitulos.modue';
import { LgacCapitulos2Module } from './productividadLGAC/lgacCapitulos2/lgacCapitulos2.module';
import { LgacCapitulos3Module } from './productividadLGAC/lgacCapitulos3/lgacCapitulos3.module';
import { LgacCapitulos4Module } from './productividadLGAC/lgacCapitulos4/lgacCapitulos4.module';
import { LgacProyectosModule } from './productividadLGAC/lgacProyectos/lgacProyectos.module';
import { LgacProyectos2Module } from './productividadLGAC/lgacProyectos2/lgacProyectos2.module';
import { LgacProyectos3Module } from './productividadLGAC/lgacProyectos3/lgacProyectos3.module';
import { LgacProyectos4Module } from './productividadLGAC/lgacProyectos4/lgacProyectos4.module';
import { NucleoBasicoModule } from './nucleoBasico/nucleoBasico.module';
import { CarruselModule } from './index/carrusel/carrusel.module';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'California29',
      database: 'maestria',
      synchronize: false, 
      autoLoadEntities: true,
      logging: true,
    }),

    // Registro de módulo para habilitar sus controladores y servicios
    ContactoModule,
    AsignaturasBasicasModule,
    AsignaturasOptativasModule,
    EventosModule,
    OrientacionProfesionalModule,
    DistribucionAsignaturasModule,
    LgyacModule,
    ConveniosFirmadosModule,
    OtrosReconocimientosModule,
    ParticipacionRedesModule,
    PerfilDeseableModule,
    SistemaNacionalModule,
    CuerposAcademicosModule,
    PodcastModule,
    RequisitosPermanenciaModule,
    RequisitosGradoModule,
    RequisitosIngresoModule,
    PortadaModule,
    EgresadosModule,
    GaleriaModule,
    CohorteModule,
    LgacArticulosModule,
    LgacArticulos2Module,
    LgacArticulos3Module,
    LgacArticulos4Module,
    LgacCapitulosModule,
    LgacCapitulos2Module,
    LgacCapitulos3Module,
    LgacCapitulos4Module,
    LgacProyectosModule,
    LgacProyectos2Module,
    LgacProyectos3Module,
    LgacProyectos4Module,
    NucleoBasicoModule,
    CarruselModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
