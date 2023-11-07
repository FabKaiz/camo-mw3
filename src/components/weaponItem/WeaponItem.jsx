import "./WeaponItem.scss"

const WeaponItem = ({weapon, handleMasteryProgressClick, category}) => {
  return (
      <li key={weapon.name} className="weapon__container">
        <h3>{weapon.name}</h3>

        {/* Multiplayer camos */}
        {Object.keys(weapon.masteryProgress).map((progressKey) => (
            <div
                key={progressKey}
                className={`camo`}
                onClick={() =>
                    handleMasteryProgressClick(category, weapon.name, progressKey)
                }
            >
              <div className={`${progressKey} camoPic ${weapon.masteryProgress[progressKey] ? 'active' : ''}`}>
              </div>
            </div>
        ))}

        {/* Multi / Zombie separator gradient */}
        <div className="separator" />

        {/* Zombie camos */}
        {Object.keys(weapon.masteryProgressZombie).map((progressKey) => (
            <div
                key={progressKey}
                className={'camo zombie'}
                onClick={() =>
                    handleMasteryProgressClick(category, weapon.name, progressKey, true)
                }
            >
              <div className={`${progressKey} camoPic ${weapon.masteryProgressZombie[progressKey] ? 'active' : ''}`}>
              </div>
            </div>
        ))}
      </li>
  );
};

export default WeaponItem;