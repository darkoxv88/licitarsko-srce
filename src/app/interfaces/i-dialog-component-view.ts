export interface IDialogComponentView<T, D> {
  disable(): boolean;
  setData(data: T): void;
  getData(): D;
}
