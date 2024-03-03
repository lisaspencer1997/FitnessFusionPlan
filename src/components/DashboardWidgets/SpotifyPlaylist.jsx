import React, { useState } from 'react';

const SpotifyPlaylist = () => {
    const [embedLink, setEmbedLink] = useState('');

    const handleInputChange = (e) => {
        setEmbedLink(e.target.value);
    };

    const handleSave = () => {
        console.log("Embed Link Saved: ", embedLink);

    };

    return (
        <div>
            <p>Paste the Spotify embed link below:</p>
            <textarea
                placeholder="Enter Spotfy Embed link"
                value={embedLink}
                onChange={handleInputChange}
            />

            <div className="playlist-embed">
                {embedLink && (
                    <div dangerouslySetInnerHTML={{ __html: embedLink }} />
                )}
            </div>

            <button onClick={handleSave}>Save</button>
            </div>
    )
}

export default SpotifyPlaylist