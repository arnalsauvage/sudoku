
// Cette fonction vérifie les cases invalides dans le jeu :
// si pas nombre de 1 à 9
// ou si doublon du chiffre dans la ligne, colonne, ou petit carré

const verifierJeu = () => {
  // Vérifier que les nombres saisis sont bien des nombres de 1 à 9

  // Récupérer tous les input de la page
  const listeInput = document.querySelectorAll("input");

  // Enlever toutes les classes invalides
  for (const input of listeInput) {
    input.classList.remove("invalid");
  }

  // Chacun des inputs
  for (const input of listeInput) {
    // Verifier que le champs est valide
    const validiteInput = input.checkValidity();

    if (validiteInput === false) {
      // Si c'est pas valide, arrêtez le programme
      input.value = "";
    }
  }

  // Tableau qui contient toutes les lignes
  const sudoku = stockeDonnesSudokuDansTableau();

  // Vérifier que y'ait pas de doublons dans les lignes
  verifieDoublonsDansLesLignes(sudoku);

  // Vérifier que y'ait pas de doublons dans les colonnes
  verifieDoublonsDansColonnes(sudoku);

  // Vérifier que y'ait pas de doublons dans les carrés
  verifieDoublonsDansLesCarres(sudoku);
};

// Récupérer le bouton
const button = document.getElementById("button-verifier");

// Assigner l'événement click à la function vérifier
button.addEventListener("click", verifierJeu);

// Récupérer le bouton aide 1
const button1 = document.getElementById("button-aide-1");

function viderLaGrille() {
  var grilleVide = "                                                                                 ";
  chargeGrille(grilleVide);
}
function verifieDoublonsDansLesCarres(sudoku) {
  // Parcourir les carrés
  for (const carre of coordonneesCarres) {
    // Pour chaque carré

    // On initialise un tableau de compteurs de valeurs pour ce carre
    let tabCompteurDeValeurs = [];
    for (let parcours = 0; parcours < 9; parcours += 1) {
      tabCompteurDeValeurs[parcours] = 0;
    }

    // On compte combien d'occurrences de chaque nombre dans le carré
    for (const element of carre) {
      const ligne = element[0];
      const col = element[1];
      const valeur = sudoku[ligne][col];

      // Si la valeur est vide, ne rien faire
      if (valeur != "") {
        // Sinon
        tabCompteurDeValeurs[valeur]++;
      }
    }

    // On applique le style invalide aux chiffres présents plusieurs fois
    for (const element of carre) {
      const ligne = element[0];
      const col = element[1];
      const valeur = sudoku[ligne][col];

      // Vérifier que l'élément n'est pas dans la liste
      if (tabCompteurDeValeurs[valeur] > 1) {
        // Ajouter l'élément à une liste
        ajouterClasseChamp("invalid", ligne, col);
      }
    }
  }
}

function verifieDoublonsDansColonnes(sudoku) {
  for (let col = 0; col < 9; col += 1) {
    // On initialise un tableau de compteurs de valeurs pour cette colonne
    let tabCompteurDeValeurs = [];
    for (let parcours = 0; parcours < 9; parcours += 1) {
      tabCompteurDeValeurs[parcours] = 0;
    }

    // Parcourir les éléments de la colonne pour compter les valeurs
    for (let ligne = 0; ligne < 9; ligne += 1) {
      const valeur = sudoku[ligne][col];

      // Si la valeur est vide, ne rien faire
      if (valeur != "") {
        // Sinon
        tabCompteurDeValeurs[valeur]++;
      }
    }
    // Parcourir les éléments pour attribuer un style erreur aux valeurs présentes plusieurs fois
    for (let ligne = 0; ligne < 9; ligne += 1) {
      const valeur = sudoku[ligne][col];

      // Si la valeur est vide, ne rien faire
      if (tabCompteurDeValeurs[valeur] > 1) {
        // Ajouter une classe d'erreur au champs
        ajouterClasseChamp("invalid", ligne, col);
      }
    }
  }
}

// Assigner l'événement click à la function vérifier
//button1.addEventListener("click", aideNombreN(1));

