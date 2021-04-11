import { ObjectId } from 'bson';

export type User = {
	_id?: ObjectId;
	username: string;
	password: string;
	email?: string;
	phone?: string;
	dateOfBirth: {
		month: string;
		day: number;
		year: number;
	};
};
