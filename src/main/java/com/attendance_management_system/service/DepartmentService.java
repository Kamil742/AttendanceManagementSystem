package com.attendance_management_system.service;

import com.attendance_management_system.model.Department;
import com.attendance_management_system.exceptions.CustomException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DepartmentService {
    Department createDepartment(Department department) throws CustomException;
    Department getDepartmentById(Long departmentId) throws CustomException;

    List<Department> getAllDepartments() throws CustomException;
    Department updateDepartment(Long departmentId, Department department) throws CustomException;
    void deleteDepartment(Long departmentId) throws CustomException;
}
