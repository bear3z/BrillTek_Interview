// Data
const factories = [
  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
  { name: "BR4", employees: [] }
];
const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
    {id: 1, name: "Alice", type: 2},
    {id: 2, name: "Bob", type: 3},
    {id: 3, name: "John", type: 2},
    {id: 4, name: "Karen", type: 1},
    {id: 5, name: "Miles", type: 3},
    {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id:  1, title: "task01", duration:  60}, //min
    {id:  2, title: "task02", duration: 120},
    {id:  3, title: "task03", duration: 180},
    {id:  4, title: "task04", duration: 360},
    {id:  5, title: "task05", duration:  30},
    {id:  6, title: "task06", duration: 220},
    {id:  7, title: "task07", duration: 640},
    {id:  8, title: "task08", duration: 250},
    {id:  9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration:  45},
    {id: 13, title: "task13", duration:  86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];
// End of Data

// Part 1
// 1. Count Employees Number by Factory // => [ {name: 'BR1', count: 4}, ... ]
const employeesNumberByFactory = (factories) => {
    const result = factories.map(factory => (
        {
            name: factory.name,
            count: factory.employees.length
        }
    ));
    return result;
}
let ans1 = employeesNumberByFactory(factories);
console.log("Q1: ");
console.log(ans1);

// 2. Count Factories Number by Employee // => [ {employee: 'John', count: 2}, ... ]
const factoriesNumberByEmployee = (factories) =>{
    const employeeTemp = []
    const recorded = []

    factories.forEach((factory) => {
        factory.employees.forEach((employee) => {
            if(recorded.includes(employee)){
                employeeTemp.find(employeeElement => employee === employeeElement.employee).count++;
            } else{
                recorded.push(employee);
                employeeTemp.push({ employee, count: 1 });
            }
        });
    });
    return employeeTemp;
};
let ans2 = factoriesNumberByEmployee(factories);
console.log("Q2: ")
console.log(ans2)

// 3. Order employees list by alphabetical order // =>   { name: "BR2", employees: ["Jessie", "John", "Karen"] }
const orderEmployeesList = (factories) => {
    let factoriesCloned = factories.map(x => ({
        name: x.name,
        employees: [...x.employees]
    }));

    factoriesCloned.forEach(factory => {
        factory.employees.sort();
    });

    return factoriesCloned;
};
let ans3 = orderEmployeesList(factories);
console.log("Q3: ");
console.log(ans3)

// End of Part 1

// Part 2
//4. Count total hours worked in 1 day ? // => 39 (I think the original answer is wrong, and the right answer is 42 hours.)
const totalHours = (employees) => {
    let Employees = employees.map((employee) => {
        let mappedType = employeeType.filter(type => type.id == employee.type)[0];
        let Employee = {
            name: employee.name,
            work_begin: Date.parse('1/1/2022 ' + mappedType.work_begin),
            work_end: Date.parse('1/1/2022 ' + (mappedType.work_end == '00:00:00' ? '24:00:00' : mappedType.work_end)),
        };
        return Employee;
    });

    let totalTime = Employees.reduce((previous, current) => {
        return previous + (current.work_end - current.work_begin);
    }, 0);
    return totalTime / (60 * 60 * 1000);
}
let ans4 = totalHours(employees);
console.log("Q4: ");
console.log(ans4)

// 5. Make a function that take as parameters dayTime and return number of employee working // howManyEmployeeByTime(time) => int
const howManyEmployeeByTime = (time) => {
    // Assume the format looks like "hh/mm/ss"
    time = Date.parse('1/1/2022 ' + (time == '00:00:00' ? '24:00:00' : time));
    let Employees = employees.map((employee) => {
        let mappedType = employeeType.filter(type => type.id == employee.type)[0];
        let Employee = {
            name: employee.name,
            work_begin: Date.parse('1/1/2022 ' + mappedType.work_begin),
            work_end: Date.parse('1/1/2022 ' + (mappedType.work_end == '00:00:00' ? '24:00:00' : mappedType.work_end)),
        }
        return Employee;
    })
    return Employees.filter(employee => employee.work_begin <= time && time <= employee.work_end).length;
}
let ans5 = howManyEmployeeByTime("12:12:12");
console.log("Q5: ");
console.log(ans5);

// 6. How many days of work needed to done all tasks ? // => 1 day = 9:00 to 00:00 between 00:00 and 09:00 doesnt count.
const totalDays = tasks => {
    let totalTimes = 0;
    tasks.forEach(task => {
        totalTimes += task.duration;
    });

    return Math.ceil(totalTimes / 60 / totalHours(employees, employeeType))
}
let ans6 = totalDays(tasks);
console.log("Q6: ");
console.log(ans6);

// End of Part 2