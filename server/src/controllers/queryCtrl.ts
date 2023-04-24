import { Request, Response } from 'express';
import mongo from '@/databases/mongo';

async function getIncomeCar(req: Request, res: Response) {
	try {
		const data = await mongo.user.findMany({
			where: {
				income: { lt: 5 },
				OR: [{ car: 'BMW' }, { car: 'Mercedes-Benz' }],
			},
		});
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getMalesAboveThousand(req: Request, res: Response) {
	try {
		const data = await mongo.user.findMany({
			where: {
				phone_price: {
					gt: 10000,
				},
			},
		});
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getQuote(req: Request, res: Response) {
	try {
		// let data = await mongo.user.findMany({
		// 	where: {
		// 		last_name: {
		// 			startsWith: 'M',
		// 			mode: 'insensitive',
		// 		},
		// 		email: {
		// 			contains: mongo.user.fields.last_name,
		// 			mode: 'insensitive',
		// 		},
		// 	},
		// });
		// data = data.filter((user) => {
		// 	return user.quote.length >= 15;
		// });
		const data = await mongo.user.aggregateRaw({
			pipeline: [
				{
					$match: {
						last_name: {
							$regex: '^M',
						},
					},
				},
				{
					$match: {
						quote: {
							$regex: '^.{15,}$',
						},
						email: {
							$regex: '.*' + mongo.user.fields.last_name + '.*',
						},
					},
				},
			],
		});
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function getCars(req: Request, res: Response) {
	try {
		// let data = await mongo.user.findMany({
		// 	where: {
		// 		OR: [
		// 			{
		// 				car: 'BMW',
		// 			},
		// 			{
		// 				car: 'Mercedes-Benz',
		// 			},
		// 			{
		// 				car: 'Audi',
		// 			},
		// 		],
		// 	},
		// });
		// data = data.filter((user) => {
		// 	//regex for if email contains digit
		// 	return !/\d/.test(user.email);
		// });
		const data = await mongo.user.aggregateRaw({
			pipeline: [
				{
					$match: {
						car: {
							$in: ['BMW', 'Mercedes-Benz', 'Audi'],
						},
						email: {
							$not: {
								$regex: '.*\\d.*',
							},
						},
					},
				},
				{
					//sort by car
					$sort: {
						car: 1,
					},
				},
			],
		});
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

async function aggregateCities(req: Request, res: Response) {
	try {
		// Show the data of top 10 cities which have the highest number of users and their average
		const data = await mongo.user.aggregateRaw({
			pipeline: [
				{
					$group: {
						_id: '$city',
						count: { $sum: 1 },
						average_income: { $avg: '$income' },
					},
				},
				{
					$sort: { count: -1, average_income: -1 },
				},
				{
					$limit: 10,
				},
			],
		});
		res.status(200).json(data);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

export default {
	getIncomeCar,
	getMalesAboveThousand,
	getQuote,
	getCars,
	aggregateCities,
};
