import styles from "../styles/Home.module.css";

const CategoryInfluencers = (influencersData: any) => {
  return (<div>
    <h3 className={styles.subsubtitle}>Top Influencers by category</h3>
    <table>
      <thead>
      <tr>
        <th>Influencer</th>
        <th>Category</th>
        <th>Followers</th>
      </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>);
}
export default CategoryInfluencers;