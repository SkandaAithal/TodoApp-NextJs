import mongoose, { Schema, model } from "mongoose";
mongoose.Promise = global.Promise;
const TodoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});
const todosCollection =
  mongoose.models.todocollection || model("todocollection", TodoSchema);
export default todosCollection;
