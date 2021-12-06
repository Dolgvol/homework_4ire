 
 const plants = {
   minAmount: 2, 
   maxAmount: 4, 
   minValue: 1, 
   maxValue: 100
 }

 const panels = {
   minAmount: 0, 
   maxAmount: 100, 
   minValue: 1, 
   maxValue: 5
 }

 const houses = {
   minAmount: 100, 
   maxAmount: 400,
   minValue: 1, 
   maxValue: 400,
   dayСonsum: 4, 
   nightСonsum: 1
 }

 const lines = {
   minAmount: 1, 
   maxAmount: 100, 
   minValue: 1, 
   maxValue: 5,
   minPrice: 1000,
   maxPrice: 3000
 }


 function getRandomInt(min, max) {
   return Math.round(Math.random() * (max - min)) + min; 
 }


 function ElectricNetwork(nightDuration, plants, panels, houses, lines) {

   let night = nightDuration;
   let day = 24 - nightDuration;


   function calcTotal({minAmount, maxAmount, minValue, maxValue}) {
      let amount = getRandomInt(minAmount, maxAmount);
      let total = 0;
      for (let i = 0; i < amount; i++) {
         total += getRandomInt(minValue, maxValue);
      }
      return total;
   }
   
   let plantsTotal = calcTotal(plants);
   this.plants = {
       dayEnergy: (plantsTotal / 24) * day,
       nigthEnergy: (plantsTotal / 24) * night
   }

   this.panels = {
      dayEnergy: calcTotal(panels),
      nigthEnergy: 0
   }

   let housesTotal = calcTotal(houses);
   this.houses = {
      dayEnergy: -(housesTotal * houses.dayСonsum) / 1000,
      nigthEnergy: -(housesTotal * houses.nightСonsum) / 1000
   }


   function createLines({minAmount, maxAmount, minValue, maxValue, minPrice, maxPrice}) {      
      let amount = getRandomInt(minAmount, maxAmount);
      let arrOfLines = [];
      for (let i = 0; i < amount; i++) {
         const energy = getRandomInt(minValue, maxValue);
         const line = {
            dayEnergy: (energy / 24) * day,
            nigthEnergy: (energy / 24) * night,
            price: getRandomInt(minPrice, maxPrice)
         }
         arrOfLines.push(line);
      }
      return arrOfLines.sort((a, b) => a.price - b.price);
   }

   this.lines = createLines(lines);
 }

 let network = new ElectricNetwork(12, plants, panels, houses, lines);



 function calcBalance(network, isNight=false) {

   function createResult(energy, money, sign) {
      let result = {};
      result.energy = Number(energy).toFixed(3);
      result.money = Number(money).toFixed(2)*sign;
      return result;
   }

   let energyType = null;
   if (isNight) {
   energyType = 'nigthEnergy';
   } else {
   energyType = 'dayEnergy';
   }

   let allEnergy = 0;
   for (const key in network) {
      if (network[key][energyType]) {
         allEnergy += network[key][energyType];
      } 
   }
   allEnergy = Number(allEnergy).toFixed(3);


   let lines = [];
   let sign = null;
   let money = 0;
   let energy = 0;

   if (allEnergy > 0) {
      lines = network.lines.reverse(); 
      sign = 1;

   } else if (allEnergy < 0) {
      lines = network.lines;
      allEnergy = allEnergy*(-1);
      sign = -1;

   } else {
      return createResult(energy, money, sign);
   }


   for (const line of lines) {

      if (line[energyType] < allEnergy) {
         money += line[energyType] * line.price;
         energy += line[energyType];
         allEnergy -= line[energyType];
         
      } else if (line[energyType] >= allEnergy) {
         money += allEnergy * line.price;
         energy += allEnergy;
         return createResult(energy, money, sign);
      }
   }

   return createResult(energy, money, sign);
 }


 function printBalance(balance) {
    if (balance.money > 0) {
      return 'город продаст ' + balance.energy + ' МВт энергии и заработает ' + balance.money + ' грн';
    } else if (balance.money < 0) {
      return 'город закупит ' + balance.energy + ' МВт энергии и потратит ' + balance.money*(-1) + ' грн';
    } else {
       return 'город выйдет в 0';
    }    
 }

   let dayBalance = calcBalance(network);
   let nigthBalance = calcBalance(network, true);
 
   console.log('Днем', printBalance(dayBalance));
   console.log('Ночью',printBalance(nigthBalance));
