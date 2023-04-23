import { Request, Response } from 'express';
import mongo from '@/databases/mongo';

async function getAllData(req: Request, res: Response) {
	const data = await mongo.user.findMany();
	res.json(data);
}

async function createUser(req: Request, res: Response) {
	const {
		first_name,
		last_name,
		email,
		gender,
		income,
		city,
		car,
		quote,
		phone_price,
	} = req.body;
	if (
		!(
			first_name &&
			last_name &&
			email &&
			gender &&
			income &&
			city &&
			car &&
			quote &&
			phone_price
		)
	) {
		return res.status(400).json({ message: 'Missing fields' });
	}
	try {
		let data: any = {
			first_name,
			last_name,
			email,
			gender,
			income,
			city,
			car,
			quote,
			phone_price,
		};
		await mongo.user.create({
			data,
		});
		res.status(201).json({ message: 'User created' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export default { getAllData, createUser };
