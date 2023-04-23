import { Request, Response } from 'express';

function indexCtrl(req: Request, res: Response) {
	res.send('Hello World!');
}

export default indexCtrl;
