var rp = require('request-promise');
const guild_api = "https://api.guildwars2.com/v2/guild/"
const guild_leader_key = ""; // guild leader api key
let name = process.argv[2] != undefined ? process.argv[2] : ""; // name to verify here

function canFindMember(accountName, members)
{
  for(let i = 0; i < members.length; i++)
  {
    if(members[i].name == accountName) return true;
  }
  return false;
}

async function verifyGuildMember(accountName)
{
  let options = {
    uri: guild_api + guild_leader_key + "members",
    json: true // Automatically parses the JSON string in the response
	};
  let members = await rp(options).catch((err) => 
  {
    console.log("Guild probably couldn't be found");
    process.exit();
  });
  return canFindMember(accountName, members);
}

async function doTheThing()
{
  let res = await verifyGuildMember(name);
  console.log(`${name} ${res ? "could" : "could not"} be verified.`);
}

doTheThing();
