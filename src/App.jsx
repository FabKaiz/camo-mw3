import './styles/main.scss'
import { weaponList } from "./data/weapons.js";
import { useState, useEffect } from "react";
import ProgressBar from "./components/progressBar/ProgressBar.jsx";
import WeaponItem from "./components/weaponItem/WeaponItem.jsx";

function App() {
  const [weaponData, setWeaponData] = useState({...weaponList});
  const [progress, setProgress] = useState(0);
  const [progressZombie, setProgressZombie] = useState(0);

  useEffect(() => {
    const localData = localStorage.getItem('weaponData');
    if (localData) {
      setWeaponData(JSON.parse(localData));
      calculateProgress(JSON.parse(localData));
      calculateProgressZombie(JSON.parse(localData));
    }
  }, []);

  const handleMasteryProgressClick = (category, weaponName, progressKey, zombie) => {
    setWeaponData((prevData) => {
      const updatedData = {...prevData};
      const progressObjectName = zombie ? 'masteryProgressZombie' : 'masteryProgress';

      updatedData[category] = updatedData[category].map((weapon) => {
        if (weapon.name === weaponName) {
          return {
            ...weapon,
            [progressObjectName]: {
              ...weapon[progressObjectName],
              [progressKey]: !weapon[progressObjectName][progressKey],
            },
          };
        }
        return weapon;
      });

      // Enregistrer les données dans le local storage
      localStorage.setItem('weaponData', JSON.stringify(updatedData));
      calculateProgress(updatedData);
      if (zombie) {
        calculateProgressZombie(updatedData);
      }

      return updatedData;
    });
  };

  const calculateProgress = (localData) => {
    let totalTrue = 0;
    let totalFalse = 0;

    if (localData) {
      for (const category in localData) {
        localData[category].forEach((weapon) => {
          for (const progressKey in weapon.masteryProgress) {
            if (weapon.masteryProgress[progressKey]) totalTrue++;
          }
          totalFalse += 4;
        });
      }
    }

    setProgress((totalTrue / (totalTrue + totalFalse)) * 100);
  };

  const calculateProgressZombie = (localData) => {
    let totalTrue = 0;
    let totalFalse = 0;

    if (localData) {
      for (const category in localData) {
        localData[category].forEach((weapon) => {
          for (const progressKey in weapon.masteryProgressZombie) {
            if (weapon.masteryProgressZombie[progressKey]) totalTrue++;
          }
          totalFalse += 4;
        });
      }
    }

    setProgressZombie((totalTrue / (totalTrue + totalFalse)) * 100);
  }

  const resetAllProgress = () => {
    const resetData = {...weaponData};
    for (const category in resetData) {
      resetData[category] = resetData[category].map((weapon) => ({
        ...weapon,
        masteryProgress: {
          Gold: false,
          Diamond: false,
          Poly: false,
          DM: false,
        },
        masteryProgressZombie: {
          GoldZ: false,
          DiamondZ: false,
          PolyZ: false,
          DMZ: false,
        },
      }));
    }

    localStorage.setItem('weaponData', JSON.stringify(resetData));

    setWeaponData(resetData);
    calculateProgress(resetData);
    calculateProgressZombie(resetData)
  };

  return (
      <>
        <button onClick={resetAllProgress}>Reset all progress</button>

        <h1>CAMO MW3</h1>

        {weaponData && Object.keys(weaponData).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {weaponData[category].map((weapon) => (
                    <WeaponItem
                        key={weapon.name}
                        weapon={weapon}
                        category={category}
                        handleMasteryProgressClick={handleMasteryProgressClick}
                    />
                ))}
              </ul>
            </div>
        ))}

        <ProgressBar progress={progress} />
        <ProgressBar progress={progressZombie} zombie={true} />
      </>
  )
}

export default App
