import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(ToastrService) private toastr: ToastrService // Injetar o ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = "";

      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido:', response);
          // Armazene o token JWT retornado pela API (localStorage ou cookies)
          // Redirecione para o dashboard
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login realizado com sucesso!', 'Bem-vindo!'); 
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
          this.toastr.error(this.errorMessage, 'Erro no Login'); 
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      this.toastr.error(this.errorMessage, 'Erro no Login');
    }
  }
}
