async function getKeywordsFromFlask(description) {
  try {
    const fetchPromise = fetch("https://reverse-ats-api.onrender.com/extract_keywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description }),
    });

    const timeoutPromise = new Promise(
      // eslint-disable-next-line no-promise-executor-return
      (_, reject) => setTimeout(() => reject(new Error("Request timed out")), 10000) // 10 seconds
    );

    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default getKeywordsFromFlask;
