const ERROR = {
  zero: {error: '0'},
  first: {error: '1'},
  second: {error: '2'},
  third: {error: '3'}
}
const SERVICE_STATUS = {
  first: '1',
  second: '2',
  sixth: '6'
}
const SERVICE_USER_TYPE = {
  iPhone: '1',
  Android: '2'
}

function postConfirm(params) {
  const serviceId = params.service_id;
  const driverId = params.driver_id;

  let service = Service.find(serviceId);
  if (service) {
    if (service.status_id === SERVICE_STATUS.first) {
      return ERROR.second;
    }

  	if (!service.driver_id && service.status_id === SERVICE_STATUS.sixth) {
  		let driverTmp = Driver.find(driverId);

  		Service.update(serviceId, {
  			driver_id: driverId,
  			status_id: SERVICE_STATUS.second,
  			car_id: driverTmp.car_id
  		});

  		Driver.update(driverId, {
  			available: '0'
  		});

  		if (service.user.uuid) {
  			let pushMessage = "Tu servicio ha sido confirmado!";
  			notifyToUser(service, pushMessage);
  		}
      
  		return ERROR.zero;

  	} else {
  		return ERROR.first;
  	}
  } else {
  	return ERROR.third;
  }
};

function notifyToUser(service, pushMessage) {
  let push = Push.make();

  if (service.user.type === SERVICE_USER_TYPE.iPhone) {
    push.ios(service.user.uuid, pushMessage, 1, 'honk.wav', 'Open', {service_id: service.id});
  } else {
    push.android2(service.user.uuid, pushMessage, 1, 'default', 'Open', {service_id: service.id});
  }
}

