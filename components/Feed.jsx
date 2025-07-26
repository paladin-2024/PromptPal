"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => (
    <div className='mt-16 prompt_layout'>
        {data.map((post) => (
            <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))}
    </div>
);

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
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
        clearTimeout(searchTimeout);
        const text = e.target.value;
        setSearchText(text);

        setSearchTimeout(
            setTimeout(() => {
                setSearchedResults(filterPrompts(text));
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);
        setSearchedResults(filterPrompts(tagName));
    };

    const displayData = searchText ? searchedResults : allPosts;

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList data={displayData} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
