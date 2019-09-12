//TODO - P1 - Change support type to drop down
//TODO - P1 - Update frequency table
//TODO - P3 - Get rates from seperate hidden table
//TODO - p2 - Handle errors
//TODO - P1 - Handle people I need


var rates = [
    { Id: 0, support: "A", cost: 0.3,   unit:   "calcUnit03_minutes",      isCurrent:true },
    { Id: 1, support: "A", cost: 1,     unit:   "calcUnit01_hours",      isCurrent:true },
    { Id: 2, support: "A", cost: 2,     unit:   "calcUnit02_days",       isCurrent:true },
    { Id: 3, support: "A", cost: 3,     unit:   "calcUnit04_night",      isCurrent:true },
    { Id: 4, support: "A", cost: 4,     unit:   "calcUnit05_sessions",   isCurrent:true },
    { Id: 5, support: "A", cost: 5,     unit:   "calcUnit06_weeks",      isCurrent:true },
    { Id: 6, support: "A", cost: 6,     unit:   "calcUnit07_placements", isCurrent:true },
    { Id: 7, support: "A", cost: 6,     unit:   "calcUnit08_journeys",   isCurrent:true },

    { Id: 10, support: "B", cost: 12.3, unit:   "calcUnit03_minutes",       isCurrent:true },
    { Id: 11, support: "B", cost: 12,   unit:   "calcUnit01_hours",       isCurrent:true },
    { Id: 12, support: "B", cost: 22,   unit:   "calcUnit02_days",        isCurrent:true },
    { Id: 13, support: "B", cost: 32,   unit:   "calcUnit04_night",       isCurrent:true },
    { Id: 14, support: "B", cost: 42,   unit:   "calcUnit05_sessions",    isCurrent:true },
    { Id: 15, support: "B", cost: 22,   unit:   "calcUnit06_weeks",       isCurrent:true },
    { Id: 16, support: "B", cost: 63,   unit:   "calcUnit07_placements",  isCurrent:true },
    { Id: 17, support: "B", cost: 62,   unit:   "calcUnit08_journeys",    isCurrent:true },

    { Id: 20, support: "C", cost: 3.3,  unit:   "calcUnit03_minutes",       isCurrent:true },
    { Id: 21, support: "C", cost: 3,    unit:   "calcUnit01_hours",         isCurrent:true },
    { Id: 22, support: "C", cost: 25,   unit:   "calcUnit02_days",         isCurrent:true },
    { Id: 23, support: "C", cost: 54,   unit:   "calcUnit04_night",        isCurrent:true },
    { Id: 24, support: "C", cost: 412,  unit:   "calcUnit05_sessions",    isCurrent:true },
    { Id: 25, support: "C", cost: 35,   unit:   "calcUnit06_weeks",        isCurrent:true },
    { Id: 26, support: "C", cost: 613,  unit:   "calcUnit07_placements",  isCurrent:true },
    { Id: 27, support: "C", cost: 65,   unit:   "calcUnit08_journeys",     isCurrent:true }
]

//CHANGE Frequency here
var Frequency = [
    {type:"001Daily", AnnualMultiplier:52},
    {type:"002Weekly", AnnualMultiplier:52},
    {type:"003_2Weeks", AnnualMultiplier:25},
    {type:"004_4Weeks", AnnualMultiplier:15},
    {type:"005Monthly", AnnualMultiplier:12},
    {type:"006Annually", AnnualMultiplier:1},
    {type:"007OneOff", AnnualMultiplier:1},
]
var aryCosts = [];
var estimatedCost = 0;
var estBudget = 0;
var estAnnualBudget = 0;
var Support = [];

///This will error if no combination found.
function getRates(supportType, unit) {
    var i;
    for (i = 0; i < rates.length; i++) {
        if (rates[i].support === supportType && rates[i].unit === unit) {
            return rates[i];
        }
    }
    //TODO Error here
    //alert('Not Found');
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

function createTableArray()
{
    var pgC = form.getAnswerCollection("tablePaidSupportCalculator").getCursor();
    if (pgC.moveToFirst()) {
        do {
            addToSupport(
                pgC.getAnswerText("calc_TypeSupport"),
                pgC.getAnswerText("calcUnit"),
                pgC.getAnswerText("calcUnitsPerWeek"),
                pgC.getAnswerText("calc_When"));
        } while (pgC.moveToNext());
    }
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
    estBudget = total;
    //Set Annual Budget
    estAnnualBudget= annualTotal;
}

createTableArray();
CalculateEstimatedCost();
form.setAnswerText("TO", "Est Budget=" + estBudget + "\n" + "Est Annual= " + estAnnualBudget);
form.setAnswerText("calc_WeeklyTotal",estBudget);
form.setAnswerText("calc_AnnualTotal",estAnnualBudget);
