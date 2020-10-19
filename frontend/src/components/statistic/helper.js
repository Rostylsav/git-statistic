const getStatisticsObj = (repositoriesData, usersData) => {
    const selectedRepositories = repositoriesData.filter(repo => repo.isSelected);
    const selectedUser = usersData.filter(repo => repo.isSelected);

    return {
        selectedRepositories,
        selectedUser
    }
}

export default getStatisticsObj