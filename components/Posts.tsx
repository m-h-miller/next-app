import { Post } from "@prisma/client"
import { Container } from "react-bootstrap"
import Link from 'next/link'

export default function Posts({ posts = [] }: { posts: PostWithAuthor[] }) {
    return (
        <Container>
            {posts.map(i => (
                <Post post={i} />
            ))}
        </Container>
    )
}

type PostWithAuthor = Post & {
    author: {
        email: string
    }
}

function Post({ post }: { post: PostWithAuthor }) {
    console.log({ post })
    return (
        <div style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>
                    Author:{'  '}
                    <Link href={`/profile/${post.authorId}`}>
                        {post.author.email}
                    </Link>
                </span>
            </div>
            <h3>{post.title}</h3>
            <div>
                {post.content}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <small>Posted: {post.createdAt.toLocaleString()}</small>
                <small>Edited: {post.updatedAt.toLocaleString()}</small>
            </div>
            <hr />
        </div>
    )
}