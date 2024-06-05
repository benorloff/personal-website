const apiUrl = process.env.HASHNODE_GRAPHQL_API_URL!;

export interface PostMeta {
    title: string;
    slug: string;
    subtitle: string;
    coverImage: {
        url: string;
    }
    tags: Record<string, any>[];
    readTimeInMinutes: number;
    featured: boolean;
    publishedAt: Date;
}

// Get all posts
export async function getPosts() {
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

    const posts: PostMeta[] = edges.map((edge: any) => edge.node);

    return posts;
}

// Get a single post by its slug
export async function getPost({ slug }: { slug: string }) {
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