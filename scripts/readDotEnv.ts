const { writeFile } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
require('dotenv').config({  });

// read the command line arguments passed with yargs
//const environment = argv.environment;
const isProduction = process.env['NODE_ENV'] == 'development' ;

const targetPath = isProduction
   ? `./src/environments/environment.development.ts`
   : `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   DB_URI: "${process.env['DB_URI']}",
   APP_ID: "${process.env['APP_ID']}",
   MASTER_KEY: "${process.env['MASTER_KEY']}",
   PUBLIC_SERVER_URL: "${process.env['PUBLIC_SERVER_URL']}",
   SERVER_URL: "${process.env['SERVER_URL']}",
   SERVER_PORT: "${process.env['SERVER_PORT']}",
   APP_NAME: "${process.env['APP_NAME']}",
   APP_USER: "${process.env['APP_USER']}",
   APP_PASS: "${process.env['APP_PASS']}",
   LOGIN_URL: "${process.env['LOGIN_URL']}",
   LOGOUT_URL: "${process.env['LOGOUT_URL']}",
   GET_URL: "${process.env['GET_URL']}"
};
`;

writeFile(targetPath, environmentFileContent, (err:any)=>{
    if (err) {
        console.log(err);
     }
     const message:string = `

     ===========================================
     [OK]: Environments Update.
     [Path]: ${targetPath}
     ===========================================

     `
     console.log(message)
})
