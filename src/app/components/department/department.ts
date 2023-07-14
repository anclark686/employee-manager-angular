import { Employee } from "../employee/employee";

export interface Department {
    id: number;
    name: string;
    manager: string;
    email: string;
    deptCode: string;
    employees: Employee[];
}