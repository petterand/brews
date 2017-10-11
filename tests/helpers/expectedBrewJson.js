module.exports = {
   name: "Coffee oatmeal brown ale",
   version: "1",
   date: 1505685600000,
   batchSize: "23",
   boilSize: "28.01",
   boilTime: "60",
   brewer: "Petter Andersson",
   efficiency: "75",
   estFG: "1.012",
   estOG: "1.051",
   ibu: "17.8",
   type: "All Grain",
   estAbv: "5.1",
   calories: "168",
   estColor: "38.211342518663",
   notes: "",
   ibuMethod: "Tinseth",
   waters: "",
   fermentationStages: 1,
   primaryAge: "10",
   primaryTemp: "18",
   mashSteps: [
      {
         endTime: "67",
         infuseAmount: "10",
         name: "Mash In",
         rampTime: "0",
         stepTemp: "67",
         stepTime: "60",
         type: "Infusion",
         version: "1"
      }
   ],
   fermentables: [
      {
         amount: "3.4999977",
         color: "6",
         name: "Pale Ale (2-row)",
         type: "Grain",
         version: "1",
         yield: "80",
      },
      {
         amount: "0.3999997",
         color: "20.0000001",
         name: "Munich",
         type: "Grain",
         version: "1",
         yield: "78",
      },
      {
         amount: "0.2999998",
         color: "118.2",
         name: "Caramel/Crystal Malt - 60L",
         type: "Grain",
         version: "1",
         yield: "74",
      },
      {
         amount: "0.2999998",
         color: "1.97",
         name: "Oats, Flaked",
         type: "Grain",
         version: "1",
         yield: "80",
      },
      {
         amount: "0.2999998",
         color: "354.6",
         name: "Special B Malt",
         type: "Grain",
         version: "1",
         yield: "65.2",
      },
      {
         amount: "0.1999999",
         color: "128.05",
         name: "Brown Malt",
         type: "Grain",
         version: "1",
         yield: "70"
      },
      {
         amount: "0.1499999",
         color: "886.5",
         name: "Chocolate Malt",
         type: "Grain",
         version: "1",
         yield: "73"
      }
   ],
   hops: [
      {
         alpha: "4.5",
         amount: "0.03",
         form: "Pellet",
         name: "Fuggles",
         time: 60,
         use: "Boil",
         version: "1"
      },
      {
         alpha: "4.5",
         amount: "0.015",
         form: "Pellet",
         name: "Fuggles",
         time: 20,
         use: "Boil",
         version: "1"
      },
      {
         alpha: "4.5",
         amount: "0.015",
         form: "Pellet",
         name: "Fuggles",
         time: 0,
         use: "Hop Stand",
         version: "1"
      }
   ],
   yeasts: [
      {
         amount: "0.01",
         amountIsWeight: "true",
         attenuation: "75",
         form: "Dry",
         laboration: "",
         name: "London Ale Yeast",
         productId: "",
         type: "Ale",
         version: "1"
      }
   ],
   miscs: [
      {
         amount: "0.5",
         amountIsWeight: "false",
         name: "Coffee",
         time: "0",
         type: "Other",
         use: "Secondary",
         version: "1"
      }
   ]
};