import React from 'react'
import { useParams } from 'react-router'
import SinglePost from './SinglePost'

export default function SinglePostID() {
    const { id } = useParams()
    return (
        <div>
            <SinglePost id={id} />
        </div>
    )
}