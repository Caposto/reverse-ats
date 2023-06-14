function Instructions() {
  return (
    <div className="p-2 bg-gray-200 rounded-md">
      <h3>Instructions:</h3>
      <ol>
        <li className="pb-2">
          1. Copy and paste your resume content and job description into the respective
          text boxes.
        </li>
        <li className="pb-2">
          2. Click on the &quot;Extract&quot; button to retrieve keywords from each text.
        </li>
        <li className="pb-2">
          3. You will receive a list of keywords that you can modify by adding, deleting,
          or editing them as needed
        </li>
        <li className="pb-2">
          4. Once you are satisfied with the keywords, you can click on the
          &quot;Compare&quot; button to see how closely your resume matches the job
          description.
        </li>
        <li className="pb-2">
          5. Please note that you will receive an error if the Keyword Processing Service
          is unavailable or if you submit empty descriptions exceeding 5000 characters.
        </li>
        <li className="pb-2">
          6. To obtain new keywords, you can click on the &quot;Submit New
          Description&quot; buttons to clear each keyword list individually.
        </li>
      </ol>
      <p className="font-bold italic">
        Press the I in the top left corner to close these instructions.
      </p>
    </div>
  );
}

export default Instructions;
