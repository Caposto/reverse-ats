async function getKeywordsFromFlask(description) {
  const response = await fetch("http://127.0.0.1:5000/extract_keywords", {
    method: "POST", // Using POST since GET doesn't accept strings greater than 2000 characters
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description }),
  });

  const responseIsSuccessful = response.ok;
  let data;

  if (responseIsSuccessful) {
    data = await response.json();
  }

  return data;
}

export default getKeywordsFromFlask;
