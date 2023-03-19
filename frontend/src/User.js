async function getKeywordsFromFlask(description) {
  const response = await fetch("http://127.0.0.1:5000/extract_keywords", {
    method: "POST", // Using POST since GET does not accept a body
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  return response.json;
}

export default getKeywordsFromFlask;
