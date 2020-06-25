import { Request, Response, NextFunction } from "express";
import { createHash } from 'crypto';
import { Member as MemberModel } from '../../../models/member';
import { Client as ClientModel } from '../../../models/client';
import { IClient } from '../../../models/client';
import { sign } from '../../..//utils/jwt-util';


const createMember = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
    console.log("createMember -> id", id)
	const getIdsArray = (array: any) => array.map((d: IClient) => d.id);
	// const getIdsArray = function<T, K extends keyof T>(array: Array<T>): Array<T[K]> {
	// 	return array.map((d: T) => d.id);
	// }

	ClientModel.find({})
		.then(clients => {
			const clientsIdsArray = getIdsArray(clients);
			if(!clientsIdsArray.includes(id)) {
				res.send({error: true});
			}
			// const randomId = clientsIdsArray[Math.floor(Math.random() * clientsIdsArray.length)];
			MemberModel.find({})
				.then(members => {
					const membersIdsArray = getIdsArray(members);
                    console.log("createMember -> membersIdsArray", membersIdsArray)
					if(!membersIdsArray.includes(id)) {
						console.log('ok');
						// const hash = createHash('sha256');
						// const hashPassword = hash.update(String(id)).digest('hex');
						// const fullData = Object.assign(data, { id: randomId, password: hashPassword });
						MemberModel.create({id})
							.then(() => {
								ClientModel.findOneAndUpdate({ id }, { name: "New User" } )
									.then((user) => {
                                    	console.log("createMember -> user", user)
										const token: string = sign(
											{
												id: user.id,
												name: "New User",
											}
										);
										res.send({token, id})
									})
							})
					} else res.send({error: { message: 'no empty clients'}});
				})
	})
	.catch(next);
}

export default createMember;