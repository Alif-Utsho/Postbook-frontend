import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from './Profile'


export default function ProfileID() {
    const { id } = useParams()

    return (
        <div>
            <Profile id={id} />
        </div>
    )
}
