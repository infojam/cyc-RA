
var rates = [
    { Id: 0, support: "A", cost: 0.3,   unit:   "alcUnit03_minutes",      isCurrent:true },
    { Id: 1, support: "A", cost: 1,     unit:   "alcUnit01_hours",      isCurrent:true },
    { Id: 2, support: "A", cost: 2,     unit:   "alcUnit02_days",       isCurrent:true },
    { Id: 3, support: "A", cost: 3,     unit:   "alcUnit04_night",      isCurrent:true },
    { Id: 4, support: "A", cost: 4,     unit:   "alcUnit05_sessions",   isCurrent:true },
    { Id: 5, support: "A", cost: 5,     unit:   "alcUnit06_weeks",      isCurrent:true },
    { Id: 6, support: "A", cost: 6,     unit:   "alcUnit07_placements", isCurrent:true },
    { Id: 7, support: "A", cost: 6,     unit:   "alcUnit08_journeys",   isCurrent:true },

    { Id: 10, support: "B", cost: 12.3, unit:   "alcUnit03_minutes",       isCurrent:true },
    { Id: 11, support: "B", cost: 12,   unit:   "alcUnit01_hours",       isCurrent:true },
    { Id: 12, support: "B", cost: 22,   unit:   "alcUnit02_days",        isCurrent:true },
    { Id: 13, support: "B", cost: 32,   unit:   "alcUnit04_night",       isCurrent:true },
    { Id: 14, support: "B", cost: 42,   unit:   "alcUnit05_sessions",    isCurrent:true },
    { Id: 15, support: "B", cost: 22,   unit:   "alcUnit06_weeks",       isCurrent:true },
    { Id: 16, support: "B", cost: 63,   unit:   "alcUnit07_placements",  isCurrent:true },
    { Id: 17, support: "B", cost: 62,   unit:   "alcUnit08_journeys",    isCurrent:true },

    { Id: 20, support: "C", cost: 3.3,  unit:   "alcUnit03_minutes",       isCurrent:true },
    { Id: 21, support: "C", cost: 3,    unit:   "alcUnit01_hours",         isCurrent:true },
    { Id: 22, support: "C", cost: 25,   unit:   "alcUnit02_days",         isCurrent:true },
    { Id: 23, support: "C", cost: 54,   unit:   "alcUnit04_night",        isCurrent:true },
    { Id: 24, support: "C", cost: 412,  unit:   "alcUnit05_sessions",    isCurrent:true },
    { Id: 25, support: "C", cost: 35,   unit:   "alcUnit06_weeks",        isCurrent:true },
    { Id: 26, support: "C", cost: 613,  unit:   "alcUnit07_placements",  isCurrent:true },
    { Id: 27, support: "C", cost: 65,   unit:   "alcUnit08_journeys",     isCurrent:true }
]
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

function getRates(supportType, unit) {
    var i;
    for (i = 0; i < rates.length; i++) {
        if (rates[i].support === supportType && rates[i].unit === unit) {
            return rates[i];
        }
    }
    //alert('Not Found');
}
function addToSupport(supportType, unit, sumOfUnits, when)
{
    var rate = getRates(supportType, unit);
    rate.sumOfUnits = sumOfUnits;
    rate.when = when;
    Support.push (rate);
    //console.log(Support);
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



createTableArray();

var output = "";
for (var index = 0; index < support.length; index++) {
    output += support[index].cost;
    
}

form.setAnswerText("TO", output);