// Cette fonction propose une aide visuelle pour un nombre n
// elle grise les cases ne pouvant accueillir un nombre n
// dans sa ligne, colonne, et petit carré

function montreLesCandidatsUniques() {
  // Parcourir le jeu pour trouver toutes les valeurs de N
  // Vérifier que les nombres saisis sont bien des nombres de 1 à 9

  razClasse("injouable");
  razClasse("focus");
  razClasse("candidatUnique");

  // Tableau qui contient toutes les lignes
  let sudoku = stockeDonnesSudokuDansTableau();
  let sudoku2 = stockeDonnesSudokuDansTableau();
  // Parcourir les lignes
  for (let ligne = 0; ligne < 9; ligne += 1) {
    // Parcourir les éléments de la ligne
    for (let col = 0; col < 9; col += 1) {
      let mesCandidatsValides = candidatsValides(ligne, col, sudoku);
      // Si la valeur est vide, ne rien faire
      if (mesCandidatsValides.length === 1) {
        ajouterClasseChamp("candidatUnique", ligne, col);
        console.log("mesCandidats = " + mesCandidatsValides);
      }

      // Si la valeur est vide, ne rien faire
      if (mesCandidatsValides.length > 1) {
        console.log(
            "mesCandidats ligne  " +
            ligne +
            " col = " +
            col +
            "= " +
            mesCandidatsValides
        );
        sudoku2[ligne][col] = mesCandidatsValides;
        ajouterClasseChamp("candidatsMultiples", ligne, col);
      }
      // Appliquer l'aide pour le nombre N trouvé dans son carré, ligne, colonne
    }
  }
  metAjourJeuAvecTableau(sudoku2);
}

function aideNombreN(nombreN) {
  // Parcourir le jeu pour trouver toutes les valeurs de N
  // Vérifier que les nombres saisis sont bien des nombres de 1 à 9

  console.log("Clic reçu... pour nombre N : " + nombreN);
  razClasse("injouable");
  razClasse("focus");

  // Tableau qui contient toutes les lignes
  const sudoku = stockeDonnesSudokuDansTableau();

  // Parcourir les lignes
  for (let ligne = 0; ligne < 9; ligne += 1) {
    // Parcourir les éléments de la ligne
    for (let col = 0; col < 9; col += 1) {
      const valeur = sudoku[ligne][col];

      // Si la valeur est vide, ne rien faire
      if (valeur == nombreN) {
        appliqueAide(col, ligne);
      }
    }
    // Appliquer l'aide pour le nombre N trouvé dans son carré, ligne, colonne
  }
}

// Retire toutes les clases nomClasse des inputs de la page html
function razClasse(nomClasse) {
  // Récupérer tous les input de la page
  const listeInput = document.querySelectorAll("input");
  // Enlever toutes les classes injouable
  for (const input of listeInput) {
    input.classList.remove(nomClasse);
  }
}

// Efface les aides visuelles affichées
function razAide() {
  razClasse("injouable");
  razClasse("focus");
  razClasse("candidatUnique");
}



// export du sudoku au format texte
function texteVersSudoku() {
  // console.log("entrée avec texte : " + $("#zonetextesudoku").val());

  chargeGrille($("#zonetextesudoku").val());

}

//Javascript clic sur une case déclenche l'aide
$(document).ready(function () {
  $("input").click(function (event) {
    console.log(event.target.id); //Affiche enfantDeMaDiv
    console.log(this.id); //Affiche maDiv
    if (event.target.value.length === 1) {
      console.log("valeur cliquée : " + event.target.value);
      aideNombreN(event.target.value);
    } else {
      let macol = this.id[6];
      let maLigne = this.id[4];
      let mesCandidatsValides = candidatsValides(
          maLigne,
          macol,
          stockeDonnesSudokuDansTableau()
      );
      console.log("candidats :" + mesCandidatsValides);
    }
  });
});

function viderSudoku() {

  if (confirm("Voulez-vous vraiment vider la grille ?")) {
    viderLaGrille();
  }
}
