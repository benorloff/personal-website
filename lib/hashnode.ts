const apiUrl = process.env.HASHNODE_GRAPHQL_API_URL!;

export interface HashnodePost {
    id: number,
    title: string,
    slug: string,
    subtitle: string,
    tags: Array<{ 
        name: string, 
    }>,
    coverImage: { 
        url: string, 
    },
    readTimeInMinutes: number,
    series: { 
        id: number,
        name: string,
        description: { 
            html: string, 
        },
        slug: string,
    },
    featured: boolean,
    content: { 
        markdown: string,
        html: string,
    },
    publishedAt: Date,
    updatedAt: Date,
}

export type HashnodePostMeta = Pick<HashnodePost, 
    | 'title' 
    | 'slug' 
    | 'subtitle' 
    | 'coverImage' 
    | 'tags' 
    | 'readTimeInMinutes' 
    | 'featured' 
    | 'publishedAt'
>;

// Get all posts' metadata from Hashnode (without post content)
export async function getHashnodePostsMeta() {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `#graphql
                query getPostsMeta {
                    publication(host: "blog.benorloff.co") {
                        posts(first: 10) {
                            edges {
                                node {
                                    title
                                    slug
                                    subtitle
                                    coverImage { url }
                                    tags { name }
                                    readTimeInMinutes
                                    featured
                                    publishedAt
                                }
                            }
                        }
                    }
                }
            `
        }),
        next: { revalidate: 3600 },
    });
    
    const { 
        data: { 
            publication: { 
                posts: {
                    edges
                }
            }
        }
    } = await res.json();

    const postsMeta: HashnodePostMeta[] = edges.map((edge: any) => edge.node);

    return postsMeta;
}

// Get paginated posts from Hashnode
export async function getHashnodePosts() {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `#graphql
                query getPosts {
                    publication(host: "blog.benorloff.co") {
                        posts(first: 10) {
                            edges {
                                node {
                                    id
                                    title
                                    slug
                                    subtitle
                                    tags { name }
                                    coverImage { url }
                                    readTimeInMinutes
                                    series { 
                                        id
                                        name
                                        description { html }
                                        slug
                                    }
                                    featured
                                    content { markdown }
                                    publishedAt
                                    updatedAt
                                }
                            }
                        }
                    }
                }
            `
        }),
        next: { revalidate: 3600 },
    });
    
    const { 
        data: { 
            publication: { 
                posts: {
                    edges
                }
            }
        }
    } = await res.json();

    const posts: HashnodePost[] = edges.map((edge: { node: HashnodePost }) => edge.node);

    return posts;
}

// Get a single post by its slug
export async function getHashnodePost({ slug }: { slug: string }) {
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `#graphql
                query getPost {
                    publication(host: "blog.benorloff.co") {
                        post(slug: "${slug}") {
                            title
                            subtitle
                            coverImage { url }
                            tags { name }
                            readTimeInMinutes
                            featured
                            publishedAt
                            updatedAt
                            content {
                                markdown
                                html
                            }
                        }
                    }
                }
            `
        }),
        next: { revalidate: 3600 },
    });
    
    const { 
        data: {
            publication: {
                post
            }
        }
    } = await res.json();

    return post;
}