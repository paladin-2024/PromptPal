"use client"
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Profile from "@components/Profile"

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const userName=searchParams.get("name");

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setUserPosts(data);
        };

        if (params?.id) fetchPosts();

    }, [params.id]);

    return (
        <Profile
         name={userName}
         desc={`Welcome to ${userName}'s profile!, Explore ${userName}'s exceptional prompts and be inspired but their imagination.`}
         data={userPosts}
        />
    )
}
export default UserProfile
