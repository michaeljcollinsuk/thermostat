function Thermostat() {
  this.DEFAULT_TEMP = 20;
  this.MEDIUM_USAGE_LIMIT = 25;
  this.LOW_USAGE_LIMIT = 18;
  this.temperature = this.DEFAULT_TEMP;
  this.powerSaving = true;
  this.maximumTemperature = 25
  this.minimumTemperature = 10;
  this.currentEnergyUsage = "medium"

};

Thermostat.prototype.increaseTemperature = function() {
  if(this.temperature === this.maximumTemperature) {
    throw new Error("Cannot increase above 25 degrees!")
  }
  this.temperature += 1;
  this._energyUsage();
};

Thermostat.prototype.decreaseTemperature = function () {
  if(this.temperature === 10) {
    throw new Error("Cannot decrease below 10 degrees!");
  }
    this.temperature -= 1;
    this._energyUsage();
};

Thermostat.prototype.switchPowerSaving = function() {
  if(this.powerSaving === true) {
  this.powerSaving = false;
  this.maximumTemperature = 32;
} else {
  this.powerSaving = true;
  this.maximumTemperature = 25;
  };
};

Thermostat.prototype.reset = function () {
  this.temperature = this.DEFAULT_TEMP;
  this._energyUsage();
};

Thermostat.prototype._energyUsage = function() {
  if (this.temperature < this.LOW_USAGE_LIMIT) {
    this.currentEnergyUsage = 'low';
  } else if(this.temperature > this.MEDIUM_USAGE_LIMIT){
    this.currentEnergyUsage = 'high';
  } else {
    this.currentEnergyUsage = 'medium';
  };
};
