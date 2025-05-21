"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_entity_1 = __importDefault(require("./employee.entity"));
const data_source_1 = __importDefault(require("./data-source"));
const employeeRouter = express_1.default.Router();
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
const employeeRepository = data_source_1.default.getRepository(employee_entity_1.default);
employeeRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).send(employees);
    const employees = yield employeeRepository.find();
    res.status(200).send(employees);
}));
employeeRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    // console.log(empId);
    const employee = yield employeeRepository.findOneBy({
        id: empId
    });
    res.status(200).send(employee);
}));
employeeRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const newEmployee = new employee_entity_1.default();
    newEmployee.email = req.body.email;
    newEmployee.name = req.body.name;
    // newEmployee.createdAt = new Date();
    // newEmployee.updatedAt = new Date();
    const employee = yield employeeRepository.save(newEmployee);
    res.status(200).send(employee);
}));
employeeRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const empId = Number(req.params["id"]);
    const userToRemove = yield employeeRepository.findOneBy({ id: empId });
    yield employeeRepository.remove(userToRemove);
    res.status(200).send();
}));
employeeRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
    const empId = Number(req.params["id"]);
    // userToUpdate.email = req.body.email;
    // userToUpdate.name = req.body.name;
    // userToUpdate.updatedAt = new Date();
    const employee = yield employeeRepository.update(empId, {
        email: req.body.email,
        name: req.body.name
    });
    const userToUpdate = yield employeeRepository.findOneBy({ id: empId });
    // console.log("update employees");
    res.status(200).send(userToUpdate);
}));
exports.default = employeeRouter;
//# sourceMappingURL=employee_router.js.map