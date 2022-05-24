let favNumber = 9;
let baseURL = "http://numbersapi.com";

// 1.
async function part1() {
    let res = await $.getJSON(`${baseURL}/${favNumber}?json`);
    //log the response to console
    console.log(res);
}
part1();

// 2.
//create list of favorite numbers
const favNumbers = [23, 45, 3];
async function part2() {
    let res = await $.getJSON(`${baseURL}/${favNumbers}?json`)
    // for each number, display the fact on browser
    favNumbers.forEach(num => {
        $('#text1').append(`<p>${res[num]}<p>`);
    })


}
part2();

// 3.
async function part3() {
    // find four facts for the favorite number
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    // display the facts on browser
    facts.forEach(data => {
        $('#text2').append(`<p>${data.text}</p>`);
    });
}
part3();