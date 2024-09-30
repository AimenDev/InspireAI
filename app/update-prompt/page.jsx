"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Change import to next/navigation
import dynamic from "next/dynamic";

const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [promptId, setPromptId] = useState(null);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Ensure router is ready before accessing query
  useEffect(() => {
    const { id } = router.query; // You can get query directly from the router

    if (id) {
      setPromptId(id);
      // Fetch prompt details when the promptId is set
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost({ prompt: data.prompt, tag: data.tag });
        }
      };

      getPromptDetails();
    }
  }, [router]); // Add router to the dependency array

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
        headers: {
          "Content-Type": "application/json",
        },
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

  // Dynamically import the Form component without SSR
  const DynamicForm = dynamic(() => import("@components/Form"), { ssr: false });

  return (
    <DynamicForm
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
