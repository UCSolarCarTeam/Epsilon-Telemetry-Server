const Telemetry = require('../models/telemetry');

// Constants
const amqpQueueName = 'telem';

const translateMotor = function(motorInfos) {
  const translatedMotor = {};
  motorInfos.forEach((motorInfo, index) => {
    Object.keys(motorInfo).forEach(key => {
      translatedMotor[`motor${index}${key}`] = motorInfo[key];
    });
  });
  return translatedMotor;
};

const translateMotorFaults = function(motorFaults) {
  const translatedMotorFaults = {};
  motorFaults.forEach((motorFault, index) => {
    Object.keys(motorFault.ErrorFlags).forEach(key => {
      translatedMotorFaults[`motor${index}${key}Error`] =
        motorFault.ErrorFlags[key];
    });
    Object.keys(motorFault.LimitFlags).forEach(key => {
      translatedMotorFaults[`motor${index}${key}Limit`] =
        motorFault.LimitFlags[key];
    });
    translatedMotorFaults[`motor${index}RxErrorCount`] =
      motorFault.RxErrorCount;
    translatedMotorFaults[`motor${index}TxErrorCount`] =
      motorFault.TxErrorCount;
  });
  return translatedMotorFaults;
};

const translateMppts = function(mpptData) {
  const translatedMpptData = {};
  mpptData.forEach((mppt, index) => {
    Object.keys(mppt).forEach(key => {
      translatedMpptData[`mppt${index}${key}`] = mppt[key];
    });
  });
  return translatedMpptData;
};

const translateLights = function(lightData) {
  const translatedLightData = {};
  Object.keys(lightData).forEach(key => {
    let translatedKey = key[0].toLowerCase() + key.substring(1);
    if (translatedKey === 'brakes') {
      translatedKey = 'brakeLights';
    }
    translatedLightData[translatedKey] = lightData[key];
  });
  return translatedLightData;
};

const translateDriverControls = function(driverControls) {
  const translatedDriverControls = {};
  Object.keys(driverControls).forEach(key => {
    let translatedKey = key[0].toLowerCase() + key.substring(1);
    if (translatedKey === 'alive') {
      translatedKey = 'driverControlsAlive';
    }
    translatedDriverControls[translatedKey] = driverControls[key];
  });
  return translatedDriverControls;
};

const translateBatteryFaults = function(batteryFaults) {
  const translatedBatteryFaults = {};
  Object.keys(batteryFaults.ErrorFlags).forEach(key => {
    translatedBatteryFaults[key[0].toLowerCase() + key.substring(1)] =
      batteryFaults.ErrorFlags[key];
  });
  Object.keys(batteryFaults.LimitFlags).forEach(key => {
    translatedBatteryFaults[key[0].toLowerCase() + key.substring(1)] =
      batteryFaults.LimitFlags[key];
  });
  return translatedBatteryFaults;
};

const translateBatteryData = function(batteryData) {
  const translatedBatteryData = {};
  Object.keys(batteryData).forEach(key => {
    let translatedKey = key[0].toLowerCase() + key.substring(1);
    if (translatedKey === 'alive') {
      translatedKey = 'batteryAlive';
    } else if (key === 'BMSRelayStatusFlags') {
      return;
    }
    translatedBatteryData[translatedKey] = batteryData[key];
  });
  Object.keys(batteryData.BMSRelayStatusFlags).forEach(key => {
    translatedBatteryData[key[0].toLowerCase() + key.substring(1)] =
      batteryData.BMSRelayStatusFlags[key];
  });

  return translatedBatteryData;
};

const translatePayload = function(payload) {
  console.log(' [x] Received \'%s\'', payload.toString());
  return Object.assign(
    {},
    translateMotor(payload.MotorDetails),
    translateMotor(payload.KeyMotor),
    translateMotorFaults(payload.MotorFaults),
    translateMppts(payload.MPPT),
    translateLights(payload.Lights),
    translateDriverControls(payload.DriverControls),
    translateBatteryFaults(payload.BatteryFaults),
    translateBatteryData(payload.Battery)
  );
};

const writeIncomingTelemetryToDatabase = function(message) {
  new Telemetry(translatePayload(message.content)).save().then(saved => {
    console.log(`Telemetry data saved`);
  });
};

const connectRabbitMq = function() {
  require('amqplib')
    .connect('amqp://localhost')
    .then(function(conn) {
      process.once('SIGINT', function() {
        conn.close();
      });
      return conn.createChannel().then(ch => {
        ch
          .assertQueue(amqpQueueName, {exclusive: true})
          .then(() => {
            return ch.consume(amqpQueueName, writeIncomingTelemetryToDatabase, {
              noAck: false,
            });
          })
          .then(() =>
            console.log(' [*] Waiting for logs. To exit press CTRL+C')
          );
      });
    })
    .catch(console.warn);
};

module.exports = connectRabbitMq;
