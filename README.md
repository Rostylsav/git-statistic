# git-statistic

Small project for getting git statistic

# Preparation

1. Download all needed repositories in to one folder.
2. Clone `git-statistic` project.
3. Open `git-statistic/src/configuration.js` file and update next constnats. <br />
    a. `REPOS_PATH` - path to folder were all repositiries are locted acording to `git-statistic/dist` folder. 
    Examplle:  `resolve(__dirname, "../../../Skylight")` <br />
    b. `REPOS` - names of repositories folders for which you want to get statistic. <br />
    c. `GIT_USERS` - usernames of git users for which you want to get statistic.
    b. `START_DATE` - from which day you want to start collect statistic. 
    Example: `'07/01/2020'`.
    e. `END_DATE` - till which day you want to collect statistic. 
    Example: `'10/01/2020'`.
4. Create `reports` folder on the same level as `src`.

# Setup/start

1. Open terminal and navigate to `git-statistic` folder.
2. Run `npm i` command.
3. Run `npm run build:js` or `npm run build:js:watch` for development.
4. In case you run `npm run build:js:watch` command, than you need new terminal window/tab and run `npm start`  otherways just run command.


# Troubleshooting

1. No such file or directory <br />
    a. Check `REPOS_PATH` constant. In most cases path is wrong. <br />
    b. Check `REPOS` constant. Some folder names may not exist or have typo.
2. `.lock` files. <br />
In some cases inside repository in folder `.git` you can get `.lock` files which blocks `'git checkout master', 'git pull'` commands. To fix this issue just remove them and restart project.

