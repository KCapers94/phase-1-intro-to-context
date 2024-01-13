// Your code here
const Array = ['', 'String', 'String', 'Number',]

function createEmployeeRecord(employeeArray) {
    return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents:[],
}
}
function createEmployeeRecords (arrayOfArrays) {
let arrayOfObjects = []
arrayOfArrays.forEach((element) => arrayOfObjects.push(createEmployeeRecord(element)));
return arrayOfObjects;
}

function createTimeInEvent (employeeRecord, dateStamp) {
    let timeInEventsObject = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(" ")[1]),
        date:dateStamp.split(" ")[0],
        
    }
    employeeRecord['timeInEvents'].push(timeInEventsObject)
    return employeeRecord
}

function createTimeOutEvent (employeeRecord, dateStamp) {
    let timeOutEventObject = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(" ")[1]),
        date:dateStamp.split(" ")[0],
    }
    employeeRecord['timeOutEvents'].push(timeOutEventObject)
    return employeeRecord
}

function hoursWorkedOnDate (employeeRecord, dateOfTheForm) {
  let timeInObject = employeeRecord['timeInEvents'].find((element) => dateOfTheForm === element ['date'])
  let timeOutObject = employeeRecord['timeOutEvents'].find((element) => dateOfTheForm === element ['date'])
  return (timeOutObject['hour'] - timeInObject['hour']) / 100
}

function wagesEarnedOnDate (employeeRecord, dateOfTheForm) {
     let wagesEarnedObject = employeeRecord['payPerHour']
     console.log(wagesEarnedObject)
     return wagesEarnedObject * hoursWorkedOnDate(employeeRecord, dateOfTheForm) 
}

function allWagesFor (employeeRecord) {
    let daysWorked = employeeRecord['timeInEvents'].map(timeInObj => timeInObj.date)
    let allWagesEarned = daysWorked.reduce((acc, day) => acc + wagesEarnedOnDate(employeeRecord, day),0)
    return allWagesEarned
}

function calculatePayroll (employeeRecords) {
    let payRollArray = employeeRecords.reduce((acc, employeeRecord) => acc + allWagesFor(employeeRecord),0)
    return payRollArray
}
    
