export default function QuestItem({ img, name, tittle }) {
  return (
    <li>
      <img src={img} width={'100px'} alt="" />
      <h2>{name}</h2>
      <h3>{tittle}</h3>
    </li>
  );
}
