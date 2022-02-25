let row_active = 0;
let square_active = 1;
let mot_active = '';

document.onkeydown = function (e) {

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
        square_active = 1;
        row_active ++;
        mot_active = '';
    }

};