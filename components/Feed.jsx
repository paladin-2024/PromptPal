"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => (
    <div className="mt-16 prompt_layout">
        {data.map((post) => (
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />
        ))}
    </div>
);

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeoutId, setSearchTimeoutId] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/api/prompt");
                const data = await response.json();
                setAllPosts(data);
            } catch (error) {
                console.error("Failed to fetch prompts:", error);
            }
        };

        fetchPosts();
    }, []);

    const filterPrompts = (text) => {
        const regex = new RegExp(text, "i");
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (searchTimeoutId) clearTimeout(searchTimeoutId);

        const timeoutId = setTimeout(() => {
            const filtered = filterPrompts(value);
            setSearchedResults(filtered);
        }, 500);

        setSearchTimeoutId(timeoutId);
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);
        const filtered = filterPrompts(tag);
        setSearchedResults(filtered);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={searchText ? searchedResults : allPosts}
                handleTagClick={handleTagClick}
            />
        </section>
    );
};

export default Feed;
