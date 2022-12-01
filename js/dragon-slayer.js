/*************************************************************************************************/
/* **************************************** DONNEES JEU **************************************** */
/*************************************************************************************************/

let pvInitialJoueur = 100;
let pvInitialDragon = 100;
let count = 1;

/*************************************************************************************************/
/* *************************************** FONCTIONS JEU *************************************** */
/*************************************************************************************************/




// FONCTION DE LANCER DE DES

function lancerDes(nDes, nFaces) {
    let sommes = 0;
    // Génère le nombre lancers de dés, nDes
    for (let i = 0; i != nDes; i++) {
        // Génère un random entre 1 et nFaces
        let nFace = Math.floor(Math.random() * nFaces) + 1;
        // Addition de nFaces pour avoir la sommes de dés lancés aléatoirement
        sommes += nFace;

    } return sommes;

}

// FONCTION D'INITIATIVE

function compareInit(initJoueur, initDragon) {

    initDragon = lancerDes(3, 6);
    initJoueur = lancerDes(3, 6);

    while (initDragon == initJoueur) {
        initDragon = lancerDes(3, 6);
        initJoueur = lancerDes(3, 6);
    }
    if (initDragon < initJoueur) {
        return -1;
    }
    if (initDragon > initJoueur) {
        return 1;
    }
}

// FONCTION 

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

/* ********************************** Calcul pv/Normal *********************************** */
let pvJoueur = 0;
let pvDragon = 0;
let degAttDragon = 0;
let degAttJoueur = 0;
let statJoueur = '<img src="images/knight.png" alt="Chevalier"></img>';
let statDragon = '<img src="images/dragon.png" alt="Dragon">';


// MODE DE DIFFICULTE


let choixDeDif = prompt("FACILE, NORMAL OU DIFFICILE ?");

switch (choixDeDif) {
    case "FACILE":
        // MODE FACILE
        pvJoueur = pvInitialJoueur + lancerDes(10, 10);
        pvDragon = pvInitialDragon + lancerDes(5, 10);
        break;
    case "NORMAL":
        // MODE NORMAL
        pvJoueur = pvInitialJoueur + lancerDes(10, 10);
        pvDragon = pvInitialDragon + lancerDes(10, 10);
        break;
    case "DIFFICILE":
        // MODE DIFFICILE
        pvJoueur = pvInitialJoueur + lancerDes(7, 10);
        pvDragon = pvInitialDragon + lancerDes(10, 10);
        break;
}

let pvMaxJoueur = pvJoueur;
let pvMaxDragon = pvDragon;

document.write(`
<main>
    <div class="game">
        <h2>Que la fête commence !!</h2>
        <div class="game-state">
    <figure class="game-state_player">
        `+ statJoueur +`
        <figcaption>` + pvJoueur + `</figcaption>
    </figure>
    <figure class="game-state_player">
    `+ statDragon +`
        <figcaption>`+ pvDragon + `</figcaption>
    </figure>
    </div>`);


while (pvJoueur > 0 && pvDragon > 0) {

    // DEGATS DU DRAGON EN FONCTION DE LA DIFFICULTEE
    if (compareInit() == 1) {

        switch (choixDeDif) {

            case "FACILE":
                degAttDragon = lancerDes(1, 6);
                break;
            case "NORMAL":
                degAttDragon = lancerDes(3, 6);
                break;
            case "DIFFICILE":
                degAttDragon = lancerDes(4, 6);
                break;
        }

        pvJoueur = pvJoueur - degAttDragon;

        //SI LES PV TOMBE a 30%

        if(pvJoueur <= (pvMaxJoueur)*30/100){
            statJoueur='<img src="images/knight-wounded.png" alt="Chevalier"></img>';

        }
        if(pvDragon <= (pvMaxDragon)*30/100){
            statDragon='<img src="images/dragon-wounded.png" alt="Dragon"></img>';

        }

        //SI LES PV TOMBER à 0 OU EN DESSOUS, C'EST LA MORT 
        if (pvJoueur <= 0) {
            pvJoueur = "💀";
        }

        document.write(`
        <h3>Tour ` + count + `</h3>
        <figure class="game-round">
            <img src="images/dragon-winner.png" alt="Dragon vainqueur">
            <figcaption>Le dragon prend l'initiative, vous attaque et vous inflige `+ degAttDragon + ` points de dommage !</figcaption>
        </figure>
        <div class="game-state">
            <figure class="game-state_player">
            `+ statJoueur +`
                <figcaption>`+ pvJoueur + `</figcaption>
            </figure>
            <figure class="game-state_player">
            `+ statDragon +`
                <figcaption>`+ pvDragon + `</figcaption>
            </figure>
        </div>`);
        // DEGATS DU JOUEUR EN FONCTION DE LA DIFFICULTEE
    } else {

        switch (choixDeDif) {
            case "FACILE":
                degAttJoueur = lancerDes(5, 6);
                break;
            case "NORMAL":
                degAttJoueur = lancerDes(3, 6);
                break;
            case "DIFFICILE":
                degAttJoueur = lancerDes(2, 6);
                break;
        }

        pvDragon = pvDragon - degAttJoueur;
        if(pvJoueur <= (pvMaxJoueur)*30/100){
            statJoueur='<img src="images/knight-wounded.png" alt="Chevalier"></img>';

        }
        if(pvDragon <= (pvMaxDragon)*30/100){
            statDragon='<img src="images/dragon-wounded.png" alt="Dragon"></img>';

        }


        // SI LES PV TOMBER à 0 OU EN DESSOUS, C'EST LA MORT 
        if (pvDragon <= 0) {
            pvDragon = "💀";
        }

        document.write(`
        <h3>Tour ` + count + `</h3>
        <figure class="game-round">
            <img src="images/knight-winner.png" alt="Chevalier vainqueur">
            <figcaption>Vous êtes le plus rapide, vous attaquez le dragon et lui infligez ` + degAttJoueur + ` points de dommage !
            </figcaption>
        </figure>
        <div class="game-state">
            <figure class="game-state_player">
            `+ statJoueur +`
                <figcaption>`+ pvJoueur + `</figcaption>
            </figure>
            <figure class="game-state_player">
            `+ statDragon +`
                <figcaption>`+ pvDragon + `</figcaption>
            </figure>
        </div>`);


    }



    // +1 UN TOUR A CHAQUE FIN DE CYCLE
    count++;
}

// ON AFFICHE LE RESULTAT UNE FOIS LA BOUCLE FINIS AVEC LE FOOTER

if (pvJoueur == "💀") {
    document.write(`
            <footer>
                <h3>Fin de la partie</h3>
                <figure class="game-end">
                    <figcaption>Vous avez perdu le combat, le dragon vous a carbonisé !</figcaption>
                    <img src="images/dragon-winner.png" alt="Dragon vainqueur">
                </figure>
            </footer>
        </div>
    </main>`);

} else {
    document.write(`
            <footer>
                <h3>Fin de la partie</h3>
                <figure class="game-end">
                    <figcaption>Vous avez gagné le combat, le dragon a perdu ses ailes</figcaption>
                    <img src="images/knight-winner.png" alt="Dragon vainqueur">
                </figure>
            </footer>
        </div>
    </main>`);
};