async function getKeywordsFromFlask(description) {
  const response = await fetch("http://127.0.0.1:5000/extract_keywords", {
    method: "POST", // Using POST since GET doesn't accept large strings in the body
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  const data = await response.json();
  return data;
}

export default getKeywordsFromFlask;
