import React, { useState } from 'react';
import SpotifyPlaylist from './SpotifyPlaylist';

const PlaylistPage = () => {
    const [spotifyEmbedLink, setSpotifyEmbedLink] = useState('');

    return (
        <div>
            <h1>My Awesome Playlist</h1>
            <SpotifyPlaylist embedLink={spotifyEmbedLink} />
        </div>
    );
};

export default PlaylistPage;