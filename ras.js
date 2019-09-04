///TODO - Handle dates

//Weekly budget - is this the annual budget / 52

//Weekly Budget

//QUESTION - How is daily paid when its a weekly calculation?

//Daily is Weekly / 7
//Weekly is Weekly
//2 weeks
var rates = [
    { Id: 0, support: "Support 1", cost: 0.3, unit: "Minute", AnnualMultiplier:5, isCurrent:true },
    { Id: 1, support: "Support 1", cost: 1, unit: "Hour", isCurrent:true },
    { Id: 2, support: "Support 1", cost: 2, unit: "Day", isCurrent:true },
    { Id: 3, support: "Support 1", cost: 3, unit: "Night", isCurrent:true },
    { Id: 4, support: "Support 1", cost: 4, unit: "Sessions", isCurrent:true },
    { Id: 5, support: "Support 1", cost: 5, unit: "Week", isCurrent:true },
    { Id: 6, support: "Support 1", cost: 6, unit: "Placement", isCurrent:true },
    { Id: 7, support: "Support 1", cost: 6, unit: "Journey", isCurrent:true },

    { Id: 10, support: "Support 2", cost: 12.3, unit: "Minute", isCurrent:true },
    { Id: 11, support: "Support 2", cost: 12, unit: "Hour", isCurrent:true },
    { Id: 12, support: "Support 2", cost: 22, unit: "Day", isCurrent:true },
    { Id: 13, support: "Support 2", cost: 32, unit: "Night", isCurrent:true },
    { Id: 14, support: "Support 2", cost: 42, unit: "Sessions", isCurrent:true },
    { Id: 15, support: "Support 2", cost: 22, unit: "Week", isCurrent:true },
    { Id: 16, support: "Support 2", cost: 63, unit: "Placement", isCurrent:true },
    { Id: 17, support: "Support 2", cost: 62, unit: "Journey", isCurrent:true },

    { Id: 20, support: "Support 3", cost: 3.3, unit: "Minute", isCurrent:true },
    { Id: 21, support: "Support 3", cost: 3, unit: "Hour", isCurrent:true },
    { Id: 22, support: "Support 3", cost: 25, unit: "Day", isCurrent:true },
    { Id: 23, support: "Support 3", cost: 54, unit: "Night", isCurrent:true },
    { Id: 24, support: "Support 3", cost: 412, unit: "Sessions", isCurrent:true },
    { Id: 25, support: "Support 3", cost: 35, unit: "Week", isCurrent:true },
    { Id: 26, support: "Support 3", cost: 613, unit: "Placement", isCurrent:true },
    { Id: 27, support: "Support 3", cost: 65, unit: "Journey", isCurrent:true }
]

//TODO - Change these
var Frequency = [
    {type:"Daily", AnnualMultiplier:52},
    {type:"Weekly", AnnualMultiplier:52},
    {type:"Every 2 Weeks", AnnualMultiplier:25},
    {type:"Every 4 Weeks", AnnualMultiplier:15},
    {type:"Monthly", AnnualMultiplier:12},
    {type:"Annually", AnnualMultiplier:1},
    {type:"One Off", AnnualMultiplier:1},
]

var estimatedCost = 0;

var Support = [];

function getRates(supportType, unit) {
    var i;
    for (i = 0; i < rates.length; i++) {
        if (rates[i].support === supportType && rates[i].unit === unit) {
            return rates[i];
        }
    }
    alert('Not Found');
}

function addToSupport(supportType, unit, sumOfUnits, when)
{
    var rate = getRates(supportType, unit);
    rate.sumOfUnits = sumOfUnits;
    rate.when = when;
    Support.push (rate);
    console.log(Support);
    CalculateEstimatedCost();
}


function getFrequency(type)
{
    var i;
    for (i = 0; i < Frequency.length; i++) {
        if (Frequency[i].type === type) {
            return Frequency[i];
        }
    }
}

function CalculateEstimatedCost()
{
    var total = 0;
    var annualTotal = 0;
    var i;
    for (i = 0; i < Support.length; i++) {
        total +=  (Support[i].cost * Support[i].sumOfUnits);
        annualTotal += ((Support[i].cost * Support[i].sumOfUnits) * getFrequency(Support[i].when).AnnualMultiplier);
    }

    //Set Weekly budget
    document.getElementById("estBudget").value = total;
    //Set Annual Budget
    document.getElementById("estYearBudget").value = annualTotal;
}



//When - Daily, Weekly, Every 2 Weeks, Every 4 weeks, Monthly, Annually, One off
//People I need - Single Staff, Double Staff, other
//Type of support - Drop down
// Unit Minute, Hour, Day, Night, Sessions, Week, Placement, Journey

//Emulation Funcitons
function addRow() {
    var table = document.getElementById("rasBody");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0); cell1.innerHTML = "...";
    var cell2 = row.insertCell(1); cell2.innerHTML = "...";
    var when = document.getElementById("when").value; var cell3 = row.insertCell(2); cell3.innerHTML = when;
    var type = document.getElementById("type").value; var cell4 = row.insertCell(3); cell4.innerHTML = type;
    var unit = document.getElementById("unit").value; var cell5 = row.insertCell(4); cell5.innerHTML = unit;
    var mon = document.getElementById("mon").value; var cell6 = row.insertCell(5); cell6.innerHTML = mon;
    var tue = document.getElementById("tue").value; var cell7 = row.insertCell(6); cell7.innerHTML = tue;
    var wed = document.getElementById("wed").value; var cell8 = row.insertCell(7); cell8.innerHTML = wed;
    var thur = document.getElementById("thur").value; var cell9 = row.insertCell(8); cell9.innerHTML = thur;
    var fri = document.getElementById("fri").value; var cell10 = row.insertCell(9); cell10.innerHTML = fri;
    var sat = document.getElementById("sat").value; var cell11 = row.insertCell(10); cell11.innerHTML = sat;
    var sun = document.getElementById("sun").value; var cell12 = row.insertCell(10); cell12.innerHTML = sun;
addToSupport(type,unit,parseInt(mon,10) + parseInt(tue,10) + parseInt(wed,10) + parseInt(thur,10) + parseInt(fri,10) + parseInt(sat,10) + parseInt(sun,10),when);

}
