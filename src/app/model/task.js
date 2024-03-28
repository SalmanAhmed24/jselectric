import mongoose from "mongoose";

const taskModuleSchema = mongoose.Schema({
  currentDate: { type: String },
  user: { type: String },
  taskCategory: { type: String },
  dueDate: { type: String },
  description: { type: String },
  taskStatus: { type: String },
  taskPriority: { type: String },
  assignedTo: [
    {
      fullname: { type: String },
    },
  ],
  attachments: [
    {
      files: [
        {
          fileUrl: { type: String },
          filename: { type: String },
        },
      ],
      date: { type: String },
      user: { type: String },
    },
  ],
  subTasks: [
    {
      currentDate: { type: String },
      user: { type: String },
      taskCategory: { type: String },
      dueDate: { type: String },
      description: { type: String },
      taskStatus: { type: String },
      assignedTo: [
        {
          fullname: { type: String },
        },
      ],
    },
  ],
  notes: [
    {
      currentDate: { type: String },
      user: { type: String },
      noteCategory: { type: String },
      dueDate: { type: String },
      description: { type: String },
      noteStatus: { type: String },
    },
  ],
  selectedModule: [{ type: String }],
  moduleArr: [{ type: Object }],
  lastUpdated: { type: String },
  updated: { type: String },
});
export default mongoose.models.taskModuleSchema ||
  mongoose.model("tasks", taskModuleSchema);
