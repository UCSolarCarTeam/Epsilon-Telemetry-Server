module.exports.getAveragePackCurrent = function(packetArray) {
    let totalPackCurrent = 0;
    for (let i = 0; i < packetArray.length; ++i) {
        totalPackCurrent += packetArray[i].packcurrent;
    }
    const averagePackCurrent = totalPackCurrent / packetArray.length;
    return Number(averagePackCurrent.toFixed(2));
};

module.exports.getSecondsRemainingUntilChargedOrDepleted = function(averagePackCurrent, packAmpHours) {
    if (averagePackCurrent == 0) {
        return -1;
    }
    let amphoursLeft = 0;
    if (averagePackCurrent >= 0) {
        amphoursLeft = packAmpHours;
    } else {
        amphoursLeft = 165.6 - packAmpHours;
    }
    let hoursUntilChargedOrDepleted = amphoursLeft / Math.abs(averagePackCurrent);
    let secondsUntilChargedOrDepleted = hoursUntilChargedOrDepleted * 3600;
    if (isNaN(secondsUntilChargedOrDepleted)) {
        return -1;
    } else {
        return Math.round(secondsUntilChargedOrDepleted);
    }
};

const checkIfMotorReset = function(motorOdometer, motorDistanceTraveledSession) {
    let motorReset = false;
    if (Math.round(motorOdometer) == 0
    && Math.abs(motorOdometer - motorDistanceTraveledSession) > 1.0) {
        motorReset = true;
    }

    return motorReset;
};

const calculateMotorDistance = function(packetArray, odometer) {
    // The Motor's Odometer resets every time a motor trips or the car power cycles
    let totalDistanceTraveled = 0;
    let motorDistanceTraveledSession = 0;

    for (let i = 0; i < packetArray.length; i++) {
        // Check if the motor had reset, keep a tally of the distance travelled
        if (checkIfMotorReset(packetArray[i][odometer], motorDistanceTraveledSession)) {
            totalDistanceTraveled += motorDistanceTraveledSession;
        }

        motorDistanceTraveledSession = packetArray[i][odometer];
    }
    totalDistanceTraveled += motorDistanceTraveledSession;
    // Remove the initial distance
    totalDistanceTraveled -= packetArray[0][odometer];
    // Convert to kilometers (odometer reports as meters)
    totalDistanceTraveled /= 1000;

    return totalDistanceTraveled;
};
module.exports.getDistanceTraveled = function(packetArray) {
    if (packetArray.length == 0) {
        return 0;
    }
    // Reverse the array so we can iterate it in chronological order
    // slice is used to make a shallow copy - packetArray is reversed only in this function
    let chronologicalArray = packetArray.slice(0).reverse();
    let motor0DistanceTravelledTotal = calculateMotorDistance(chronologicalArray, 'motor0odometer');
    let motor1DistanceTravelledTotal = calculateMotorDistance(chronologicalArray, 'motor1odometer');

    return (motor0DistanceTravelledTotal + motor1DistanceTravelledTotal) / 2;
};

module.exports.getAveragePowerIn = function(packetArray) {
    // If no packets, then no power in
    if (packetArray.length == 0) {
        return 0;
    }

    // Define constants
    const mpptCount = 4;
    const motorCount = 2;

    // Get the sum of the average array power of all MPPTs
    let mpptPowerIn = packetArray.map((packet) => {
        let arrayPower = 0;
        for (let mppt = 0; mppt < mpptCount; mppt++) {
            // Array Power = Array Voltage * Array Current
            arrayPower += packet['mppt' + mppt + 'arrayvoltage'] *
                          packet['mppt' + mppt + 'arraycurrent'];
        }
        return arrayPower;
    }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);

    // Get the sum of the regen of all motors
    let regenPowerIn = packetArray.map((packet) => {
        let regen = 0;
        for (let motor = 0; motor < motorCount; motor++) {
            let busCurrent = packet['motor' + motor + 'buscurrent'];
            let busVoltage = packet['motor' + motor + 'busvoltage'];

            // Filter out any values with busCurrent >= 0
            if (busCurrent >= 0) {
                continue;
            }

            regen += busCurrent * busVoltage;
        }
        return regen;
    }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);

    return Math.abs(mpptPowerIn + regenPowerIn);
};

module.exports.getAveragePowerOut = function(packetArray) {
    // If no packets, then no power out
    if (packetArray.length == 0) {
        return 0;
    }

    return Math.abs(packetArray.reduce((sum, curr) => sum + (curr.packcurrent * curr.packvoltage), 0) / packetArray.length);
};

module.exports.getAverageSpeed = function(packetArray) {
    // If no packets, then no average speed
    if (packetArray.length == 0) {
        return 0;
    }

    return Math.abs(packetArray.reduce((sum, curr) => sum + (curr.motor0vehiclevelocity + curr.motor1vehiclevelocity) / 2, 0) / packetArray.length);
};
