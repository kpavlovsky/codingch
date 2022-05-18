// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import * as fs from "fs";
import {parse} from "csv-parse";
import path from 'path'

type Influencer = {
  instagramHandle: string;
  instagramName: string;
  category1: string;
  category2: string;
  followers: number;
  audienceCountry: string;
  engagementAvg: number;
}
type Data = {
  result: string;
  topByCountry?: TopInCountry[];
  topByCategory?: TopInCategory[];
}

type TopInCategory = {
  category: string;
  name: string;
  handle: string;
}

type TopInCountry = {
  country: string;
  name: string;
  handle: string;
}

const fullNumber = (num: string): number => {

  const b = parseFloat(num)
  if (num.toLowerCase().includes('m')) return b * 1000000;
  if (num.toLowerCase().includes('k')) return b * 1000;
  return b
}

const prepareData = (influencer: string[]): Influencer => {
  return {
    instagramHandle: influencer[0],
    instagramName: influencer[1],
    category1: influencer[2],
    category2: influencer[3],
    followers: fullNumber(influencer[4]),
    audienceCountry: influencer[5],
    engagementAvg: fullNumber(influencer[7])
  } as Influencer;
}


const getTopByCategory = (influencers: Influencer[]): TopInCategory[] => {
  const categoriesTemp = influencers.map(v => v.category1).concat(influencers.map(v => v.category2))
  const categoriesSet = new Set(categoriesTemp)
  const categories = Array.from(categoriesSet)
  let topInCategories: TopInCategory[] = [];
  for (let category of categories) {
    const topInfluencers = influencers.filter(i => i.category1 === category || i.category2 === category);
    topInfluencers.sort((a, b) => a.followers - b.followers)
    const topInfluencer = topInfluencers.shift()
    if (topInfluencer) {
      topInCategories.push({
        category: category,
        name: topInfluencer.instagramName,
        handle: topInfluencer.instagramHandle
      })
    }

  }
  return topInCategories;
}
const getTopByCountry = (influencers: Influencer[]): TopInCountry[] => {
  const countries = Array.from(new Set(influencers.map(v => v.audienceCountry)))
  let topInCountries: TopInCountry[] = [];
  for (let country of countries) {
    const topInfluencers = influencers.filter(i => i.audienceCountry === country);
    topInfluencers.sort((a, b) => a.engagementAvg - b.engagementAvg)
    const topInfluencer = topInfluencers.shift()
    if (topInfluencer) {
      topInCountries.push({
        country,
        name: topInfluencer.instagramName,
        handle: topInfluencer.instagramHandle
      })
    }
  }
  return topInCountries;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve, reject) => {
    let basePath = process.cwd()
    if (process.env.NODE_ENV === 'production') basePath = path.join(process.cwd(), '.next')
    const csvPath = path.resolve(basePath, 'data', 'instagram_influencers.csv')

    fs.readFile(csvPath, {encoding: 'utf-8'},
      (err, data) => {
        if (err) {
          console.error(err)
          res.status(200).json(
            {result: 'Failure of an unknown nature1'})
          return
        }
        parse(data,
          {},
          (error, result: []) => {
            if (error) {
              res.status(200).json(
                {result: 'Failure of an unknown nature2'})
              return
            }
            result.shift();
            const cleanedInfluencers = result.map((v) => prepareData(v))

            const topByCategory = getTopByCategory(cleanedInfluencers);
            const topByCountry = getTopByCountry(cleanedInfluencers);
            res.status(200).json(
              {
                result: 'Successfully parsed the file3',
                topByCategory, topByCountry
              })
            return
          })
      });
  })


}
