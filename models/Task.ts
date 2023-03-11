import mongoose from 'mongoose';


export interface ITask extends mongoose.Document {
  id: any;
    name: string;
    date: string;
    reminder: boolean;
}

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add some text']
  },
 date: {
    type: String,
    required: [true, 'Please add a date']
  },
  reminder: {
    type: Boolean,
    required: true
}
})


export default mongoose.model<ITask>('Task', TaskSchema);