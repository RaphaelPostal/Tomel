let row_active = 0;
let square_active = 1;
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

    console.log(mot_du_jour);

    if (square_active <= 5 && (/[a-zA-Z]/).test(e.key) && e.key.length <= 1 && e.key !== 'Enter') {
        console.log('une lettre')
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active})`);

        square.innerHTML += `<span class="letter">${e.key}</span>`;
        mot_active = mot_active+e.key;

        square_active ++;
    }

    if (e.key === 'Backspace' && square_active > 1) {
        square_active --;
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active})`);
        mot_active = mot_active.slice(0, -1)
        square.innerHTML = '';
    }

    if (square_active > 5 && e.key === 'Enter') {

        if (mot_active === mot_du_jour) {
            console.log('youpi')
        } else if(words.includes(mot_active) === false) {
            console.log('il est pas dedans')
        } else {
            square_active = 1;
            row_active ++;
            mot_active = '';
        }
    }

};