import Senators from './data/senators'

export const republicans = () => {
  return Senators.filter(result => result.party === 'Republican');
 }

export const democrats = () => {
  return Senators.filter(result => result.party === 'Democrat');
}

export const independents = () => {
  return Senators.filter(result => result.party === 'Independent');
}

export const males = () => {
  return Senators.filter(result => result.person.gender === 'male');
}

export const females = () => {
  return Senators.filter(result => result.person.gender === 'female');
}

export const byState = (state = 'UT') => {
  return Senators.filter(result => result.state === 'UT');
}

export const mapping = () => {

return Senators.map( result =>(
  {
    firstName: result.person.firstname,
    lastName: result.person.lastname,
    party: result.party,
    gender: result.person.gender
  }
));
  
  
}

export const reducedCount = () => {
  return Senators.reduce((result, value) =>{
    console.log(value)
    let party = value.party.toLowerCase()
    if (result.hasOwnProperty(party)){
      result[party]++}
      else{
        result[party] = 1
      }
      console.log(result)
      return result
      
  }, {})


}

// return Senators.reduce((counter, {party}) => party == 'republican' ? counter + 1 : counter, 'republican');

// return Senators.reduce((cnt, party) =>
// {cnt[party] = (cnt[party] || 0) + 1;
// })

// Senators.reduce((obj, party) => {
//   const count = obj[party] || 0
//   return {obj, [party]: count + 1}
// })
const REPLACE_ME_WITH_CODE = false


// Senators.reduce(function(count, party) {count[party] = (count[party] || 0) + 1;
//   return Object.create(null)

// let initialValue = {}
// let partyType = Senators.party
// let reducer = function(tally, partyType) {
//   if (!tally[partyType]) {
//     tally[partyType] = 1;
//   } else {tally[partyType] = tally[partyType] + 1;
//   } return tally;
// } 

// return Senators.reduce(reducer, initialValue)