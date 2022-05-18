import styles from "../styles/Home.module.css";

const CountryInfluencers = (influencersData: any) => {
  return (<div>
    <h3 className={styles.subsubtitle}>Top Influencers by country</h3>
    <table>
      <thead>
      <tr>
        <th>Influencer</th>
        <th>Country</th>
        <th>Followers</th>
      </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>);
}
export default CountryInfluencers;