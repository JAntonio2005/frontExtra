import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AlumnoService } from '../../services/alumno/alumno.service';
import { Alumno } from '../../models/Alumno';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = '';
  alumnos: Alumno[] = [];
  alumno: Alumno = { nombre: '', correo: '', carrera: '' };
  mostrarDialogo = false;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private alumnoService: AlumnoService
  ) {
    const storedUser = this.tokenService.getUsername();
    if (!storedUser) {
      this.router.navigate(['/login']);
    } else {
      this.username = storedUser;
    }
  }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }

  cargarAlumnos(): void {
    this.alumnoService.getAlumnos().subscribe(data => this.alumnos = data);
  }

  abrirNuevo(): void {
    this.alumno = { nombre: '', correo: '', carrera: '' };
    this.mostrarDialogo = true;
  }

  editarAlumno(alumno: Alumno): void {
    this.alumno = { ...alumno };
    this.mostrarDialogo = true;
  }

  guardarAlumno(): void {
    if (this.alumno.id) {
      this.alumnoService.updateAlumno(this.alumno).subscribe(() => {
        this.cargarAlumnos();
        this.mostrarDialogo = false;
      });
    } else {
      this.alumnoService.createAlumno(this.alumno).subscribe(() => {
        this.cargarAlumnos();
        this.mostrarDialogo = false;
      });
    }
  }

  eliminarAlumno(id: number): void {
    if (confirm('¿Estás seguro de eliminar este alumno?')) {
      this.alumnoService.deleteAlumno(id).subscribe(() => this.cargarAlumnos());
    }
  }
}
