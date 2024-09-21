"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // <-- Use router here
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [promptId, setPromptId] = useState(null);

  // Ensure router is ready before accessing query
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setPromptId(id); // Set promptId from query
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) { // Ensure promptId is present
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
