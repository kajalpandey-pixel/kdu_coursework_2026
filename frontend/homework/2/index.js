const employee = {
  id: null,
  name: "",
  age: 0,
  salary: 0,
  department: "",
  skills: [],
  experience: 0
};
const employee1 = {
  
  id: 1,
  name: "Alice Johnson",
  age: 30,
  salary: 85000,
  department: "Engineering",
  skills: ["JavaScript", "React", "Node.js"],
  experience: 5
};

const employee2 = {
  
  id: 2,
  name: "Kajal",
  age: 20,
  salary: 35000,
  department: "Engineering",
  skills: ["JavaScript", "React"],
  experience: 2
};

const employee3 = {
  
  id: 3,
  name: "Isha",
  age: 21,
  salary: 55000,
  department: "Science",
  skills: ["Python"],
  experience: 1
};

const employee4 = {
  
  id: 4,
  name: "Barsha",
  age: 22,
  salary: 45000,
  department: "Arts",
  skills: ["Design"],
  experience: 0
};

const employee5 = {
  
  id: 5,
  name: "Pranjali",
  age: 28,
  salary: 90000,
  department: "Management",
  skills: ["Leadership"],
  experience: 10
};
   



function getEmployeeInfo(employee1){
          return `${employee1.name} works in ${employee1.department} and earns $${employee1.salary}`;
}

console.log (getEmployeeInfo(employee1));  


function addSkill(employee2, newSkill){
          employee2.skills.push(newSkill); 

          // so that we can see the updated skills
            return employee2.skills;
} 


employee1.getAllInfo = function() {
          return `Name: ${this.name}, Age: ${this.age}, Salary: ${this.salary}, Department: ${this.department}, Skills: ${this.skills.join(", ")}, Experience: ${this.experience} years`;
}   


function hasMoreSkills(employee3, otherEmployee){
           flag = employee3.skills.length > otherEmployee.skills.length;
           if(flag){
                      return `${employee3.name} has more skills than ${otherEmployee.name}`;
           }
           else {
                      return `${otherEmployee.name} has more skills than ${employee3.name}`;
           }    
}   


const employees = [employee1, employee2, employee3, employee4, employee5];  

for(let emp of employees){
          console.log(emp.getAllInfo());
}  

const minExperience = prompt("Enter minimum years of experience , you want to filter employees by: ");

function filterByExperience(employees, minExperience){ 

         const filterList =  employees.filter(emp => emp.experience >= minExperience);   
                return filterList; 
      
 }
 
 filterByExperience(employees, minExperience) ; 


 function summaryReport(employees){
         
         return  employees.map(emp => {
                    console.log(`${emp.name}(${emp.department}) Salary : ${emp.salary}`);
         })

 }

 console.log(summaryReport(employees));  



    function AverageSalary(employees){
         
         const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
         return totalSalary / employees.length;
    }   

    console.log(`Average Salary: ${AverageSalary(employees)}`);


 function departmentWiseCount(employees){
         // here acc is an object 
           return employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});


  }

 console.log(departmentWiseCount(employees));
 


  // as we don't want to modify the original array, we create a copy of it   
const tempEmployees = [...employees]

tempEmployees.sort((a, b) => b.experience - a.experience)  ;

console.log(tempEmployees.map(emp => `${emp.name}: ${emp.experience} years`)); 


  
console.log(`Highest paid Employee: ${tempEmployees[0].name} `)  ;



// destructing on objects ; 


const {name, department, salary} = employee1;
console.log(`Name: ${name}, Department: ${department}, Salary: ${salary}`);     





console.log(`Top Paid Employee: ${findtopPaidEmployee(...employees).name}`);



function findTopPaidEmployee(...employees) {
  const sorted = [...employees].sort((a, b) => b.salary - a.salary);
  return { name: sorted[0].name, salary: sorted[0].salary };
}

console.log(`Top Paid Employee: ${findTopPaidEmployee(...employees).name} : ${findTopPaidEmployee(...employees).salary}`);


function findBottomPaidEmployee(...employees) {
  const sorted = [...employees].sort((a, b) => a.salary - b.salary);
  return { name: sorted[0].name, salary: sorted[0].salary };
}

console.log(`Bottom Paid Employee: ${findBottomPaidEmployee(...employees).name} : ${findBottomPaidEmployee(...employees).salary}`);




function joinSkills(employee1, employee2){
       const skillsSet = new Set([...employee1.skills, ...employee2.skills]);
       return Array.from(skillsSet);
}  

console.log(`Combined Skills: ${joinSkills(employee1, employee2).join(", ")}`);



function totalNumberofEmployees(emp1 , emp2 , ...employees){
       
        return 2 + employees.length;
}   

console.log(`Total Number of Employees: ${totalNumberofEmployees(employee1, employee2, employee3, employee4, employee5)}`);

function avgAge(emp1 , emp2 , ...employees){
       
        const totalAge = emp1.age + emp2.age + employees.reduce((acc, emp) => acc + emp.age, 0);
        const totalEmployees = 2 + employees.length;
        return totalAge / totalEmployees;
}   
console.log(`Average Age of Employees: ${avgAge(employee1, employee2, employee3, employee4, employee5)}`);





function countSkills(employees) {
  return employees.reduce((acc, emp) => {
    emp.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {});
}
console.log('Skill Count:', countSkills(employees));


