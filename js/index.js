let row_active = 0;
let square_active = 0;
let mot_du_jour = '';
let mot_active = '';
let words = [];

$.getJSON('js/random_words.json', function (data) {
    // let date = new Date();
    // mot_du_jour = data[date.getFullYear() + Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)]
    // console.log(mot_du_jour)
    words = data
    date1 = new Date("2022-02-25");
    date2 = new Date();
    mot_du_jour = data[Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))]
    console.log(mot_du_jour);
})

document.onkeydown = function (e) {

    if (square_active <= 4 && (/[a-zA-Z]/).test(e.key) && e.key.length <= 1 && e.key !== 'Enter') {
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active + 1})`);

        square.innerHTML += `<span class="letter">${e.key}</span>`;
        mot_active = mot_active+e.key;

        square_active ++;
    }

    if (e.key === 'Backspace' && square_active > 0) {
        square_active --;
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active + 1})`);
        mot_active = mot_active.slice(0, -1)
        square.innerHTML = '';
    }

    if (square_active > 4 && e.key === 'Enter') {

        if (words.includes(mot_active) === false) {
            console.log('il est pas dedans')
        } else {
            //calcul du placement des lettres

            mot_active.split('', 5).forEach((lettre, index) => {
                console.log(mot_du_jour.split('', 5).indexOf(lettre))
                let square = document.querySelector(`#row-${row_active} :nth-child(${index + 1})`);

                //si la lettre est au bon endroit
                if (index === mot_du_jour.split('', 5).indexOf(lettre)) {
                    console.log('la lettre '+lettre+' est au bon endroit')
                    square.classList = 'letter-square-right-place';

                } else if (mot_du_jour.split('', 5).includes(lettre)) {
                    console.log('la lettre '+lettre+' est mal placée')
                    square.classList = 'letter-square-wrong-place';

                } else {
                    console.log('la lettre '+lettre+' n\'est pas présente')
                }
            })

            setTimeout(function () {
                square_active = 0;
                row_active ++;
                mot_active = '';
            }, 500)
        }
    }
};