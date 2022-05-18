// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import * as fs from "fs";
import {parse} from "csv-parse";


type Data = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve, reject) => {
    let pathToFile = './data/instagram_influencers.csv';
    fs.readFile(pathToFile, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        console.error(err)
        res.status(200).json(
          {result: 'Failure of an unknown nature1'})
        return
      }
      parse(data, {},
        (error, result) => {
          if (error) {
            res.status(200).json(
              {result: 'Failure of an unknown nature2'})
            return
          }
          console.log(result)
          res.status(200).json(
            {result: 'Successfully parsed the file3'})
          return
        })
    });
  })


}
