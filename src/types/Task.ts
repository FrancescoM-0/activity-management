class Task {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  dueDate: string;

  constructor(
    id: number,
    title: string,
    description: string,
    status: string,
    assignedTo: string,
    dueDate: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
  }
}

export default Task;
