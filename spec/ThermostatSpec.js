'use strict';

describe('Thermostat', function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it("has a starting temperature of 20 degrees", function() {
    expect(thermostat.temperature).toEqual(20);
  });

  it('can increase the temperature', function() {
    thermostat.increaseTemperature();
    expect(thermostat.temperature).toEqual(21);
  });

  it('can decrease the temperature', function() {
    thermostat.decreaseTemperature();
    expect(thermostat.temperature).toEqual(19);
  });

  it('has a minimum temperature of 10 degrees', function() {
    expect(thermostat.minimumTemperature).toEqual(10);
  });

  it('cannot set temperature lower than 10 degrees', function() {
    for(var i = 20; i > 10; i--) {
      thermostat.decreaseTemperature();
    }
    expect(function(){thermostat.decreaseTemperature();} ).toThrowError("Cannot decrease below 10 degrees!")
    expect(thermostat.minimumTemperature).toEqual(10);
  });

  it('is in power saving mode by default', function() {
    expect(thermostat.powerSaving).toBeTruthy();
  });

  it('can turn on power saving mode', function() {
    thermostat.switchPowerSaving();
    thermostat.switchPowerSaving();
    expect(thermostat.powerSaving).toEqual(true);
    expect(thermostat.maximumTemperature).toEqual(25);
  });

  it('can reset the temperature to 20', function() {
    thermostat.reset();
    expect(thermostat.temperature).toEqual(20);
  });


  describe('energy usage', function() {

    it('has a default energy usage of black', function() {
      expect(thermostat.currentEnergyUsage).toEqual('medium');
    });

    it('sets the colour to green when the temperature is below 18', function() {
      for(var i = 20; i >= 18; i--) {
        thermostat.decreaseTemperature();
      }
      expect(thermostat.currentEnergyUsage).toEqual('low');
    });

    it('sets the colour to red when the temperature is above 25', function() {
      thermostat.switchPowerSaving();
      for(var i = 20; i <= 25; i++) {
        thermostat.increaseTemperature();
      }
      expect(thermostat.currentEnergyUsage).toEqual('high');
    });
  });


  describe('in power saving mode', function() {

    it('has a maximum temperature of 25', function() {
      expect(thermostat.maximumTemperature).toEqual(25);
    });

    it('cannot increase temperature above 25', function() {
      for(var i = 20; i < 25 ; i++) {
        thermostat.increaseTemperature();
      }
      expect(function(){thermostat.increaseTemperature();} ).toThrowError("Cannot increase above 25 degrees!")
      expect(thermostat.temperature).toEqual(25);
    });

    it('can turn off power saving mode', function() {
      thermostat.switchPowerSaving();
      expect(thermostat.powerSaving).toEqual(false);
      expect(thermostat.maximumTemperature).toEqual(32);
    });
  });
});
