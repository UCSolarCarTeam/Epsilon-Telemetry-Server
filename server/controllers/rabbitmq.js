const Telemetry = require('../models/telemetry');

// Constants
const amqpQueueName = 'test-tool';

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
      let translatedKey = key;
      if (translatedKey === 'MotorOverSpeed') {
        translatedKey = 'OverSpeed';
      }
      translatedMotorFaults[`motor${index}${translatedKey}Error`] =
        motorFault.ErrorFlags[key];
    });
    Object.keys(motorFault.LimitFlags).forEach(key => {
      let translatedKey = key;
      if (translatedKey === 'MotorCurrent') {
        translatedKey = 'Current';
      }
      translatedMotorFaults[`motor${index}${translatedKey}Limit`] =
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
    } else if (translatedKey === 'forward') {
      translatedKey = 'controlsForward';
    } else if (translatedKey === 'reverse') {
      translatedKey = 'controlsReverse';
    } else if (translatedKey === 'reset') {
      translatedKey = 'controlsMotorReset';
    }
    translatedDriverControls[translatedKey] = driverControls[key];
  });
  return translatedDriverControls;
};

const translateBatteryFaults = function(batteryFaults) {
  const translatedBatteryFaults = {};
  Object.keys(batteryFaults.ErrorFlags).forEach(key => {
    if (key === 'CANBUSCommunicationsFault') {
      translatedBatteryFaults['canBusCommunicationsFault'] =
        batteryFaults.ErrorFlags[key];
    } else {
      translatedBatteryFaults[key[0].toLowerCase() + key.substring(1)] =
        batteryFaults.ErrorFlags[key];
    }
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
  const data = JSON.parse(payload);
  const translatedData = Object.assign(
    {},
    translateMotor(data.MotorDetails),
    translateMotor(data.KeyMotor),
    translateMotorFaults(data.MotorFaults),
    translateMppts(data.MPPT),
    translateLights(data.Lights),
    translateDriverControls(data.DriverControls),
    translateBatteryFaults(data.BatteryFaults),
    translateBatteryData(data.Battery)
  );
  console.log(translatedData);
  return translatedData;
};

const writeIncomingTelemetryToDatabase = function(message, channel) {
  if (message) {
    Telemetry
      .forge(translatePayload(message.content))
      .save()
      .then(saved => {
        console.log(`Telemetry data saved`);
      });
    channel.ack(message);
  }
};

const connectRabbitMq = function() {
  require('amqplib')
    .connect('amqp://localhost:5672')
    .then(function(conn) {
      process.once('SIGINT', function() {
        conn.close();
      });
      return conn.createChannel().then(ch => {
        ch
          .assertQueue(amqpQueueName, {
            durable: true, // Messages will persist on queue unless consumed
          })
          .then(() => {
            return ch.consume(amqpQueueName, message => {
              writeIncomingTelemetryToDatabase(message, ch);
            }, {
              noAck: false, // Default
            });
          })
          .then(() =>
            console.log(' [*] Waiting for logs. To exit press CTRL+C')
          )
          .catch(error => {
            console.error(error);
          });
      });
    })
    .catch(console.warn);
};

module.exports = connectRabbitMq;
