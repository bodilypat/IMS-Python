Full-Stack-HRMS-Directory-Structure
│
backend/  # Python / Database: PostgreSQL, RESTfull APIs                          
├── app/                                    	
│   ├── main.py                        	                        	
│ 	├── core/ 
│   │   ├── config.py                    # Environment variables, secrets
│   │   ├── security.py                  # JWT, password hashing, token utilities 
│   │ 	└──   
│ 	├── database/ 
│   │   ├── session.py                   # SQLAlchemy session
│   │   ├── base.py                      # Base Metadata for models
│   │ 	└──                           	
│   ├── models/                          # SQLAlchemy ORM models
│   │   ├── user.py
│   │   ├── role.py
│   │   ├── employee.py                  # Employee DB model
│   │   ├── department.py                # Deparment table
│   │   ├── designation.py               # Designation table
│   │   ├── attendance.py                # Attendance table
│   │   ├── shift.py                     # Work shift timing
│   │   ├── leave_request.py             # Leave applications
│   │   ├── leave_type.py                # Sick, Casual, Paid 
│   │   ├── leave_balance.py             # Available leaves per employee     
│   │   ├── salary_structure.py          # Fixed salary components
│   │   ├── payroll.py                   # Monthly payroll
│   │   ├── payslip.py                   # Generated payslips        
│   │   ├── job.py                       # Job positions
│   │   ├── candidate.py                 # Applicant details
│   │   ├── interview.py                 # Interview rounds                                                              
│  	│   └── report_log.py
│   │	
│   ├── schemas/                         # Pydantic models for Request / Response schemas
│   │   ├── user.py
│   │   ├── auth.py
│   │   ├── employee.py
│   │   ├── department.py
│   │   ├── attendance.py               
│   │   ├── leave.py                   
│   │   ├── payroll.py                   
│   │   ├── recruitment.py
│  	│   └── reports.py                         	
│   ├── services/                        # Business logic per module
│   │   ├── auth_service.py             
│   │   ├── employee_service.py         
│   │   ├── attendance_service.py  
│   │   ├── leave_service.py  
│   │   ├── payroll_service.py           # Payroll logic
│  	│   └── recruitment_service.py
│   ├── api/                            	
│   │   ├── deps.py
│   │   └── routes/ 
│   │       ├── auth.py                 #api/routes/auth.py  @login endpoint
│   │       ├── employees.py
│   │       ├── attendance.py           # Attendance APIs
│   │       ├── leave.py                # Leave API
│   │       ├── payroll.py
│   │       ├── recruitment.py          # Recruitment APIs
│   │       └── reports.py                	
│   ├── middleware/                     # Middleware for RBAC, Loggic
│   │   ├── auth.py                	    #middleware/auth.py
│   │   ├── rbac.py                     # Role checks (HR/Admin)
│   │   └── 
│   │
│   ├── resource/                        			
│   │   └── views/ 
│   │   
│   ├── storage/                        
│   ├── tests/                          
│   └── composer.json
│ 
frontend/  # React / 
│ 
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/ 
│   │   ├── common/
│   │	│   ├── Button.jsx
│   │	│   ├── Input.jsx
│   │	│   ├── Modal.jsx
│   │	│   └── Loader.jsx
│   │   └── layout/
│   │	    ├── Header.jsx
│   │	    ├── Sidebar.jsx
│   │	    └── Footer.jsx
│   │   
│   ├── pages/
│   │   ├── auth/
│   │	│   ├── Login.jsx
│   │	│   └── Register.jsx
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   ├── employee/
│   │	│   ├── EmployeeList.jsx
│   │   │   └── EmployeeProfile.jsx
│   │   └── Leave/
│   │	    ├── ApplyLeave.jsx
│   │	    └── LeaveList.jsx
│   │ 
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── employeeService.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx 
│   └── utils/                     
│       ├── constants.js
│       └── helpers.js
│
├── App.jsx                                
├── main.jsx (or index.js)
└── README.md
