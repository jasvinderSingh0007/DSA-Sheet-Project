import User from '../models/User.js';

export const markProblemAsCompleted = async (req, res) => {
  try {
    const { problemName } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.completedProblems.includes(problemName)) {
      user.completedProblems.push(problemName);
    }else{
      user.completedProblems = user.completedProblems.filter(
        (name) => name !== problemName
      );
    }
    await user.save();

    res.status(200).json({ message: 'Marked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
