export const fetchPostIds = (type) => {
    const apiAddr = `https://hacker-news.firebaseio.com//v0/${type}stories.json?print=pretty`
    return fetch(apiAddr)
        .then(res => res.json())
        .then(ids => fetchPosts(ids))
}

export const fetchPosts = (ids) => {
    const idArr = ids.slice(0, 50);
    return Promise.all(idArr.map((id) => {
        return Promise.resolve(fetchItem(id));
    }))
}

const fetchItem = (id) => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(res => res.json())
}

export const fetchComments = (ids) => {
    return Promise.all(ids.map((id) => {
        return Promise.resolve(fetchComment(id));
    }));
}

const fetchComment = (id) => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(res => res.json())
}

export const fetchUser = (authorId) => {
    return fetch(`https://hacker-news.firebaseio.com/v0/user/${authorId}.json?print=pretty`)
        .then(res => res.json())
}