import "./WeaponItem.scss"

const WeaponItem = ({weapon, handleMasteryProgressClick, category}) => {
  return (
      <li key={weapon.name}>
        {weapon.name}
        <div
            className={weapon.masteryProgress.Gold ? 'active' : ''}
            onClick={() =>
                handleMasteryProgressClick(category, weapon.name, 'Gold')
            }
        >
          Gold:
          {weapon.masteryProgress.Gold.toString()}
        </div>
        <div
            className={weapon.masteryProgress.Diamond ? 'active' : ''}
            onClick={() =>
                handleMasteryProgressClick(category, weapon.name, 'Diamond')
            }
        >
          Diamond:
          {weapon.masteryProgress.Diamond.toString()}
        </div>
        <div
            className={weapon.masteryProgress.Poly ? 'active' : ''}
            onClick={() =>
                handleMasteryProgressClick(category, weapon.name, 'Poly')
            }
        >
          Poly:
          {weapon.masteryProgress.Poly.toString()}
        </div>
        <div
            className={weapon.masteryProgress.DM ? 'active' : ''}
            onClick={() =>
                handleMasteryProgressClick(category, weapon.name, 'DM')
            }
        >
          DM:

          {weapon.masteryProgress.DM.toString()}
        </div>
      </li>
  );
};

export default WeaponItem;