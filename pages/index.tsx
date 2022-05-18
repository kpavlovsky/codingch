import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import CategoryInfluencers from "../components/CategoryInfluencers";
import CountryInfluencers from "../components/CountryInfluencers";
import {useEffect, useState} from "react";

type DataResult = {
  result: string;
  topByCountry: {
    country: string;
    name: string;
    handle: string;
  }[];
  topByCategory: {
    category: string;
    name: string;
    handle: string;
  }[]

}

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const Home: NextPage = () => {
  const {data, error} = useSWR('/api/insights', fetcher)
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>Instagram Influencers AI Insights</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          <br/>
          Instagram Influencers
          <br/>
          AI Insights
        </h1>
        <h2 className={styles.subtitle}>
          Featuring a lot of if/else statements posing as Machine Learning
        </h2>

        {data && data.topByCategory ? <CategoryInfluencers data={data.topByCategory}/> : <></>}
        <br/>
        <br/>
        {data && data.topByCountry ? <CountryInfluencers  data={data.topByCountry}/> : <></>}
        <br/>
      </main>
    </div>
  )
}

export default Home
