// src/app/models/answer.model.ts

export interface Answer {
    id: string; // ID único da resposta
    pollId: string;
    name: string; // Nome do respondente
    reaction: string; // Reação escolhida pelo respondente
    description: string; // Descrição da reação (campo de texto livre)
    isValid: boolean; // Indica se a resposta foi validada pelo criador/administrador
}
