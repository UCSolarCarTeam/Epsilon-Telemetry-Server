module.exports.getAveragePackCurrent = function(packetArray) {
    let totalPackCurrent = 0;
    for (let i = 0; i < packetArray.length; ++i) {
        totalPackCurrent += packetArray[i].packcurrent;
    }
    const averagePackCurrent = totalPackCurrent / packetArray.length;
    return Number(averagePackCurrent.toFixed(2));
};

module.exports.getSecondsRemainingUntilChargedOrDepleted = function(averagePackCurrent, packAmpHours) {
    let hoursUntilChargedOrDepleted = packAmpHours / averagePackCurrent;
    let secondsUntilChargedOrDepleted = hoursUntilChargedOrDepleted * 3600;
    if (isNaN(secondsUntilChargedOrDepleted)) {
        return -1;
    } else {
        return Math.round(secondsUntilChargedOrDepleted);
    }
};

module.exports.getDistanceTraveled = function(packetArray) {
    // The Motor's Odometer resets every time a motor trips or the car power cycles

    // Get motor 0 distance travelled
    let motor0DistanceTravelledTotal = 0;
    let motor0DistanceTravelledSession = 0;

    let motor1DistanceTravelledTotal = 0;
    let motor1DistanceTravelledSession = 0;

    // Making assumption that the motor odometer will always increment
    // If it is found less, then a trip or reset has to have occurred

    for (let i = 0; i < packetArray.length; i++) {
        if (packetArray[i].motor0odometer < motor0DistanceTravelledSession) {
            motor0DistanceTravelledTotal += motor0DistanceTravelledSession;
            motor0DistanceTravelledSession = 0;
        }
        motor0DistanceTravelledSession = packetArray[i].motor0odometer;

        if (packetArray[i].motor1odometer < motor1DistanceTravelledSession) {
            motor1DistanceTravelledTotal += motor1DistanceTravelledSession;
            motor1DistanceTravelledSession = 0;
        }
        motor1DistanceTravelledSession = packetArray[i].motor1odometer;
    }
    motor0DistanceTravelledTotal += motor0DistanceTravelledSession;
    motor1DistanceTravelledTotal += motor1DistanceTravelledSession;

    return (motor0DistanceTravelledTotal + motor1DistanceTravelledTotal) / 2;
};

module.exports.getAveragePowerIn = function(packetArray) {
    // If no packets, then no power in
    if(packetArray.length == 0)
        return 0;

    // Define constants
    const mpptCount = 4;
    const motorCount = 2;

    // Get the sum of the average array power of all MPPTs
    let mpptPowerIn = packetArray.map((packet) => {
        let arrayPower = 0;
        for (let mppt = 0; mppt < mpptCount; mppt++) {
            // Array Power = Array Voltage * Array Current
            arrayPower += packet["mppt" + mppt + "arrayvoltage"] *
                          packet["mppt" + mppt + "arraycurrent"];
        }
        return arrayPower;
    }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);

    // Get the sum of the regen of all motors
    let regenPowerIn = packetArray.map((packet) => {
        let regen = 0;
        for (let motor = 0; motor < motorCount; motor++) {
            // Regen = Bus Current * Bus Voltage
            regen += packet["motor" + motor + "buscurrent"] *
                     packet["motor" + motor + "busvoltage"];
        }
        return regen;
    }).reduce((sum, curr) => sum + (curr / packetArray.length), 0);

    return mpptPowerIn + regenPowerIn;
}

module.exports.getAveragePowerOut = function(packetArray) {
    // If no packets, then no power out
    if(packetArray.length == 0)
        return 0;

    return packetArray.reduce((sum, curr) => sum + (curr.packcurrent * curr.packvoltage), 0) / packetArray.length;
}