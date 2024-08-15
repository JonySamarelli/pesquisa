import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule]
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Verifica se o usuário está autenticado
    if (this.authService.isAuthenticated()) {
      // Redireciona para o login se o usuário não estiver autenticado
      this.router.navigate(['/login']);
    }
  }

  onCreatePoll(): void {
    this.router.navigate(['/create-poll']);
  }
}
