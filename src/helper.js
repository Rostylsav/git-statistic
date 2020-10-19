import {exec, } from 'child_process';
import { writeFile } from 'fs'
import { resolve } from 'path'
import moment from 'moment';
import series from 'async/series';
import colors from 'colors'

import {REPOS_PATH, GIT_USERS, DATE_FORMAT} from './configuration';

export default async (repoName, startDate = moment(DATE_FORMAT), endDate = moment(DATE_FORMAT),cb) => {
    const asyncInvokes = []
    const cmdMainQ = [
        `cd ${REPOS_PATH}/${repoName}`,
        'git checkout master',
        'git pull'
    ]

    exec(cmdMainQ.join(' && '), (err, stdout, stderr) => {
        if (err) { console.error(stderr); cb(err) }
        else {
            GIT_USERS.forEach(user => {
                const cmdSubQ = [
                    `cd ${REPOS_PATH}/${repoName}`,
                    getGitStatForOneUser(user, startDate, endDate)
                ]

                asyncInvokes.push(
                    cb => {
                        exec(cmdSubQ.join(' && '), (error, standartOut, standartError) => {
                            if (error) cb(standartError)
                            let userDetailedStats
                            const userStats = standartOut.match(/\d+/g)

                            if (userStats) {
                                const userStatsValues = userStats.map(value => parseInt(value, 10))
                                userDetailedStats = {
                                    [user]: {
                                        files: userStatsValues[0],
                                        insertions: userStatsValues[1],
                                        deleted: userStatsValues[2]
                                    }
                                }
                            } else {
                                userDetailedStats= { [user]: null };
                            }

                            cb(null, userDetailedStats)
                        })
                    }
                )
            })

            series(asyncInvokes, (error, result) => {
                if (error) { console.error(error); cb(error) }
                else {
                    writeFile(
                        resolve(
                            __dirname,
                            "..",
                            'reports',
                            `${repoName}.txt`
                        ),
                        JSON.stringify(result, null, 4),
                        (errorObj) => {
                            if (errorObj) { console.error(errorObj); cb(errorObj) }
                            else console.info(`Successed with ${ colors.blue(repoName)}.`)
                        }
                    )
                    cb(null, result)
                }
            })
        }
    })
}

const getGitStatForOneUser = (user, startDate, endDate) => `git log --shortstat --author "${user}" --since "${startDate.format('MMM DD YYYY')}" --until "${endDate.format('MMM DD YYYY')}" | grep "changed" | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed:", files, "lines inserted:", inserted, "lines deleted:", deleted}'`