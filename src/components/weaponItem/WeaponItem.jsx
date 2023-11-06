import "./WeaponItem.scss"

const WeaponItem = ({weapon, handleMasteryProgressClick, category}) => {
  return (
      <li key={weapon.name}>
        {weapon.name}

        {/* Multiplayer camos */}
        {Object.keys(weapon.masteryProgress).map((progressKey) => (
            <div
                key={progressKey}
                className={weapon.masteryProgress[progressKey] ? 'active' : ''}
                onClick={() =>
                    handleMasteryProgressClick(category, weapon.name, progressKey)
                }
            >
              {progressKey}:
              {weapon.masteryProgress[progressKey].toString()}
            </div>
        ))}

        {/* Zombie camos */}
        {Object.keys(weapon.masteryProgressZombie).map((progressKey) => (
            <div
                key={progressKey}
                className={weapon.masteryProgressZombie[progressKey] ? 'active' : ''}
                onClick={() =>
                    handleMasteryProgressClick(category, weapon.name, progressKey, true)
                }
            >
              {progressKey}:
              {weapon.masteryProgressZombie[progressKey].toString()}
            </div>
        ))}
      </li>
  );
};

export default WeaponItem;