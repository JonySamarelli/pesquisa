import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
// import { PollService } from '../../services/poll.service'; 
import { ToastrService } from 'ngx-toastr';
import { Poll } from '../../../models/Poll.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
  ]
})
export class CreatePollComponent implements OnInit {
  pollForm!: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  pollCreated = false;
  qrCodeUrl: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    // private pollService: PollService, 
    private router: Router,
    @Inject(ToastrService) private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.pollForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      reactions: this.formBuilder.array(['', '', ''], Validators.required) 
    });
  }

  get reactions() {
    return this.pollForm.get('reactions') as FormArray;
  }

  addReaction() {
    this.reactions.push(this.formBuilder.control('', Validators.required));
  }

  removeReaction() {
    this.reactions.removeAt(this.reactions.length - 1);
  }

  onSubmit(): void {
    if (this.pollForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      this.pollCreated = false; 
      this.qrCodeUrl = null; 

      const pollData: Poll = {
        // ... mapeie os dados do formulário para o modelo Poll
        id: '', // Será gerado pelo backend
        title: this.pollForm.value.title,
        description: this.pollForm.value.description,
        reactions: this.pollForm.value.reactions,
        answers: [],
        admins: [] 
      };

      // this.pollService.createPoll(pollData).subscribe({
      //   next: (poll: Poll) => {
      //     console.log('Enquete criada com sucesso:', poll);
      //     this.pollCreated = true;
      //     this.qrCodeUrl = `http://localhost:4200/answer-poll/${poll.id}`; // Substitua pela URL real da sua aplicação
      //     this.toastr.success('Enquete criada com sucesso!', 'Sucesso'); 
      //   },
      //   error: (error) => {
      //     console.error('Erro ao criar enquete:', error);
      //     this.errorMessage = 'Erro ao criar enquete. Por favor, tente novamente.';
      //     this.toastr.error(this.errorMessage, 'Erro'); 
      //   },
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });
    }
  }
}

