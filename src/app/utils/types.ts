export interface IErrorAction {
  success: boolean;
  error?: string;
  task?: ITask;
}

export interface ITask {
  id: number;
  name: string;
}
