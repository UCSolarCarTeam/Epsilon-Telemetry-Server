const assert = require('chai').assert;
const expect = require('chai').expect;
const race = require('../scripts/race.js');

describe('race', function() {
  describe('calculateMotorDistance', function() {
    it('should get the average distance traveled between the first and last packets from the 2 odometers, returned in km', function() {
      // Arrays should be sorted newest first
      const packetArray = [
        {'motor0odometer': 10000, 'motor1odometer': 1000},
        {'motor0odometer': 5000, 'motor1odometer': 2000},
        {'motor0odometer': 5000, 'motor1odometer': 0},
      ];
      assert.equal(3.0, race.getDistanceTraveled(packetArray));
    });

    it('should accept negative numbers as valid inputs', function() {
      const packetArray = [
        {'motor0odometer': -10000, 'motor1odometer': -1000},
        {'motor0odometer': 5000, 'motor1odometer': 2000},
        {'motor0odometer': 5000, 'motor1odometer': 0},
      ];
      assert.equal(-8.0, race.getDistanceTraveled(packetArray));
    });

    it('should account for when a motor resets and jumps the odometer value to zero', function() {
      const packetArray = [
        {'motor0odometer': 10000, 'motor1odometer': 2000},
        {'motor0odometer': 0, 'motor1odometer': 1000},
        {'motor0odometer': 5000, 'motor1odometer': 1000},
        {'motor0odometer': 0, 'motor1odometer': 0},
      ];
      assert.equal(8.5, race.getDistanceTraveled(packetArray));
    });

    it('should not change the contents of the input array', function() {
      const expected = [
        {'motor0odometer': 10000, 'motor1odometer': 1000},
        {'motor0odometer': 5000, 'motor1odometer': 2000},
        {'motor0odometer': 5000, 'motor1odometer': 0},
      ];
      const actual = expected.slice(0);
      race.getDistanceTraveled(actual);

      expect(actual).to.have.ordered.deep.members(expected);
    });
  });
});
