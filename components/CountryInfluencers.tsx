import styles from "../styles/Home.module.css";

const CountryInfluencers = (props: {
  data: {
    country: string;
    name: string;
    handle: string;
  }[]
}) => {
  console.log("CountryInfluencers")
  console.log(props)
  return (<div>
    <h3 className={styles.subsubtitle}>Top Influencers by country</h3>
    <table>
      <thead>
      <tr>
        <th>Country</th>
        <th>Name</th>
        <th>Handle</th>
      </tr>
      </thead>
      <tbody>
      {props.data ? props.data.map(i =>
        <tr key={i.handle}>
          <td>{i.country}</td>
          <td>{i.name}</td>
          <td>{i.handle}</td>
        </tr>
      ) : <></>}
      </tbody>
    </table>
  </div>);
}
export default CountryInfluencers;