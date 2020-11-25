// Cette fonction ajoute la classe 'classe' à un input d'identifiant caseLigne-Col
// input id="case0-5" pour la case 1ere ligne 6è colonne

const ajouterClasseChamp = (uneClasse, ligne, col) => {
  const input = document.getElementById("case" + ligne + "-" + col);
  input.classList.add(uneClasse);
  input.addEventListener(
    "input",
    () => {
      input.classList.remove(uneClasse);
    },
    { once: true }
  );
};

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
      return;
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

function stockeDonnesSudokuDansTableau() {
  const sudoku = [];

  // Récuperer toutes les valeurs
  for (let ligne = 0; ligne < 9; ligne += 1) {
    const sudokuLigne = [];

    for (let col = 0; col < 9; col += 1) {
      const identifiant = "case" + ligne + "-" + col;
      const input = document.getElementById(identifiant);
      const valeur = input.value;
      const nombre = valeur === "" ? "" : parseInt(valeur, 10);

      // Ajouter la valeur a la ligne
      sudokuLigne.push(nombre);
    }
    // Ajouter la ligne au sudoku
    sudoku.push(sudokuLigne);
  }
  return sudoku;
}

function verifieDoublonsDansLesCarres(sudoku) {
  const carres = coordonneesCarres;

  // Parcourir les carrés
  for (const carre of carres) {
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

function verifieDoublonsDansLesLignes(sudoku) {
  for (let ligne = 0; ligne < 9; ligne += 1) {
    // On initialise un tableau de compteurs de valeurs pour cette ligne
    let tabCompteurDeValeurs = [];
    for (let parcours = 0; parcours < 9; parcours += 1) {
      tabCompteurDeValeurs[parcours] = 0;
    }

    // Parcourir les éléments de la ligne pour compter les valeurs
    for (let col = 0; col < 9; col += 1) {
      const valeur = sudoku[ligne][col];

      // Si la valeur est vide, ne rien faire
      if (valeur != "") {
        // Sinon
        tabCompteurDeValeurs[valeur]++;
      }
    }
    // Parcourir les éléments pour attribuer un style erreur aux valeurs présentes plusieurs fois
    for (let col = 0; col < 9; col += 1) {
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

function aideNombreN(nombreN) {
  // Parcourir le jeu pour trouver toutes les valeurs de N
  // Vérifier que les nombres saisis sont bien des nombres de 1 à 9

  console.log("Clic reçu...");
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
      if (valeur === nombreN) {
        appliqueAide(col, ligne);
      }
    }
    // Appliquer l'aide pour le nombre N trouvé dans son carré, ligne, colonne
  }
}

// Applique l'aide pour une valeur en ligne / colonne
// grise toutes les cases de sa ligne, de sa colonne, de son carré, et la met en évidence
function appliqueAide(col, ligne) {
  console.log("entrée dans appliqueAide ok, col =" + col + " ligne = " + ligne);
  for (let maCol = 0; maCol < 9; maCol += 1) {
    ajouterClasseChamp("injouable", ligne, maCol);
  }
  for (let maLigne = 0; maLigne < 9; maLigne += 1) {
    ajouterClasseChamp("injouable", maLigne, col);
  }
  // TODO : griser toutes les cases de son carré

  var ligneCarre = Math.trunc(ligne / 3);
  var colCarre = Math.trunc(col / 3);

  for (let casecol = 0; casecol < 3; casecol += 1) {
    for (let caseLigne = 0; caseLigne < 3; caseLigne += 1) {
      ajouterClasseChamp(
        "injouable",
        ligneCarre * 3 + caseLigne,
        colCarre * 3 + casecol
      );
    }
  }
  ajouterClasseChamp("focus", ligne, col);
}

// Cette fonction prend en entrée un texte contenant la liste des valeurs dans le sudoku et le charge dans la grille du html
function chargeGrille(texte) {
  // Facile
  texte =
    "25 3 49 649  52  7      452  9 4 82   251 79   3 2 6  92    568875   2     285 79";

  // Moyen
  texte =
    "8  9 2  33   4   8  98 32   641 758   3   4     294    9  6  1   7 1 9   4     5 ";

  // Difficile
  texte =
    "25 3 49 649  52  7      452  9 4 82   251 79   3 2 6  92    568875   2     285 79";

  var input = "";
  for (let ligne = 0; ligne < 9; ligne += 1) {
    for (let col = 0; col < 9; col += 1) {
      const identifiant = "case" + ligne + "-" + col;
      input = document.getElementById(identifiant);
      console.log(
        "entrée dans chargeGrille, col =" +
          col +
          " ligne = " +
          ligne +
          "texte [ligne*9+col]" +
          texte[ligne * 9 + col]
      );
      if (texte[ligne * 9 + col] === " ") input.value = "";
      else input.value = texte[ligne * 9 + col];
    }
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
}

const coordonneesCarres = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 3],
    [2, 4],
    [2, 5],
  ],
  [
    [0, 6],
    [0, 7],
    [0, 8],
    [1, 6],
    [1, 7],
    [1, 8],
    [2, 6],
    [2, 7],
    [2, 8],
  ],
  [
    [3, 0],
    [3, 1],
    [3, 2],
    [4, 0],
    [4, 1],
    [4, 2],
    [5, 0],
    [5, 1],
    [5, 2],
  ],
  [
    [3, 3],
    [3, 4],
    [3, 5],
    [4, 3],
    [4, 4],
    [4, 5],
    [5, 3],
    [5, 4],
    [5, 5],
  ],
  [
    [3, 6],
    [3, 7],
    [3, 8],
    [4, 6],
    [4, 7],
    [4, 8],
    [5, 6],
    [5, 7],
    [5, 8],
  ],
  [
    [6, 0],
    [6, 1],
    [6, 2],
    [7, 0],
    [7, 1],
    [7, 2],
    [8, 0],
    [8, 1],
    [8, 2],
  ],
  [
    [6, 3],
    [6, 4],
    [6, 5],
    [7, 3],
    [7, 4],
    [7, 5],
    [8, 3],
    [8, 4],
    [8, 5],
  ],
  [
    [6, 6],
    [6, 7],
    [6, 8],
    [7, 6],
    [7, 7],
    [7, 8],
    [8, 6],
    [8, 7],
    [8, 8],
  ],
];