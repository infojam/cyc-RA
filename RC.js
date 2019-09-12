
var rates = [
    { Id: 0, support: "A", cost: 0.3, unit: "Minute", AnnualMultiplier:5, isCurrent:true },
    { Id: 1, support: "A", cost: 1, unit: "Hour", isCurrent:true },
    { Id: 2, support: "A", cost: 2, unit: "Day", isCurrent:true },
    { Id: 3, support: "A", cost: 3, unit: "Night", isCurrent:true },
    { Id: 4, support: "A", cost: 4, unit: "Sessions", isCurrent:true },
    { Id: 5, support: "A", cost: 5, unit: "Week", isCurrent:true },
    { Id: 6, support: "A", cost: 6, unit: "Placement", isCurrent:true },
    { Id: 7, support: "A", cost: 6, unit: "Journey", isCurrent:true },

    { Id: 10, support: "B", cost: 12.3, unit: "Minute", isCurrent:true },
    { Id: 11, support: "B", cost: 12, unit: "Hour", isCurrent:true },
    { Id: 12, support: "B", cost: 22, unit: "Day", isCurrent:true },
    { Id: 13, support: "B", cost: 32, unit: "Night", isCurrent:true },
    { Id: 14, support: "B", cost: 42, unit: "Sessions", isCurrent:true },
    { Id: 15, support: "B", cost: 22, unit: "Week", isCurrent:true },
    { Id: 16, support: "B", cost: 63, unit: "Placement", isCurrent:true },
    { Id: 17, support: "B", cost: 62, unit: "Journey", isCurrent:true },

    { Id: 20, support: "C", cost: 3.3, unit: "Minute", isCurrent:true },
    { Id: 21, support: "C", cost: 3, unit: "Hour", isCurrent:true },
    { Id: 22, support: "C", cost: 25, unit: "Day", isCurrent:true },
    { Id: 23, support: "C", cost: 54, unit: "Night", isCurrent:true },
    { Id: 24, support: "C", cost: 412, unit: "Sessions", isCurrent:true },
    { Id: 25, support: "C", cost: 35, unit: "Week", isCurrent:true },
    { Id: 26, support: "C", cost: 613, unit: "Placement", isCurrent:true },
    { Id: 27, support: "C", cost: 65, unit: "Journey", isCurrent:true }
]
var Frequency = [
    {type:"Daily", AnnualMultiplier:52},
    {type:"Weekly", AnnualMultiplier:52},
    {type:"Every 2 Weeks", AnnualMultiplier:25},
    {type:"Every 4 Weeks", AnnualMultiplier:15},
    {type:"Monthly", AnnualMultiplier:12},
    {type:"Annually", AnnualMultiplier:1},
    {type:"One Off", AnnualMultiplier:1},
]
var aryCosts = [];
var estimatedCost = 0;
var Support = [];

function addToSupport(supportType, unit, sumOfUnits, when)
{
    var rate = getRates(supportType, unit);
    rate.sumOfUnits = sumOfUnits;
    rate.when = when;
    Support.push (rate);
    console.log(Support);
    CalculateEstimatedCost();
}

function createTableArray()
{
    var pgC = form.getAnswerCollection("tablePaidSupportCalculator").getCursor();
    if (pgC.moveToFirst()) {
        do {
            //var row = {calc_When:"",calc_People:"",calc_TypeSupport:"",calcUnit:"",calcUnitsPerWeek:""};
            //row.calc_When = pgC.getAnswerText("calc_When");
            //row.calc_People = pgC.getAnswerText("calc_People");
            //row.calc_TypeSupport = pgC.getAnswerText("calc_TypeSupport");
            //row.calcUnit = pgC.getAnswerText("calcUnit");
            //row.calcUnitsPerWeek = pgC.getAnswerText("calcUnitsPerWeek");
            //aryCosts.push(row);
            addToSupport(pgC.getAnswerText("calc_TypeSupport"),pgC.getAnswerText("calcUnit"),pgC.getAnswerText("calcUnitsPerWeek"),pgC.getAnswerText("calc_When"));
        } while (pgC.moveToNext());
    }
}



var output = "";
for (var index = 0; index < aryCosts.length; index++) {
output += aryCosts[index].calc_People + "\n";
}

form.setAnswerText("TO", output);
//calc_When

//calc_People

//calc_TypeSupport

//calcUnit

//calcUnitsPerWeek