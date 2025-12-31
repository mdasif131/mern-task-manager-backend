import asycHandler from '../middlewares/asyncHandler.js';
import TaskModel from '../models/taskModel.js';

export const createTask = asycHandler(async (req, res) => {
  const taskData = {
    ...req.body,
    email: req.user.email,
  };

  const task = await TaskModel.create(taskData);

  res.status(201).json({
    status: 'success',
    data: task,
  });
});

export const deleteTask = asycHandler(async (req, res) => {
  try {
    const removed = await TaskModel.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      data: removed,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

export const updateTaskStatus = asycHandler(async (req, res) => {
  let reqBody = req.body;
  const { id } = req.params;
  const { status } = req.params;
  reqBody = { status: status };
  const updatedTask = await TaskModel.updateOne({ _id: id }, { $set: reqBody });

  if (!updatedTask) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.status(200).json({
    status: 'success',
    data: updatedTask,
  });
});

export const listTaskByStatus = asycHandler(async (req, res) => {
  try {
    let status = req.params.status;
    let email = req.user.email;
   const listTask = await TaskModel.aggregate([
     { $match: { status: { $regex: new RegExp(`^${status}$`, 'i') }, email: email } },
     {
       $project: {
         _id: 1,
         title: 1,
         description: 1,
         status: 1,
         createDate: {
           $dateToString: { date: '$createDate', format: '%d-%m-%Y' },
         },
       },
     },
   ]);
    res.status(200).json({status:"success", listTask})
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
});
export const taskStatusCount = asycHandler(async (req, res) => {
  try {
    let email = req.user.email;
    const countData =await TaskModel.aggregate([
      { $match: { email: email } },
      {$group:{_id:"$status", sum:{$count:{}}}}
    ])
    res.status(200).json({status:"success", data:countData})
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
});
