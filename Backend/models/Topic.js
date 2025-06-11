import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  name: String,
  youtube: String,
  article: String,
  leetcode: String,
  level: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  status: { type: String, enum: ['Done', 'Pending'] }
});

const topicSchema = new mongoose.Schema({
  title: String,
  problems: [problemSchema],
});

export default mongoose.model('Topic', topicSchema);