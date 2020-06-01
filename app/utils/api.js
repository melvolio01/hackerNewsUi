export const fetchPostIds = () => {
    return fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
        .then(res => res.json())
        .then(ids => fetchPosts(ids))
}

const fetchPosts = (ids) => {
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
    console.log('fetchComments...')
    return Promise.all(ids.map((id) => {
        return Promise.resolve(fetchComment(id));
    }));
}

const fetchComment = (id) => {
    console.log('fetchComment....')
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        .then(res => res.json())
}