// Search users by username.
export const searchUsers = async (username) => {
    const params = new URLSearchParams({
        q: username
    });

    try {
        const response = await fetch(`https://api.github.com/search/users?${params}`);
        const { items } = await response.json();
        return items;
    } catch(error) {
        console.log(error);
    }
}

// Get single user profile data.
export const getUser = async (login) => {
    try {
        const response = await fetch(`https://api.github.com/users/${login}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Get user project github repos.
export const getUserRepos = async (login) => {
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10
    });

    try {
        const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
