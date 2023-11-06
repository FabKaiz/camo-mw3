import './styles/main.scss'
import { weaponList } from "./data/weapons.js";
import { useState, useEffect } from "react";
import ProgressBar from "./components/progressBar/ProgressBar.jsx";
import WeaponItem from "./components/weaponItem/WeaponItem.jsx";

function App() {
  // const [weapons, setWeapons] = useState([])
  const [weaponData, setWeaponData] = useState({...weaponList});
  const [progress, setProgress] = useState(0);

// Récupérer les données du local storage au chargement de la page
  useEffect(() => {
    const localData = localStorage.getItem('weaponData');
    if (localData) {
      setWeaponData(JSON.parse(localData));
      calculateProgress(JSON.parse(localData)); // Calculer la progression après récupération des données
    }
  }, []);


  // Mettre à jour les données lorsqu'un masteryProgress est cliqué
  const handleMasteryProgressClick = (category, weaponName, progressKey) => {
    setWeaponData((prevData) => {
      const updatedData = {...prevData};
      updatedData[category] = updatedData[category].map((weapon) => {
        if (weapon.name === weaponName) {
          return {
            ...weapon,
            masteryProgress: {
              ...weapon.masteryProgress,
              [progressKey]: !weapon.masteryProgress[progressKey],
            },
          };
        }
        return weapon;
      });

      // Enregistrer les données dans le local storage
      localStorage.setItem('weaponData', JSON.stringify(updatedData));

      return updatedData;
    });

    // Recalculer la progression
    calculateProgress();
  };

  // Calculer la progression
  const calculateProgress = (localData) => {
    let totalTrue = 0;
    let totalFalse = 0;

    if (localData) {
      for (const category in localData) {
        localData[category].forEach((weapon) => {
          if (weapon.masteryProgress.Gold) totalTrue++;
          if (weapon.masteryProgress.Diamond) totalTrue++;
          if (weapon.masteryProgress.Poly) totalTrue++;
          if (weapon.masteryProgress.DM) totalTrue++;
          totalFalse += 4;
        });
      }
    } else {
      for (const category in weaponData) {
        weaponData[category].forEach((weapon) => {
          if (weapon.masteryProgress.Gold) totalTrue++;
          if (weapon.masteryProgress.Diamond) totalTrue++;
          if (weapon.masteryProgress.Poly) totalTrue++;
          if (weapon.masteryProgress.DM) totalTrue++;
          totalFalse += 4;
        });
      }
    }

    setProgress((totalTrue / (totalTrue + totalFalse)) * 100);
  };


  const resetAllProgress = () => {
  const resetData = { ...weaponData };
  for (const category in resetData) {
    resetData[category] = resetData[category].map((weapon) => ({
      ...weapon,
      masteryProgress: {
        Gold: false,
        Diamond: false,
        Poly: false,
        DM: false,
      },
    }));
  }

    // Enregistrer les données dans le local storage
    localStorage.setItem('weaponData', JSON.stringify(resetData));

    // Mettre à jour les données et recalculer la progression
    setWeaponData(resetData);
    calculateProgress(resetData);
};


  return (
      <>
        <h1>CAMO MW3</h1>

        {Object.keys(weaponData).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {weaponData[category].map((weapon) => (
                    <WeaponItem key={weapon.name} weapon={weapon} category={category} handleMasteryProgressClick={handleMasteryProgressClick} />
                ))}
              </ul>
            </div>
        ))}

          <ProgressBar progress={progress} />

        <button onClick={resetAllProgress}>Reset all progress</button>
      </>
  )
}

export default App
