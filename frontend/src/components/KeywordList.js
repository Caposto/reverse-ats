export default function KeywordList({keywordArray}) {
    // FIXME: Getting Warning, each child in a lisst should have a unique "key" prop
    const uniqueKeywords = [...new Set(keywordArray)];
    const keywordItems = uniqueKeywords.map((k) => 
        <li>{k}</li>
    );
    return (
        <div>
            <h1>KEYWORDS</h1>
            <ul>
                {keywordItems} 
            </ul>
        </div>
    );
}