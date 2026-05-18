import Employee from '../models/Employee.js';

export const addEmployee = async (req, res, next) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;
    
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      res.status(400);
      throw new Error('Employee with this email already exists');
    }

    const employee = await Employee.create({
      name, email, department, skills, performanceScore, experience
    });

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const searchEmployees = async (req, res, next) => {
  try {
    const { department } = req.query;
    if (!department) {
      res.status(400);
      throw new Error('Department query parameter is required');
    }
    
    const employees = await Employee.find({ department: { $regex: new RegExp(department, 'i') } });
    res.json(employees);
  } catch (error) {
    next(error);
  }
};
