import data from '../data/users.json';
import CardItem from './CardItem/CardItem';
import style from './App.module.css';

export const App = () => {
  return (
    <section>
      <ul className={style.container}>
        {data.users.map(user => (
          <CardItem key={user.id} user={user} />
        ))}
      </ul>
    </section>
  );
};
