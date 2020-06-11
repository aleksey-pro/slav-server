import { Member as MemberModel } from '../../../models/member';
import { Request, Response, NextFunction } from "express";
import { sign } from '../../..//utils/jwt-util';
const crypto = require('../../../utils/encrypt');

const MembersController = {
    get(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;
      return MemberModel.findOne({id})
        .populate('salonClient').exec((error, member) => {
          res.send(member);
        })
    },
    list(req: Request, res: Response, next: NextFunction) {
      return MemberModel.find({})
      .then((data) => {
        res.send(data);
      })
      .catch(next);        
    },
    edit(req: Request, res: Response, next: NextFunction) {
      const memberId = req.params.id;
      const newData = req.body;
      return MemberModel.findOneAndUpdate({ id: memberId }, newData)
        .then(() => MemberModel.findOne({ id:  memberId}))
        .then((data) => {
          res.send(data);
        })
        .catch(next);
    },
    checkQRCode(req: Request, res: Response, next: NextFunction) {
      const cypherId = req.params.id;
      const decryptedId = crypto.decrypt(cypherId);
      if(decryptedId === "error") {
        res.redirect(`${process.env.CLIENT_URL}/register`);
        return;
      };
      MemberModel.findOne({id: decryptedId})
        .then(member => {
          const token: string = sign(
            {
              id: member.id,
              nick: member.nick,
            }
          );
          res.redirect(`${process.env.CLIENT_URL}/#/authQRCode?token=${token}&id=${member.id}`)
        })
        .catch(err => {
          console.log(err);
        });
    },
}

export default MembersController;