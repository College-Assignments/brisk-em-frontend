export interface IQuiz {
  userId: string;
  title: string;
  questions: IQuestion[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  title: string;
  answer: string;
  questionId: string;
  options: [
    {
      title: string;
      optionId: string;
    }
  ];
}
