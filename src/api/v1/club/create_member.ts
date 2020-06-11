import { Request, Response, NextFunction } from "express";
import { createHash } from 'crypto';
import { Member as MemberModel } from '../../../models/member'; 
import { Client as ClientModel } from '../../../models/client';
import { IClient } from '../../../models/client';
import { IMember } from '../../../models/member';


const createMember = (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;
	const getIdsArray = (array: any) => array.map((d: IClient) => d.id);
	// const getIdsArray = function<T, K extends keyof T>(array: Array<T>): Array<T[K]> {
	// 	return array.map((d: T) => d.id);
	// }
	
	ClientModel.find({})
		.then(clients => {
			const clientsIdsArray = getIdsArray(clients);
			const randomId = clientsIdsArray[Math.floor(Math.random() * clientsIdsArray.length)];
			MemberModel.find({})
				.then(members => {
					const membersIdsArray = getIdsArray(members);
					if(!membersIdsArray.includes(randomId)) {						
						const hash = createHash('sha256');
						const hashPassword = hash.update(data.password).digest('hex');
						const fullData = Object.assign(data, { id: randomId, password: hashPassword });
						MemberModel.create(fullData)
							.then(() => {
								ClientModel.findOneAndUpdate({ id: randomId }, { name: data.name } )
									.then(() => res.send({randomId}))
							})
					} else console.log('no empty clients');
				})
	})
	.catch(next);
}

export default createMember;