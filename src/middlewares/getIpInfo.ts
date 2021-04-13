import { Request, Response } from 'express';
import geoip from 'geoip-lite';

const getIpInfo = (ip: any): any => {
	// IPV6 addresses can include IPV4 addresses
	// So req.ip can be '::ffff:86.3.182.58'
	// However geoip-lite returns null for these
	console.log('rent');
	if (ip.includes('::ffff:')) {
		ip = ip.split(':').reverse()[0];
	}

	if (ip === '127.0.0.1' || ip === '::1') {
		// return { error: "This won't work on localhost" };
		ip = '95.76.1.241';
	}

	var lookedUpIP = geoip.lookup(ip);

	if (!lookedUpIP) {
		return {
			error: 'Error occured while trying to process the information',
		};
	}

	return {
		country: lookedUpIP.country,
	};
};

export const getIpInfoMiddleware = (
	req: Request,
	res: Response,
	next: Function
) => {
	const info = getIpInfo(req.ip);
	console.log(info);
	if (!info.error) {
		req.ipInfo = info;
	}
	next();
};
