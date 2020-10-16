import {exec, } from 'child_process';
import { writeFile } from 'fs'
import { resolve } from 'path'
import moment from 'moment';
import series from 'async/series';
import colors from 'colors'

import {REPOS_PATH, GIT_USERS, DATE_FORMAT} from './constants';

export default async (repoName: string, date = moment(DATE_FORMAT), cb) => {
    const asyncInvokes = []
    const cmdMainQ = [
        `cd ${REPOS_PATH}/${repoName}`,
        // 'git add .',
        // 'git stash',
        'git checkout master',
        'git pull'
    ]
    
    exec(cmdMainQ.join(' && '), (err, stdout, stderr) => {
        if (err) { console.error(stderr); cb(err) }
        else {
            GIT_USERS.forEach((user, i) => {
                const cmdSubQ = [
                    `cd ${REPOS_PATH}/${repoName}`,
                    getGitStatForOneUser(user, date)
                ]
        
                asyncInvokes.push(
                    (cb: Function) => {
                        exec(cmdSubQ.join(' && '), (err, stdout, stderr) => {
                            if (err) cb(stderr)
                            let userDetailedStats
                            const userStats = stdout.match(/\d+/g)

                            if (userStats) {
                                const userStatsValues = userStats.map(value => parseInt(value, 10))
                                userDetailedStats = { [user]: { files: userStatsValues[0], insertions: userStatsValues[1], deleted: userStatsValues[2] } }
                            } else {
                                userDetailedStats= { [user]: null };
                            }

                            cb(null, userDetailedStats)
                        })
                    }
                )
            })

            series(asyncInvokes, (err, result) => {
                if (err) { console.error(err); cb(err) }
                else {
                    writeFile(
                        resolve(__dirname, "..", 'reports', `${repoName}.txt`), JSON.stringify(result, null, 4), (err) => {
                            if (err) { console.error(err); cb(err) }
                            else console.log(`Successed with ${ colors.blue(repoName)}.`)
                        }
            
                    )
                    cb(null, result)
                }
            })
        }
    })
}

const getGitStatForOneUser = (user: string, date: any) => `git log --shortstat --author "${user}" --since "${date.format('MMM DD YYYY')}" | grep "changed" | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed:", files, "lines inserted:", inserted, "lines deleted:", deleted}'`