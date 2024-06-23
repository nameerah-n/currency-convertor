
import chalk  from "chalk" 
import inquirer from "inquirer"

//currency convertor API Link
let APIlink =  "https://v6.exchangerate-api.com/v6/f02b54d72f0ee7ac4e943513/latest/PKR"
console.log(APIlink)

//fetching data
let fetchdata = async (data : any) => {
    let fetchdata = await fetch(data)
    let response = await fetchdata.json();
    return response.conversion_rates
}
// creating object to array
let dataa = await fetchdata(APIlink)
//console.log(dataa)
 let countries = Object.keys(dataa)
//console.log(countries)

//user input of first country
let firstcountry = await inquirer.prompt({
    type : "list",
    name : "name",
    message: "converting from",
    choices: countries
}) 
//console.log(`converting from ${chalk.bold.underline.green(firstcountry.name)}`)

//asking first country's money
let usermoney = await inquirer.prompt({
    type : "number",
    name : "rupees",
    message: `please enter the amount in ${chalk.italic.underline.yellow(firstcountry.name)}`
})
//console.log(usermoney.rupees)

//converting to following country:
let secondcountry = await inquirer.prompt({
    type : "list",
    name : "name",
    message: "converting to",
    choices: countries
})   

//conversion rate:
    let conversion_rate =  `https://v6.exchangerate-api.com/v6/f02b54d72f0ee7ac4e943513/pair/${firstcountry.name}/${secondcountry.name}`
    console.log(conversion_rate)
    

    let cnvdata = async (data : any) => {
        let cnvdata = await fetch(data)
        let response = await cnvdata.json();
        return response.conversion_rate
    }
let conversionrates  = await cnvdata(conversion_rate)
//console.log(conversionrates)

let converted_rate = usermoney.rupees * conversionrates
//console.log(converted_rate)

console.log(`your ${chalk.bold.bgCyan(firstcountry.name)} ${chalk.bold.bgMagenta(usermoney.rupees)} in ${chalk.bold.bgRedBright(secondcountry.name)} is ${chalk.italic.underline.yellowBright (converted_rate)}`)

