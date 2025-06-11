import Topic from '../models/Topic.js';
import User from '../models/User.js';

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    const user = await User.findById(req.user.id);
    res.status(200).json({ name: user.name, topics, completed: user.completedProblems});
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
