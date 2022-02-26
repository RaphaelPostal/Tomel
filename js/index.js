let row_active = 0;
let square_active = 0;
let mot_du_jour = '';
let mot_active = '';
let words = [];

$.getJSON('js/random_words.json', function (data) {
    words = data
    date1 = new Date("2022-02-25");
    date2 = new Date();
    mot_du_jour = data[Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24))]
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

        if (!words.includes(mot_active)) {
            document.getElementById('not-exist').classList.remove('hidden')
        } else {
            if(!document.getElementById('not-exist').classList.contains('hidden')){
                document.getElementById('not-exist').classList += ' hidden';
            }
            let repartition_mdj = [];

            mot_du_jour.split('', 5).forEach((el, index) => {
                if (el in repartition_mdj) {
                    repartition_mdj[el].push(index)
                } else {
                    repartition_mdj[el] = [index];
                }
            })


            let repartition_ma = [];

            mot_active.split('', 5).forEach((el, index) => {
                if (el in repartition_ma) {
                    repartition_ma[el].push(index)
                } else {
                    repartition_ma[el] = [index];
                }
            })

            let repartition_found = [];
            let repartition_clue = [];

            //calcul du placement des lettre
            mot_active.split('', 5).forEach((lettre, index) => {

                let square = document.querySelector(`#row-${row_active} :nth-child(${index + 1})`);

                if (lettre in repartition_mdj) { //elle est dans le mot à trouver
                    if (repartition_mdj[lettre].includes(index)) { //elle est à la bonne place
                        if (lettre in repartition_found) {
                            repartition_found[lettre].push(index)
                        } else {
                            repartition_found[lettre] = [index];
                        }

                        square.classList = 'letter-square-right-place';
                    }
                }
            })

            mot_active.split('', 5).forEach((lettre, index) => {

                let square = document.querySelector(`#row-${row_active} :nth-child(${index + 1})`);

                if (lettre in repartition_mdj) { //elle est dans le mot à trouver

                    if (repartition_mdj[lettre].includes(index) === false) { //elle est pas à la bonne place
                        if (lettre in repartition_clue) {
                            if (lettre in repartition_found) {
                                if (repartition_clue[lettre].length < repartition_mdj[lettre].length - 1) {
                                    if (repartition_found[lettre].includes(index) === false) {
                                        repartition_clue[lettre].push(index)
                                    }
                                }
                            } else {
                                if (repartition_clue[lettre].length < repartition_mdj[lettre].length) {
                                    repartition_clue[lettre].push(index);
                                }
                            }
                        } else {

                            if (lettre in repartition_found) {
                                if (repartition_found[lettre].length < repartition_mdj[lettre].length) {
                                    if (lettre in repartition_clue) {
                                        repartition_clue[lettre].push(index);
                                    } else {
                                        repartition_clue[lettre] = [index];
                                    }
                                }
                            } else {
                                repartition_clue[lettre] = [index]

                            }
                        }

                    }
                }

            })


            mot_active.split('', 5).forEach((lettre, index) => {

                let square = document.querySelector(`#row-${row_active} :nth-child(${index + 1})`);

                if (lettre in repartition_mdj) { //elle est dans le mot à trouver
                    if (repartition_mdj[lettre].includes(index) === false) { //elle est pas à la bonne place

                            if (lettre in repartition_clue) {

                            if (repartition_clue[lettre].includes(index)) {
                                square.classList = 'letter-square-wrong-place';
                            }
                        }
                    }
                }
            })

            if (mot_active === mot_du_jour) {
                setTimeout(function() {
                    document.getElementById('succes').classList.remove('hidden')
                })
            } else {
                setTimeout(function () {
                    square_active = 0;
                    row_active ++;
                    mot_active = '';
                }, 500)
            }


        }
    }
};