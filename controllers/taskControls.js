import Task from "../models/taskSchema.js"

export const createTask = async (req, res) => {
  try {
    const { title, due, priority, reminder } = req.body;

 const newTask = new Task({
  title,
  due,
  priority,
  reminder,
  user: req.user._id,  // ✅ not req.user.id
});

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ error: "Server Error while creating task" });
  }
};

// READ
export const getTasks = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized. No user ID." });
    }

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// UPDATE
export const updateTask = async (req, res) => {
  try {
  const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    console.log("Delete request:", id, "by user:", userId);

    const task = await Task.findById(id);
    if (!task) {
      console.log("❌ Task not found");
      return res.status(404).json({ error: "Task not found" });
    }

    if (task.user.toString() !== userId.toString()) {
      console.log("❌ Task doesn't belong to user");
      return res.status(403).json({ error: "Unauthorized to delete this task" });
    }

    const deleted = await Task.findOneAndDelete({ _id: id, user: userId });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found for deletion" });
    }

    console.log("✅ Task deleted");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("❌ DELETE /tasks/:id Internal Error:", err);
    res.status(500).json({ error: "Server error during task deletion" });
  }
};

