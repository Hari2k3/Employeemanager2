import express from "express";
import Employee from "./employee.entity";
import datasource from "./data-source";
import { Entity } from "typeorm";
const employeeRouter = express.Router();
let count = 2;
// let employees: Employee[] = [
//   {
//     id: 1,
//     email: "employee1@gmail.com",
//     name: "Employee1",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 2,
//     email: "employee2@gmail.com",
//     name: "Employee2",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];


const employeeRepository = datasource.getRepository(Employee);
employeeRouter.get("/", async (req, res) => {
  // res.status(200).send(employees);
  
  const employees =  await employeeRepository.find();
  res.status(200).send(employees)
});

employeeRouter.get("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  // console.log(empId);
  const employee=await employeeRepository.findOneBy({
    id:empId
  });
  res.status(200).send(employee);
});

employeeRouter.post("/", async (req, res) => {
  // console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  // newEmployee.createdAt = new Date();
  // newEmployee.updatedAt = new Date();
  const employee=await employeeRepository.save(newEmployee);
  res.status(200).send(employee);
});

employeeRouter.delete("/:id", async (req, res) => {
  const empId = Number(req.params["id"]);
  const userToRemove = await employeeRepository.findOneBy({id:empId} );
  await employeeRepository.remove(userToRemove);
  res.status(200).send();
});

employeeRouter.put("/:id",async (req, res) => {
  // const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
  const empId = Number(req.params["id"]);
  
  // userToUpdate.email = req.body.email;
  // userToUpdate.name = req.body.name;
  // userToUpdate.updatedAt = new Date();
  const employee=await employeeRepository.update(empId,{
    email:req.body.email,
    name:req.body.name
  })
  const userToUpdate = await employeeRepository.findOneBy({id:empId} );
  // console.log("update employees");
  res.status(200).send(userToUpdate);
});

export default employeeRouter;
