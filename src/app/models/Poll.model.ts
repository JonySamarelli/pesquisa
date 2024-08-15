// src/app/models/poll.model.ts

import { Answer } from "./Answer.model";

export interface Poll {
    id: string; // ID único da enquete
    title: string; // Título da enquete
    description?: string; // Descrição opcional da enquete
    reactions: string[]; // Array de opções de reação (enum)
    answers: Answer[]; // Array de respostas da enquete
    admins: string[]; // Array de IDs dos administradores da enquete (além do criador)
    createdAt?: Date; // Data de criação da enquete (opcional)
}
  