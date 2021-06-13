/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */
import {connect} from '@database';
import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';



(async () => {
    // Setup command line options
    const options = commandLineArgs([
        {
            name: 'env',
            alias: 'e',
            defaultValue: 'development',
            type: String,
        },
    ]);
    try {
        await connect();
        console.log('connected to database');
      } catch (error) {
        console.log(error);
      }
    // Set the env file
    const result2 = dotenv.config({
        path: path.join(__dirname, `env/${options.env}.env`),
    });
    if (result2.error) {
        throw result2.error;
    }
})();
