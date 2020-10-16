import moment from 'moment';
import series from 'async/series';
import { resolve } from 'path'
import { writeFile } from 'fs'
import colors from 'colors'

import {START_DATE, DATE_FORMAT, REPOS, GIT_USERS} from './constants';
import helper from './helper'

const fromDate = moment(START_DATE, DATE_FORMAT);
const invokesQ = []
const mainStatsFilePath = resolve(__dirname, "..", 'reports', `main-stats.txt`)

REPOS.forEach(repo => {
    invokesQ.push( (cb) => {
        helper(repo, fromDate, cb)
    })
})

series(invokesQ, (err, results) => {
    if (err) console.error(err)
    else {
        const usersStats = GIT_USERS.map(user => {
            const userResults = results.map(result => result.find(result => Object.keys(result)[0] === user))
            const summaryUserResult = userResults.reduce((accum, current) => {
                const values = Object.values(current)[0]
                if (!values) return accum
                else return { files: accum.files + values.files, insertions: accum.insertions + values.insertions, deleted: accum.deleted + values.deleted }
            }, {files: 0, insertions: 0, deleted: 0})
            return { [user]: summaryUserResult }
        })

        writeFile(mainStatsFilePath, JSON.stringify(usersStats, null, 4), err => {
            if (err) console.error(err)
            else console.log(colors.blue('Overall statistic has been generated!'))
        })
    }
})