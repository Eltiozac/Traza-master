import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  userEmail: string;
  userProfileImageUrl: string;
  timer: any = null; // Temporizador para sede
  timerDisplay: string = '00:00:00'; // Visualización del temporizador de sede
  totalSeconds: number = 0; // Contador de segundos acumulados en sede
  showTimer: boolean = false; // Controlar la visibilidad del contador de sede

  classTimer: any = null; // Temporizador para clases
  classTimerDisplay: string = '00:00:00'; // Visualización del temporizador de clases
  classTotalSeconds: number = 0; // Contador de segundos acumulados en clases
  showClassTimer: boolean = false; // Controlar la visibilidad del contador de clases

  constructor(private alertController: AlertController, private navController: NavController) {
    this.userEmail = 'usuario@ejemplo.com'; // Cambia esto según sea necesario
    this.userProfileImageUrl = 'assets/profile-placeholder.png'; // Cambia la ruta de la imagen si es necesario
  }

  entradaSede() {
    console.log('Entrada a la sede');
    
    // Detenemos el temporizador de clases si está en marcha
    if (this.classTimer) {
      clearInterval(this.classTimer);
      this.classTimer = null;
      this.showClassTimer = false; // Ocultar el temporizador de clases
    }

    // Detenemos el temporizador si ya está en marcha
    if (this.timer) {
      clearInterval(this.timer);
    }

    // Reiniciamos el contador
    this.totalSeconds = 0;
    this.showTimer = true; // Mostrar el contador de sede

    // Iniciamos el temporizador
    this.timer = setInterval(() => {
      this.totalSeconds++;
      this.updateDisplay(); // Actualizamos la visualización
    }, 1000); // Actualiza cada segundo
  }

  salidaSede() {
    console.log('Salida de la sede');

    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null; // Detenemos el temporizador
    }

    this.showTimer = false; // Ocultar el contador

    // Calcula el tiempo total que estuvo en la sede
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;

    const timeSpent = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;

    // Mostrar la alerta con el tiempo en la sede
    this.presentAlert(timeSpent, 'sede');
  }

  entradaClases() {
    console.log('Entrada a clases');

    // Detenemos el temporizador de sede si está en marcha
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.showTimer = false; // Ocultar el temporizador de sede
    }

    // Reiniciamos el contador
    this.classTotalSeconds = 0;
    this.showClassTimer = true; // Mostrar el contador de clases

    // Iniciamos el temporizador
    this.classTimer = setInterval(() => {
      this.classTotalSeconds++;
      this.updateClassDisplay(); // Actualizamos la visualización de clases
    }, 1000); // Actualiza cada segundo
  }

  salidaClases() {
    console.log('Salida de clases');

    if (this.classTimer) {
      clearInterval(this.classTimer);
      this.classTimer = null; // Detenemos el temporizador
    }

    this.showClassTimer = false; // Ocultar el contador de clases

    // Calcula el tiempo total que estuvo en clases
    const hours = Math.floor(this.classTotalSeconds / 3600);
    const minutes = Math.floor((this.classTotalSeconds % 3600) / 60);
    const seconds = this.classTotalSeconds % 60;

    const timeSpent = `${this.pad(hours, 2)}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;

    // Mostrar la alerta con el tiempo en clases
    this.presentAlert(timeSpent, 'clases');
  }

  updateDisplay() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;

    this.timerDisplay = 
      this.pad(hours, 2) + ':' + 
      this.pad(minutes, 2) + ':' + 
      this.pad(seconds, 2);
  }

  updateClassDisplay() {
    const hours = Math.floor(this.classTotalSeconds / 3600);
    const minutes = Math.floor((this.classTotalSeconds % 3600) / 60);
    const seconds = this.classTotalSeconds % 60;

    this.classTimerDisplay = 
      this.pad(hours, 2) + ':' + 
      this.pad(minutes, 2) + ':' + 
      this.pad(seconds, 2);
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

  async presentAlert(timeSpent: string, type: string) {
    const alert = await this.alertController.create({
      header: `Tiempo en la ${type}`,
      message: `Estuviste ${timeSpent} en la ${type}.`,
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    // Lógica de cierre de sesión
    this.navController.navigateRoot('/login'); // Redirige a la página de inicio de sesión
  }
}
