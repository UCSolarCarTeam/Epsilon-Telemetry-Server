module.exports.getAveragePackCurrent = function(packetArray) {
    let totalPackCurrent = 0;
    for (let i = 0; i < packetArray.length; ++i) {
        totalPackCurrent += packetArray[i].packcurrent;
    }
    const averagePackCurrent = totalPackCurrent / packetArray.length;
    return Number(averagePackCurrent.toFixed(2));
};
