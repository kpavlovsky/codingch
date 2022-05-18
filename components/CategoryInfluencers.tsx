import styles from "../styles/Home.module.css";

const CategoryInfluencers = (props: {
  data: {
    category: string;
    name: string;
    handle: string;
  }[]
}) => {
  return (<div>
    <h3 className={styles.subsubtitle}>Top Influencers by category</h3>
    <table>
      <thead>
      <tr>
        <th>Category</th>
        <th>Name</th>
        <th>Handle</th>
      </tr>
      </thead>
      <tbody>
      {props.data ? props.data.map(i =>
          <tr key={i.handle}>
            <td>{i.category}</td>
            <td>{i.name}</td>
            <td>{i.handle}</td>
          </tr>
      ): <></>}
      </tbody>
    </table>
  </div>);
}
export default CategoryInfluencers;