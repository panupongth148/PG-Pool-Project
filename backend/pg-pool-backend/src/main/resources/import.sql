

INSERT INTO employee(emp_no, first_name,last_name,tel, email, salary, hire_date, expire_date, position) VALUES (1, 'Tony','Stark', '0912345678', 'smokyowen1@gmail.com', 12000.00, '2000-09-22', '1988-09-29','programmer');
INSERT INTO employee(emp_no, first_name,last_name,tel, email, salary, hire_date, expire_date, position) VALUES (2, 'Bruce','Wanye', '0912345678', 'smokyowen2@gmail.com', 12000.00, '1988-09-22', '1988-09-29','programmer');
INSERT INTO employee(emp_no, first_name,last_name,tel, email, salary, hire_date, expire_date, position) VALUES (3, 'Tony','Stark', '0912345878', 'smokyowen3@gmail.com', 12000.00, '1988-09-22', '1988-09-29','analysis');

INSERT INTO project(project_id,project_code,project_name,progress, contract_start, contract_end) VALUES (1, 'val2566','Varolant', 0.0, '1988-08-22', '1989-09-29');

INSERT INTO employee_project(emp_pro_id, project_id, emp_no, start_date, end_date, duration, assigned) VALUES(1, 1, 1, '1988-08-22', '1989-09-20', 0.0, 0.0);

INSERT INTO employee_project(emp_pro_id, project_id, emp_no, start_date, end_date, duration, assigned) VALUES(2, 1, 3, '1988-08-22', '1989-09-25', 0.0, 0.0);

